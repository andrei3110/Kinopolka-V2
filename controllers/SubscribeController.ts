import { Request, Response } from 'express';
import { items, users, bascet, comments, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
import { addLog } from '../logs/addLog';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class SubscribeController {

    async RenderSubscribe(req: Request, res: Response) {

        res.render('subscribe', {
            auth: req.session.auth,
            active: req.session.active,
            admin: req.session.admin,
            status: req.session.status,
            dark__light: req.session.dark__light,
            category: req.session.category,
            subscription: req.session.subscription,


        });
    }
    async arrange(req: Request, res: Response) {

        if (req.session.auth == true) {

            const users = await prisma.users.findMany({
                where: {
                    name: String(req.session.name),
                },
            })
            
            await prisma.users.updateMany({
                where: {
                    name: String(req.session.name)
                },
                data: {
                    status: 'Subscription',
                },   
                
            })
            req.session.subscription = 'Subscription'
            addLog(` ${req.session.name} оформил подписку`)

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
        } else {
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

    }
    async disarrange(req: Request, res: Response) {
        
        if (req.session.auth == true) {

            const users = await prisma.users.findMany({
                where: {
                    name: String(req.session.name)
                },
            })
            await prisma.users.updateMany({
                where: {
                    name: String(req.session.name)
                },
                data: {
                    status: 'Free',
                },   
            })
            req.session.subscription = 'Free'
            addLog(` ${req.session.name} отказался от подписки`)

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
        } else {
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
    }
    async BySubscribe(req: Request, res: Response) {
        const {id} = req.params
        if(req.session.subscription == 'Subscription'){
            const items = await prisma.items.findMany({
                where:{
                    id:Number(id)
                }
            })
            
            res.render('watchZone', {
                'items' : items,
                auth: req.session.auth,
                active: req.session.active,
                subscription: req.session.subscription,
                admin: req.session.admin,
                status: req.session.status,
                dark__light: req.session.dark__light,
                category: req.session.category,
            });
        }else{
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
        
    }
    async forFree(req: Request, res: Response) {
        const {id} = req.params
        const items = await prisma.items.findMany({
            where:{
                id:Number(id)
            }
        })
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
}



