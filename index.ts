import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import { ItemsController } from './controllers/ItemsController';
import { RatingController } from './controllers/RatingController';
import { AuthController } from './controllers/AuthController';
import { CommentsController } from './controllers/CommentsController';
import { CategoriesController } from './controllers/CategoriesController';
import { NotificationController } from './controllers/NotificationController';
import { SubscribeController } from './controllers/SubscribeController';
const app: Express = express();
const itemsController = new ItemsController();
const ratingController = new RatingController();
const authController = new AuthController();
const commentsController = new CommentsController();
const categoriesController = new CategoriesController();
const notificationController = new NotificationController();
const subscribeController = new SubscribeController();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Инициализация сессии
declare module "express-session" {
  interface SessionData {
    auth: boolean,
    admin: boolean,
    searchMove:boolean,
    username: string,
    category: Number,
    mark: boolean,
    name: String,
    password:String,
    nameMove:String,
    checkId:String,
    dark__light:boolean,
    deleteComment:boolean,
    test:Number,
    count:Number,
    active: String,
    status : String,// статус фильма 
    subscription:String, // статус пользователя 
    interStatus: String // промежуточный статус пользователя


  }
};

app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get("/", (req: Request, res: Response) => {
  req.session.category = 1;
  res.render('home',{
    auth: req.session.auth,
    admin: req.session.admin,
    searchMove:req.session.searchMove,
    category: req.session.category,
    dark__light: req.session.dark__light,
  });
});

app.get("/notification__btn", (req: Request, res: Response) => {
  notificationController.renderNotification(req, res);
});
app.post("/sendMess", (req: Request, res: Response) => {
  notificationController.send(req, res);
});
app.get("/categories/:id", (req: Request, res: Response) => {
  categoriesController.index(req, res);
});
app.get("/byGenre", (req: Request, res: Response) => {
  categoriesController.ByGenre(req, res);
});
app.get("/from/moves/:name", (req: Request, res: Response) => {
  categoriesController.moves(req, res);
});
app.get("/moves", (req: Request, res: Response) => {
  categoriesController.moves(req, res);
});
app.get("/from/country/:name", (req: Request, res: Response) => {
  categoriesController.ByCountry(req, res);
});
app.get("/from/years/:date", (req: Request, res: Response) => {
  categoriesController.ByYear(req, res);
});
app.get("/years", (req: Request, res: Response) => {
  categoriesController.years(req, res);
});
app.get("/bySubscribe/:id", (req: Request, res: Response) => {
  subscribeController.BySubscribe(req, res);
});
app.get("/forfree/:id", (req: Request, res: Response) => {
  subscribeController.forFree(req, res);
});
app.get("/country", (req: Request, res: Response) => {
  categoriesController.Country(req, res);
});
app.get("/from/cartoons/:name", (req: Request, res: Response) => {
  categoriesController.cartoons(req, res);
});
app.get("/dark", (req: Request, res: Response) => {
  itemsController.dark(req, res);
});
app.get("/light", (req: Request, res: Response) => {
  itemsController.light(req, res);
});
app.post("/register/Form", (req: Request, res: Response) => {
  authController.registerForm(req, res);
})
app.get("/render/registration", (req: Request, res: Response) => {
  authController.renderRegistration(req, res);
});
app.get("/Logout", (req: Request, res: Response) => {
  authController.logout(req, res);
});
app.get("/render/login", (req: Request, res: Response) => {
  authController.renderLogin(req, res);
});
app.get("/registration", (req: Request, res: Response) => {
  authController.renderRegistration(req, res);
});
app.get("/loginForm", (req: Request, res: Response) => {
  authController.renderLogin(req, res);
});
app.post("/login", (req: Request, res: Response) => {
  authController.login(req, res);
})
app.get("/enter", (req: Request, res: Response) => {
  authController.renderLogin(req, res);
})
app.get("/add", (req: Request, res: Response) => {
  itemsController.Add(req, res);
});
app.post("/AddItems", (req: Request, res: Response) => {
  itemsController.AddItems(req, res);
});
app.post("/arrange", (req: Request, res: Response) => {
  subscribeController.arrange(req, res);
});
app.post("/disarrange", (req: Request, res: Response) => {
  subscribeController.disarrange(req, res);
});
app.post("/searchAllFilms", (req: Request, res: Response) => {
  itemsController.homeSearch(req, res);
});
app.post("/subscribe", (req: Request, res: Response) => {
  subscribeController.RenderSubscribe(req, res);
});
app.get("/home", (req: Request, res: Response) => {
  itemsController.home(req, res);
});
app.get("/bascet__btn", (req: Request, res: Response) => {
  itemsController.bascet(req, res);
});
app.get("/users__btn", (req: Request, res: Response) => {
  itemsController.users(req, res);
});
app.get("/delete/users/:id", (req: Request, res: Response) => {
  itemsController.delete__users(req, res);
});
app.get("/bascet", (req: Request, res: Response) => {
  itemsController.bascet(req, res);
});

app.get("/description", (req: Request, res: Response) => {
  itemsController.renderDes(req, res);
});
app.post("/save__Video", (req: Request, res: Response) => {
  itemsController.save__Video(req, res);
});
app.get("/save__Video", (req: Request, res: Response) => {
  itemsController.bascet(req, res);
});
app.get("/delete__Video/:id", (req: Request, res: Response) => {
  itemsController.delete__Video(req, res);
});
app.get("/delete__Video", (req: Request, res: Response) => {
  itemsController.bascet(req, res);
});
app.get("/des__film/:id", (req: Request, res: Response) => {
  itemsController.description(req, res);
});
app.post("/rating/:id", (req: Request, res: Response) => {
  ratingController.rating(req, res);
});
app.post("/des__film/:id", (req: Request, res: Response) => {
  commentsController.delete__Comment(req, res);
});
app.post("/home", (req: Request, res: Response) => {
  itemsController.searchMove(req, res);
});
app.get("/delete__moves/:id", (req: Request, res: Response) => {
  itemsController.delete__moves(req, res);
});
/////////////////////////////////////////////genres
app.post("/bovik", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/adventure", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/triller", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/horror", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/drama", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/comedy", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/melodrama", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/tragedy", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/fantastic", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/anime", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/mistyc", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/detective", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/child", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/family", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});
app.post("/istoric", (req: Request, res: Response) => {
  categoriesController.searchFilms(req, res);
});


