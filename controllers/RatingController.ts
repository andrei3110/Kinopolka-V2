import { Request, Response } from 'express';
import { items, users, bascet, comments, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
import { Console } from 'console';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class RatingController {


    async rating(req: Request, res: Response) {
        const { item__id, rate, text, item__name } = req.body;
        const { id } = req.params;
        const items = await prisma.items.findUnique({
            where: {
                id: Number(id)
            }

        })
        const rating = await prisma.rating.create({
            data: {
                rate: Number(rate),
                name: String(req.session.name),
                item__id: Number(item__id)
            }
            
            
        })
        
       await prisma.comments.create({
            data: {
                text: text,
                user__name: String(req.session.name),
                move__id: Number(item__id)
            }
        })
        req.session.mark = false
        const comment = await prisma.comments.findMany({
            where: {
                move__id:Number(id),
            }
           
        });
        let arr = await prisma.rating.findMany({
            where:{
                item__id: Number(id)
            }
        })
        await prisma.rating.findMany({
            where:{
                name:String(req.session.name)
            }
        })
        let summ = 0;
        let k = 0 ;
        
        for(let i = 0; i < arr.length; i++){
            summ = summ + arr[i].rate;
            k = i + 1;
        }
        let average = summ / k
        let rounded = Math.round(average * 10) / 10
   
        res.render('description', {
            mark: req.session.mark,
            admin: req.session.admin,
            auth: req.session.auth,
            password: req.session.password,
            dark__light: req.session.dark__light,
            number: Number(rounded),
            voices : k,
            'items': items,
            'rating': rating,
            'comments': comment
        });
    }

}