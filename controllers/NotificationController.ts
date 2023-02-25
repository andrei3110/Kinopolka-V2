import { Request, Response } from 'express';
import { items, users, bascet,chat, support, comments, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
import { Console } from 'console';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class NotificationController {
    async renderNotification(req: Request, res: Response) {
        const chat = await prisma.chat.findMany({})
        const categories = await prisma.categories.findMany({})
        res.render('account/notifications',{
            'chat' : chat,
            'categories':categories,
            auth: req.session.auth,
            admin: req.session.admin,
            searchMove:req.session.searchMove,
            category: req.session.category,
            dark__light: req.session.dark__light,
          });
    }
    async send(req: Request, res: Response) {
        const {text} = req.body
        const chat = await prisma.chat.create({
            data:{
                text:text
            }
        })
        res.redirect('/notification__btn');
    }
}