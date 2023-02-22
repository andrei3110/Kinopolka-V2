"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const ItemsController_1 = require("./controllers/ItemsController");
const RatingController_1 = require("./controllers/RatingController");
const AuthController_1 = require("./controllers/AuthController");
const CommentsController_1 = require("./controllers/CommentsController");
const CategoriesController_1 = require("./controllers/CategoriesController");
const NotificationController_1 = require("./controllers/NotificationController");
const SubscribeController_1 = require("./controllers/SubscribeController");
const app = (0, express_1.default)();
const itemsController = new ItemsController_1.ItemsController();
const ratingController = new RatingController_1.RatingController();
const authController = new AuthController_1.AuthController();
const commentsController = new CommentsController_1.CommentsController();
const categoriesController = new CategoriesController_1.CategoriesController();
const notificationController = new NotificationController_1.NotificationController();
const subscribeController = new SubscribeController_1.SubscribeController();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
;
app.use((0, express_session_1.default)({ secret: "Secret", resave: false, saveUninitialized: true }));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get("/", (req, res) => {
    req.session.category = 1;
    res.render('home', {
        auth: req.session.auth,
        admin: req.session.admin,
        searchMove: req.session.searchMove,
        category: req.session.category,
        dark__light: req.session.dark__light,
    });
});
app.get("/notification__btn", (req, res) => {
    notificationController.renderNotification(req, res);
});
app.post("/sendMess", (req, res) => {
    notificationController.send(req, res);
});
app.get("/categories/:id", (req, res) => {
    categoriesController.index(req, res);
});
app.get("/byGenre", (req, res) => {
    categoriesController.ByGenre(req, res);
});
app.get("/from/moves/:name", (req, res) => {
    categoriesController.moves(req, res);
});
app.get("/moves", (req, res) => {
    categoriesController.moves(req, res);
});
app.get("/from/country/:name", (req, res) => {
    categoriesController.ByCountry(req, res);
});
app.get("/from/years/:date", (req, res) => {
    categoriesController.ByYear(req, res);
});
app.get("/years", (req, res) => {
    categoriesController.years(req, res);
});
app.get("/bySubscribe/:id", (req, res) => {
    subscribeController.BySubscribe(req, res);
});
app.get("/forfree/:id", (req, res) => {
    subscribeController.forFree(req, res);
});
app.get("/country", (req, res) => {
    categoriesController.Country(req, res);
});
app.get("/from/cartoons/:name", (req, res) => {
    categoriesController.cartoons(req, res);
});
app.get("/dark", (req, res) => {
    itemsController.dark(req, res);
});
app.get("/light", (req, res) => {
    itemsController.light(req, res);
});
app.post("/register/Form", (req, res) => {
    authController.registerForm(req, res);
});
app.get("/render/registration", (req, res) => {
    authController.renderRegistration(req, res);
});
app.get("/Logout", (req, res) => {
    authController.logout(req, res);
});
app.get("/render/login", (req, res) => {
    authController.renderLogin(req, res);
});
app.get("/registration", (req, res) => {
    authController.renderRegistration(req, res);
});
app.get("/loginForm", (req, res) => {
    authController.renderLogin(req, res);
});
app.post("/login", (req, res) => {
    authController.login(req, res);
});
app.get("/enter", (req, res) => {
    authController.renderLogin(req, res);
});
app.get("/add", (req, res) => {
    itemsController.Add(req, res);
});
app.post("/AddItems", (req, res) => {
    itemsController.AddItems(req, res);
});
app.post("/arrange", (req, res) => {
    subscribeController.arrange(req, res);
});
app.post("/disarrange", (req, res) => {
    subscribeController.disarrange(req, res);
});
app.post("/searchAllFilms", (req, res) => {
    itemsController.homeSearch(req, res);
});
app.post("/subscribe", (req, res) => {
    subscribeController.RenderSubscribe(req, res);
});
app.get("/home", (req, res) => {
    itemsController.home(req, res);
});
app.get("/bascet__btn", (req, res) => {
    itemsController.bascet(req, res);
});
app.get("/users__btn", (req, res) => {
    itemsController.users(req, res);
});
app.get("/delete/users/:id", (req, res) => {
    itemsController.delete__users(req, res);
});
app.get("/bascet", (req, res) => {
    itemsController.bascet(req, res);
});
app.get("/description", (req, res) => {
    itemsController.renderDes(req, res);
});
app.post("/save__Video", (req, res) => {
    itemsController.save__Video(req, res);
});
app.get("/save__Video", (req, res) => {
    itemsController.bascet(req, res);
});
app.get("/delete__Video/:id", (req, res) => {
    itemsController.delete__Video(req, res);
});
app.get("/delete__Video", (req, res) => {
    itemsController.bascet(req, res);
});
app.get("/des__film/:id", (req, res) => {
    itemsController.description(req, res);
});
app.post("/rating/:id", (req, res) => {
    ratingController.rating(req, res);
});
app.post("/des__film/:id", (req, res) => {
    commentsController.delete__Comment(req, res);
});
app.post("/home", (req, res) => {
    itemsController.searchMove(req, res);
});
app.get("/delete__moves/:id", (req, res) => {
    itemsController.delete__moves(req, res);
});
/////////////////////////////////////////////genres
app.post("/bovik", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/adventure", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/triller", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/horror", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/drama", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/comedy", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/melodrama", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/tragedy", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/fantastic", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/anime", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/mistyc", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/detective", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/child", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/family", (req, res) => {
    categoriesController.searchFilms(req, res);
});
app.post("/istoric", (req, res) => {
    categoriesController.searchFilms(req, res);
});
