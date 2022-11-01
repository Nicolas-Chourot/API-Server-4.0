const usersRepository = require('../models/usersRepository');
const ImagesRepository = require('../models/imagesRepository');
const TokenManager = require('../tokenManager');
const utilities = require("../utilities");
const Gmail = require("../gmail");

module.exports =
    class AccountsController extends require('./Controller') {
        constructor(HttpContext,) {
            super(HttpContext, new usersRepository(), true /* read authorisation */);
        }

        index(id) {
            if (!isNaN(id)) {
                this.HttpContext.response.JSON(this.repository.get(id));
            }
            else {
                if (this.readAuthorization())
                    this.HttpContext.response.JSON(this.repository.getAll());
                else
                    this.HttpContext.response.unAuthorized();
            }
        }
        // POST: /token body payload[{"Email": "...", "Password": "..."}]
        login(loginInfo) {
            let user = this.repository.findByField("Email", loginInfo.Email);
            if (user != null) {
                if (user.Password == loginInfo.Password) {
                    if (user.VerifyCode == 'verified') {
                        let newToken = TokenManager.create(user);
                        this.HttpContext.response.JSON(newToken);
                    } else {
                        this.HttpContext.response.badRequest("Unverified user");
                    }
                } else {
                    this.HttpContext.response.badRequest("Incorrect password");
                }
            } else {
                this.HttpContext.response.badRequest("Incorrect email");
            }
        }
        logout(userId) {
            TokenManager.logout(userId);
            this.HttpContext.response.accepted();
        }

        sendVerificationEmail(user) {
            let html = `
                Bonjour ${user.Name}, <br /> <br />
                Voici votre code vérification :
                <h3>${user.VerifyCode}</h3>
            `;
            const gmail = new Gmail();
            gmail.send(user.Email, 'Vérification de courriel...', html);
        }

        sendConfirmedEmail(user) {
            let html = `
                Bonjour ${user.Name}, <br /> <br />
                Votre courriel a été confirmé.
            `;
            const gmail = new Gmail();
            gmail.send(user.Email, 'Courriel confirmé...', html);
        }

        verify() {
            let id = parseInt(this.HttpContext.path.params.id);
            let code = parseInt(this.HttpContext.path.params.code);
            let userFound = this.repository.get(id);
            if (userFound) {
                if (userFound.VerifyCode == code) {
                    userFound.VerifyCode = "verified";
                    if (this.repository.update(userFound) == 0) {
                        this.HttpContext.response.ok();
                        this.sendConfirmedEmail(userFound);
                    } else {
                        this.HttpContext.response.unprocessable();
                    }
                } else {
                    this.HttpContext.response.ok();
                }
            } else {
                this.HttpContext.response.unprocessable();
            }
        }

        // POST: account/register body payload[{"Id": 0, "Name": "...", "Email": "...", "Password": "..."}]
        register(user) {
            user.Created = utilities.nowInSeconds();
            user.VerifyCode = utilities.makeVerifyCode(6);
            let newUser = this.repository.add(user);
            if (newUser) {
                if (!newUser.conflict) {
                    // mask password in the json object response 
                    newUser.Password = "********";
                    this.HttpContext.response.created(newUser);
                    this.sendVerificationEmail(user);
                } else
                    this.HttpContext.response.conflict();
            } else
                this.HttpContext.response.unprocessable();
        }
        // POST:account/modify body payload[{"Id": 0, "Name": "...", "Email": "...", "Password": "..."}]
        modify(user) {
            user.Created = utilities.nowInSeconds();
            let foundedUser = this.repository.findByField("Id", user.Id);
            user.VerifyCode = foundedUser.VerifyCode;
            if (user.Password == '') {
                user.Password = foundedUser.Password;
            }
            super.put(user);
        }
        // GET:account/remove/id
        remove(id) { // warning! this is not an API endpoint
            super.remove(id);
        }
    }