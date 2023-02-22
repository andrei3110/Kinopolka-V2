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
exports.SubscribeController = void 0;
const client_1 = require("@prisma/client");
const addLog_1 = require("../logs/addLog");
// import "./authorizationcontroller"
const prisma = new client_1.PrismaClient();
class SubscribeController {
    RenderSubscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('subscribe', {
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                status: req.session.status,
                dark__light: req.session.dark__light,
                category: req.session.category,
                subscription: req.session.subscription,
            });
        });
    }
    arrange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.auth == true) {
                const users = yield prisma.users.findMany({
                    where: {
                        name: String(req.session.name),
                    },
                });
                yield prisma.users.updateMany({
                    where: {
                        name: String(req.session.name)
                    },
                    data: {
                        status: 'Subscription',
                    },
                });
                req.session.subscription = 'Subscription';
                (0, addLog_1.addLog)(` ${req.session.name} оформил подписку`);
                res.render('home', {
                    'users': users,
                    auth: req.session.auth,
                    active: req.session.active,
                    admin: req.session.admin,
                    status: req.session.status,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    subscription: req.session.subscription,
                });
            }
            else {
                req.session.subscription = undefined;
                res.render('auth__login', {
                    auth: req.session.auth,
                    active: req.session.active,
                    subscription: req.session.subscription,
                    admin: req.session.admin,
                    status: req.session.status,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                });
            }
        });
    }
    disarrange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.auth == true) {
                const users = yield prisma.users.findMany({
                    where: {
                        name: String(req.session.name)
                    },
                });
                yield prisma.users.updateMany({
                    where: {
                        name: String(req.session.name)
                    },
                    data: {
                        status: 'Free',
                    },
                });
                req.session.subscription = 'Free';
                (0, addLog_1.addLog)(` ${req.session.name} отказался от подписки`);
                res.render('home', {
                    'users': users,
                    auth: req.session.auth,
                    active: req.session.active,
                    admin: req.session.admin,
                    status: req.session.status,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    subscription: req.session.subscription,
                });
            }
            else {
                req.session.subscription = undefined;
                res.render('auth__login', {
                    auth: req.session.auth,
                    active: req.session.active,
                    subscription: req.session.subscription,
                    admin: req.session.admin,
                    status: req.session.status,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                });
            }
        });
    }
    BySubscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (req.session.subscription == 'Subscription') {
                const items = yield prisma.items.findMany({
                    where: {
                        id: Number(id)
                    }
                });
                res.render('watchZone', {
                    'items': items,
                    auth: req.session.auth,
                    active: req.session.active,
                    subscription: req.session.subscription,
                    admin: req.session.admin,
                    status: req.session.status,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                });
            }
            else {
                res.render('subscribe', {
                    auth: req.session.auth,
                    active: req.session.active,
                    subscription: req.session.subscription,
                    admin: req.session.admin,
                    status: req.session.status,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                });
            }
        });
    }
    forFree(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.findMany({
                where: {
                    id: Number(id)
                }
            });
            res.render('watchZone', {
                'items': items,
                auth: req.session.auth,
                active: req.session.active,
                subscription: req.session.subscription,
                admin: req.session.admin,
                status: req.session.status,
                dark__light: req.session.dark__light,
                category: req.session.category,
            });
        });
    }
}
exports.SubscribeController = SubscribeController;
