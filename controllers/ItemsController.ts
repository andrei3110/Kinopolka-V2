import { Request, Response } from 'express';
import { items, users, bascet, comments,categories, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class ItemsController {

    async dark(req: Request, res: Response) {
        req.session.dark__light = false
        res.render('home', {
            auth: req.session.auth,
            admin: req.session.admin,
            status: req.session.status,
            dark__light: req.session.dark__light,
            searchMove:req.session.searchMove,
        });
    }
    async light(req: Request, res: Response) {
        req.session.dark__light = true
        res.render('home', {
            auth: req.session.auth,
            admin: req.session.admin,
            status: req.session.status,
            dark__light: req.session.dark__light,
            searchMove:req.session.searchMove,
        });
    }
    async destroy(req: Request, res: Response) {
        const { id } = req.body;

        await prisma.items.deleteMany({
            where: {
                id: Number(id)
            }

        });

        res.redirect('/');
    }
    async home(req: Request, res: Response) {
            res.render('home', {
                auth: req.session.auth,
                searchMove: req.session.searchMove,
                admin: req.session.admin,
                status: req.session.status,
                dark__light: req.session.dark__light,
            });
    }
    
    async homeSearch(req: Request, res: Response) {
        const { name } = req.body;
        const items = await prisma.items.findMany({
            where: {
                name: name
            }
        });

        res.render('home', {
            auth: req.session.auth,
            admin: req.session.admin,
            dark__light: req.session.dark__light,
            'items': items
        });
    }

    async Add(req: Request, res: Response) {
       const genres =  await prisma.genres.findMany({})
        res.render('add', {
            'genres': genres,
            auth: req.session.auth,
            admin: req.session.admin,
            status: req.session.status,
            dark__light: req.session.dark__light,
            category: req.session.category,
        });
    }
    async AddItems(req: Request, res: Response) {
        const { name, image, description, producer, actor, screenwriter, operator, regicer,year,type, age, country,status, genre, video, treller } = req.body;
        const items = await prisma.items.findMany({
            where: {

                name: name,
                image: image,
                description: description,
                producer: producer,
                actor: actor,
                screenwriter: screenwriter,
                operator: operator,
                regicer: regicer,
                type: Number(type),
                country: country,
                age: age,
                genre: genre,
                year: Number(year),
                status : status,
                video: video,
                treller:treller

            }
        });
        let genres = await prisma.genres.findMany({})
        
        
        let all = "";
        let one = "";
        for (let i= 0; i < genres.length; i++ ){
            one = String(req.body.check)
            all = one + ',';
        }

        await prisma.items.create({
            data: {
                name: name,
                image: image,
                description: description,
                producer: producer,
                actor: actor,
                screenwriter: screenwriter,
                operator: operator,
                regicer: regicer,
                type: Number(type),
                country: country,
                age: age,
                genre: all,
                year: Number(year),
                status : status,
                video:video,
                treller:treller
            }
        });
        req.session.status = status;
        console.log(req.session.status)
        res.redirect('/add')
    }

    async bascet(req: Request, res: Response) {
        const { name, image, country, age, genre } = req.body;
        const bascet = await prisma.bascet.findMany({
            where: {
                name: name,
                image: image,
                country: country,
                age: age,
                genre: genre,
                Username:String(req.session.name)
            }
        });
        res.render('bascet', {
            name:req.session.name,
            auth: req.session.auth,
            admin: req.session.admin,
            status: req.session.status,
            category: req.session.category,
            dark__light: req.session.dark__light,
            'bascet': bascet
        });
    }
    async users(req: Request, res: Response) {
        const {name, password} = req.body;
        const users = await prisma.users.findMany({
            where: {
                name: name,
                password:password
            }
        });
        res.render('users', {
            name:req.session.name,
            auth: req.session.auth,
            status: req.session.status,
            admin: req.session.admin,
            category: req.session.category,
            dark__light: req.session.dark__light,
            'users': users
        });
    }
    async description(req: Request, res: Response) {
        const { id } = req.params;
        const { item__name, text, user__name, nameId,commentName,itemsID} = req.body;

       
        const items = await prisma.items.findUnique({
            where: {
                id: Number(id)  
            }
           
        });
        
        const rating = await prisma.rating.findMany({
            where: {
                item__id: Number(id),
                name: String(req.session.name),
            }
        });
        await prisma.items.findMany({
            where: {
                name:nameId
            }
           
        });
        
        const comment = await prisma.comments.findMany({
            where: {
                move__id:Number(id),
            }
           
        });
        if (rating[0] != undefined) {

            req.session.mark = false

        } else {

            req.session.mark = true
        }

        // const {item__id} = req.body
        let arr = await prisma.rating.findMany({
            where:{
                item__id: Number(id)
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
      
        await prisma.comments.findMany({
            where: {
                user__name:String(commentName),
            }
           
        });
        await prisma.rating.findMany({
            where:{
                name:String(req.session.name),
            }
        })
        res.render('description', {
            'items': items,
            'rating' : rating,
            'comments': comment,
            number:Number(rounded),
            voices : k,
            auth: req.session.auth,
            password: req.session.password,
            status: req.session.status,
            admin: req.session.admin,
            dark__light: req.session.dark__light,
            mark: req.session.mark,

        });




    }
    
    

    async renderDes(req: Request, res: Response) {
        const {id} = req.params
         const items = await prisma.items.findMany({
            where:{
                id:Number(id)
            }
         })
        
        res.render('description', {

            auth: req.session.auth,
            status: req.session.status,
            admin: req.session.admin,
            dark__light: req.session.dark__light,
            mark: req.session.mark
        });
    }

    async save__Video(req: Request, res: Response) {
        const { name, image, country, age, genre,Username} = req.body;
        const items = await prisma.items.findMany({
            where: {
                name: name,
                image: image,
                country: country,
                age: age,
                genre: genre
            }
        });

        await prisma.bascet.create({
            data: {
                name: name,
                image: image,
                country: country,
                age: age,
                genre: genre,
                Username:String(req.session.name)
            }
        });
        const bascet = await prisma.bascet.findMany({
            where: {
                name: name,
                image: image,
                country: country,
                age: age,
                genre: genre,
                Username:String(req.session.name)
            }
        });
        res.redirect('/bascet');
    }

    async delete__Video(req: Request, res: Response) {
        const { id } = req.params;
        const bascet = await prisma.bascet.delete({
            where: {
                id: Number(id)
            }
        });
        res.redirect('/bascet');
    }
    async delete__users(req: Request, res: Response) {
        const { id } = req.params;
        const users = await prisma.users.delete({
            where: {
                id: Number(id)
            }
        });
        res.redirect('/users__btn');
    }
    async searchMove(req: Request, res: Response) {
        const { name } = req.body;
        const items = await prisma.items.findMany({
            where: {
                name:{
                    contains: name
                }
            }
           
        });
        if(items[0] != undefined){
            req.session.searchMove = true
        }else{
            req.session.searchMove = false
        }
        

        res.render('searchHome',{
            'items': items,
            searchMove:req.session.searchMove,
            auth: req.session.auth,
            admin: req.session.admin,
            active:req.session.active,
            status: req.session.status,
            dark__light: req.session.dark__light,
            mark: req.session.mark
        })
    }
    async delete__moves(req: Request, res: Response) {
        const { id } = req.params;
        const items = await prisma.items.delete({
            where: {
                id: Number(id)
            }
        });
        const genres = await prisma.genres.findMany({

        })
        res.render('types/index',{
            'items': items,
            'genres':genres,
            searchMove:req.session.searchMove,
            auth: req.session.auth,
            admin: req.session.admin,
            status: req.session.status,
            active:req.session.active,
            category: req.session.category,
            dark__light: req.session.dark__light,
            mark: req.session.mark
        });
    }

}



