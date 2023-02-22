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
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
// import "./authorizationcontroller"
const prisma = new client_1.PrismaClient();
class ItemsController {
    dark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.dark__light = false;
            res.render('home', {
                auth: req.session.auth,
                admin: req.session.admin,
                status: req.session.status,
                dark__light: req.session.dark__light,
                searchMove: req.session.searchMove,
            });
        });
    }
    light(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.dark__light = true;
            res.render('home', {
                auth: req.session.auth,
                admin: req.session.admin,
                status: req.session.status,
                dark__light: req.session.dark__light,
                searchMove: req.session.searchMove,
            });
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.items.deleteMany({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/');
        });
    }
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('home', {
                auth: req.session.auth,
                searchMove: req.session.searchMove,
                admin: req.session.admin,
                status: req.session.status,
                dark__light: req.session.dark__light,
            });
        });
    }
    homeSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const items = yield prisma.items.findMany({
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
        });
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = yield prisma.genres.findMany({});
            res.render('add', {
                'genres': genres,
                auth: req.session.auth,
                admin: req.session.admin,
                status: req.session.status,
                dark__light: req.session.dark__light,
                category: req.session.category,
            });
        });
    }
    AddItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, image, description, producer, actor, screenwriter, operator, regicer, year, type, age, country, status, genre, video, treller } = req.body;
            const items = yield prisma.items.findMany({
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
                    status: status,
                    video: video,
                    treller: treller
                }
            });
            let genres = yield prisma.genres.findMany({});
            let all = "";
            let one = "";
            for (let i = 0; i < genres.length; i++) {
                one = String(req.body.check);
                all = one + ',';
            }
            yield prisma.items.create({
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
                    status: status,
                    video: video,
                    treller: treller
                }
            });
            req.session.status = status;
            console.log(req.session.status);
            res.redirect('/add');
        });
    }
    bascet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, image, country, age, genre } = req.body;
            const bascet = yield prisma.bascet.findMany({
                where: {
                    name: name,
                    image: image,
                    country: country,
                    age: age,
                    genre: genre,
                    Username: String(req.session.name)
                }
            });
            res.render('bascet', {
                name: req.session.name,
                auth: req.session.auth,
                admin: req.session.admin,
                status: req.session.status,
                category: req.session.category,
                dark__light: req.session.dark__light,
                'bascet': bascet
            });
        });
    }
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    name: name,
                    password: password
                }
            });
            res.render('users', {
                name: req.session.name,
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                category: req.session.category,
                dark__light: req.session.dark__light,
                'users': users
            });
        });
    }
    description(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { item__name, text, user__name, nameId, commentName, itemsID } = req.body;
            const items = yield prisma.items.findUnique({
                where: {
                    id: Number(id)
                }
            });
            const rating = yield prisma.rating.findMany({
                where: {
                    item__id: Number(id),
                    name: String(req.session.name),
                }
            });
            yield prisma.items.findMany({
                where: {
                    name: nameId
                }
            });
            const comment = yield prisma.comments.findMany({
                where: {
                    move__id: Number(id),
                }
            });
            if (rating[0] != undefined) {
                req.session.mark = false;
            }
            else {
                req.session.mark = true;
            }
            // const {item__id} = req.body
            let arr = yield prisma.rating.findMany({
                where: {
                    item__id: Number(id)
                }
            });
            let summ = 0;
            let k = 0;
            for (let i = 0; i < arr.length; i++) {
                summ = summ + arr[i].rate;
                k = i + 1;
            }
            let average = summ / k;
            let rounded = Math.round(average * 10) / 10;
            yield prisma.comments.findMany({
                where: {
                    user__name: String(commentName),
                }
            });
            yield prisma.rating.findMany({
                where: {
                    name: String(req.session.name),
                }
            });
            res.render('description', {
                'items': items,
                'rating': rating,
                'comments': comment,
                number: Number(rounded),
                voices: k,
                auth: req.session.auth,
                password: req.session.password,
                status: req.session.status,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                mark: req.session.mark,
            });
        });
    }
    renderDes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.findMany({
                where: {
                    id: Number(id)
                }
            });
            res.render('description', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                mark: req.session.mark
            });
        });
    }
    save__Video(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, image, country, age, genre, Username } = req.body;
            const items = yield prisma.items.findMany({
                where: {
                    name: name,
                    image: image,
                    country: country,
                    age: age,
                    genre: genre
                }
            });
            yield prisma.bascet.create({
                data: {
                    name: name,
                    image: image,
                    country: country,
                    age: age,
                    genre: genre,
                    Username: String(req.session.name)
                }
            });
            const bascet = yield prisma.bascet.findMany({
                where: {
                    name: name,
                    image: image,
                    country: country,
                    age: age,
                    genre: genre,
                    Username: String(req.session.name)
                }
            });
            res.redirect('/bascet');
        });
    }
    delete__Video(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bascet = yield prisma.bascet.delete({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/bascet');
        });
    }
    delete__users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield prisma.users.delete({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/users__btn');
        });
    }
    searchMove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const items = yield prisma.items.findMany({
                where: {
                    name: {
                        contains: name
                    }
                }
            });
            if (items[0] != undefined) {
                req.session.searchMove = true;
            }
            else {
                req.session.searchMove = false;
            }
            res.render('searchHome', {
                'items': items,
                searchMove: req.session.searchMove,
                auth: req.session.auth,
                admin: req.session.admin,
                active: req.session.active,
                status: req.session.status,
                dark__light: req.session.dark__light,
                mark: req.session.mark
            });
        });
    }
    delete__moves(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.delete({
                where: {
                    id: Number(id)
                }
            });
            const genres = yield prisma.genres.findMany({});
            res.render('types/index', {
                'items': items,
                'genres': genres,
                searchMove: req.session.searchMove,
                auth: req.session.auth,
                admin: req.session.admin,
                status: req.session.status,
                active: req.session.active,
                category: req.session.category,
                dark__light: req.session.dark__light,
                mark: req.session.mark
            });
        });
    }
}
exports.ItemsController = ItemsController;
