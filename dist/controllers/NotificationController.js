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
exports.NotificationController = void 0;
const client_1 = require("@prisma/client");
// import "./authorizationcontroller"
const prisma = new client_1.PrismaClient();
class NotificationController {
    renderNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield prisma.chat.findMany({});
            res.render('notification', {
                'chat': chat,
                auth: req.session.auth,
                admin: req.session.admin,
                searchMove: req.session.searchMove,
                category: req.session.category,
                dark__light: req.session.dark__light,
            });
        });
    }
    send(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text } = req.body;
            const chat = yield prisma.chat.create({
                data: {
                    text: text
                }
            });
            res.redirect('/notification__btn');
        });
    }
}
exports.NotificationController = NotificationController;
