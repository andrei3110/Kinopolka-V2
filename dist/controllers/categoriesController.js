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
exports.CategoriesController = void 0;
const client_1 = require("@prisma/client");
// import "./authorizationcontroller"
const prisma = new client_1.PrismaClient();
class CategoriesController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let categories = yield prisma.categories.findMany({
                where: {
                    id: Number(id),
                }
            });
            let items = yield prisma.items.findMany({
                where: {
                    type: Number(id),
                }
            });
            if (req.session.category == Number(1)) {
                req.session.active = "genre";
            }
            else if (req.session.category == Number(2)) {
                req.session.active = "genre";
            }
            else if (req.session.category == Number(3)) {
                req.session.active = "genre";
            }
            const genres = yield prisma.genres.findMany({});
            const cartoons = yield prisma.cartoonGenres.findMany({});
            req.session.category = Number(id);
            res.render('types/index', {
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                status: req.session.status,
                dark__light: req.session.dark__light,
                category: req.session.category,
                count: req.session.count,
                'items': items,
                'categories': categories,
                'genres': genres,
                'cartoonGenres': cartoons
            });
        });
    }
    moves(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const genres = yield prisma.genres.findMany({
                where: {
                    name,
                }
            });
            const categories = yield prisma.categories.findMany({});
            console.log(req.session.category);
            const count = yield prisma.items.count({
                where: {
                    genre: {
                        contains: name
                    },
                    type: Number(req.session.category)
                }
            });
            if (count > 0) {
                let n = Math.ceil(count / 4);
                req.session.count = Math.ceil(count / 4);
                let itemsPerPage = 4;
                let page = Number(req.query.page);
                if (!page)
                    page = 1;
                if (page > n)
                    page = n;
                let pages = itemsPerPage * (page - 1);
                const items = yield prisma.items.findMany({
                    skip: pages,
                    take: itemsPerPage,
                    where: {
                        genre: {
                            contains: name
                        },
                        type: Number(req.session.category)
                    }
                });
                let k = 0;
                for (let i = 0; i < items.length; i++) {
                    k = k + 1;
                }
                res.render('types/moves', {
                    auth: req.session.auth,
                    active: req.session.active,
                    status: req.session.status,
                    admin: req.session.admin,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    count: req.session.count,
                    'categories': categories,
                    'items': items,
                    'genres': genres,
                });
            }
            else {
                const categories = yield prisma.categories.findMany({});
                const items = yield prisma.items.findMany({
                    where: {
                        genre: {
                            contains: name
                        },
                        type: Number(req.session.category)
                    }
                });
                res.render('types/moves', {
                    auth: req.session.auth,
                    active: req.session.active,
                    status: req.session.status,
                    admin: req.session.admin,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    count: req.session.count,
                    'categories': categories,
                    'items': items,
                    'genres': genres,
                });
            }
        });
    }
    cartoons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const genres = yield prisma.cartoonGenres.findMany({
                where: {
                    name
                }
            });
            const count = yield prisma.items.count({
                where: {
                    genre: {
                        contains: name
                    },
                    type: Number(req.session.category)
                }
            });
            if (count > 0) {
                let n = Math.ceil(count / 4);
                req.session.count = Math.ceil(count / 4);
                let itemsPerPage = 4;
                let page = Number(req.query.page);
                if (!page)
                    page = 1;
                if (page > n)
                    page = n;
                let pages = itemsPerPage * (page - 1);
                const items = yield prisma.items.findMany({
                    skip: pages,
                    take: itemsPerPage,
                    where: {
                        genre: {
                            contains: name
                        },
                        type: Number(req.session.category)
                    }
                });
                console.log(req.session.category);
                let k = 0;
                for (let i = 0; i < items.length; i++) {
                    k = k + 1;
                }
                res.render('types/moves', {
                    auth: req.session.auth,
                    status: req.session.status,
                    admin: req.session.admin,
                    active: req.session.active,
                    count: req.session.count,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    'items': items,
                    'cartoonGenres': genres,
                });
            }
            else {
                const items = yield prisma.items.findMany({
                    where: {
                        genre: {
                            contains: name
                        },
                        type: Number(req.session.category)
                    }
                });
                res.render('types/moves', {
                    auth: req.session.auth,
                    status: req.session.status,
                    admin: req.session.admin,
                    active: req.session.active,
                    count: req.session.count,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    'items': items,
                    'cartoonGenres': genres,
                });
            }
        });
    }
    searchFilms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            req.session.searchMove = false;
            const items = yield prisma.items.findMany({
                where: {
                    genre: {
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
            console.log(req.session.searchMove);
            res.render('searchHome', {
                'items': items,
                searchMove: req.session.searchMove,
                auth: req.session.auth,
                status: req.session.status,
                count: req.session.count,
                active: req.session.active,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                mark: req.session.mark
            });
        });
    }
    years(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.active = "year";
            const years = yield prisma.years.findMany({});
            res.render('types/years', {
                auth: req.session.auth,
                active: req.session.active,
                status: req.session.status,
                count: req.session.count,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'years': years
            });
        });
    }
    ByYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date } = req.params;
            const currentType = Number(req.session.category);
            const count = yield prisma.items.count({
                where: {
                    year: Number(date),
                    type: Number(req.session.category)
                }
            });
            if (count > 0) {
                let n = Math.ceil(count / 4);
                req.session.count = Math.ceil(count / 4);
                let itemsPerPage = 4;
                let page = Number(req.query.page);
                if (!page)
                    page = 1;
                if (page > n)
                    page = n;
                let pages = itemsPerPage * (page - 1);
                const items = yield prisma.items.findMany({
                    skip: pages,
                    take: itemsPerPage,
                    where: {
                        year: Number(date),
                        type: Number(req.session.category)
                    }
                });
                console.log(req.session.category);
                let k = 0;
                for (let i = 0; i < items.length; i++) {
                    k = k + 1;
                }
                res.render('types/moves', {
                    auth: req.session.auth,
                    status: req.session.status,
                    admin: req.session.admin,
                    active: req.session.active,
                    count: req.session.count,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    'items': items,
                });
            }
            else {
                const items = yield prisma.items.findMany({
                    where: {
                        year: Number(date),
                        type: Number(req.session.category)
                    }
                });
                res.render('types/moves', {
                    auth: req.session.auth,
                    status: req.session.status,
                    admin: req.session.admin,
                    active: req.session.active,
                    count: req.session.count,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    'items': items,
                });
            }
        });
    }
    ByGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            req.session.active = "genre";
            const genres = yield prisma.genres.findMany({});
            const cartoons = yield prisma.cartoonGenres.findMany({});
            res.render('types/index', {
                auth: req.session.auth,
                count: req.session.count,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'genres': genres,
                'cartoonGenres': cartoons
            });
        });
    }
    Country(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            req.session.active = "country";
            const country = yield prisma.country.findMany({});
            res.render('types/country', {
                auth: req.session.auth,
                count: req.session.count,
                active: req.session.active,
                status: req.session.status,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'country': country,
            });
        });
    }
    ByCountry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const currentType = Number(req.session.category);
            const count = yield prisma.items.count({
                where: {
                    country: {
                        contains: name
                    },
                    type: currentType
                }
            });
            if (count > 0) {
                let n = Math.ceil(count / 4);
                req.session.count = Math.ceil(count / 4);
                let itemsPerPage = 4;
                let page = Number(req.query.page);
                if (!page)
                    page = 1;
                if (page > n)
                    page = n;
                let pages = itemsPerPage * (page - 1);
                const items = yield prisma.items.findMany({
                    skip: pages,
                    take: itemsPerPage,
                    where: {
                        country: {
                            contains: name
                        },
                        type: currentType
                    }
                });
                console.log(req.session.category);
                let k = 0;
                for (let i = 0; i < items.length; i++) {
                    k = k + 1;
                }
                res.render('types/moves', {
                    auth: req.session.auth,
                    status: req.session.status,
                    admin: req.session.admin,
                    active: req.session.active,
                    count: req.session.count,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    'items': items,
                });
            }
            else {
                const items = yield prisma.items.findMany({
                    where: {
                        country: {
                            contains: name
                        },
                        type: currentType
                    }
                });
                res.render('types/moves', {
                    auth: req.session.auth,
                    status: req.session.status,
                    admin: req.session.admin,
                    active: req.session.active,
                    count: req.session.count,
                    dark__light: req.session.dark__light,
                    category: req.session.category,
                    'items': items,
                });
            }
        });
    }
}
exports.CategoriesController = CategoriesController;
