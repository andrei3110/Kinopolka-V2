import { Request, Response } from 'express';
import { items, users, bascet, comments, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class CommentsController {

    async delete__Comment(req: Request, res: Response) {
        const { id } = req.params;
        const { move__id, text, item__id ,itemsID, user__name, nameId, commentId, ratingId } = req.body;

        const items = await prisma.items.findUnique({
            where: {
                id: Number(id)  
            }
           
        });
        await prisma.comments.deleteMany({
            where: {
                id: Number(commentId),
                user__name:String(req.session.name)
            }
        });
        
        
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

        const rating = await prisma.rating.deleteMany({
            where: {
                name:String(req.session.name),
                item__id:Number(itemsID)
            }
        });
        
        let summ = 0;
        let k = 0 ;
        
        for(let i = 0; i < arr.length; i++){
            summ = summ + arr[i].rate;
            k = i + 1;
        }
        let average = summ / k
        let rounded = Math.round(average * 10) / 10
    
      
        res.render('description', {
            'rating' : rating,
            'items': items,
            'comments': comment,
            number: Number(rounded),
            voices : k,
            auth: req.session.auth,
            mark: req.session.mark,
            admin: req.session.admin,
            dark__light: req.session.dark__light,

        });
    }

    
}



