"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const addLog_1 = require("../logs/addLog");
// import "./authorizationcontroller"
const prisma = new client_1.PrismaClient();
class AuthController {
    registerForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = req.body;
            req.session.auth = undefined;
            const users = yield prisma.users.findMany({
                where: {
                    name
                }
            });
            if (users[0] != undefined) {
                req.session.auth = false;
                res.redirect('/render/registration');
            }
            else if (users[0] == '') {
                res.redirect('/render/registration');
                req.session.auth = false;
            }
            else {
                yield prisma.users.create({
                    data: {
                        name: name,
                        password: password,
                        status: 'Free'
                    }
                });
                req.session.subscription = 'Free';
                req.session.name = name;
                req.session.password = password;
                if (req.session.name == "Admin") {
                    req.session.admin = true;
                }
                else {
                    req.session.admin = false;
                }
                if (req.session.name != "") {
                    req.session.auth = true;
                    (0, addLog_1.addLog)(` ${req.session.name} зарегистрировал аккаунт`);
                    res.redirect('/home');
                }
                else {
                    res.redirect('/render/registration');
                    req.session.auth = false;
                }
            }
        });
    }
    renderRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.auth == undefined;
            res.render('auth__registration', {
                auth: req.session.auth,
                password: req.session.password,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    name,
                    password,
                }
            });
            if (users[0] != undefined) {
                req.session.name = name;
                if (req.session.name == "Admin") {
                    req.session.auth = true;
                    req.session.admin = true;
                }
                else {
                    req.session.admin = false;
                    req.session.auth = true;
                }
                if (req.session.name != "" || req.session.password != "") {
                    (0, addLog_1.addLog)(` ${req.session.name} вошел в аккаунт`);
                    console.log(req.session.name);
                    const user = yield prisma.users.findMany({
                        where: {
                            name: String(req.session.name),
                        }
                    });
                    if (user[0].status == 'Subscription') {
                        req.session.subscription = 'Subscription';
                    }
                    else {
                        req.session.subscription = 'Free';
                    }
                    res.redirect('/home');
                }
                else {
                    req.session.auth = false;
                    res.redirect('/render/login');
                    req.session.name = undefined;
                }
            }
            else {
                req.session.auth = false;
                res.redirect('/render/login');
                req.session.name = undefined;
            }
            ;
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, addLog_1.addLog)(` ${req.session.name} вышел из аккаунта`);
            req.session.auth = undefined;
            req.session.name = undefined;
            res.redirect('/render/login');
        });
    }
    renderLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('auth__login', {
                auth: req.session.auth,
                password: req.session.password,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
            });
        });
    }
}
exports.AuthController = AuthController;
