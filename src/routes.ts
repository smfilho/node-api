import { Router } from "express";
import { AnswerController } from "./controller/AnswerController";
import { SendMailController } from "./controller/SendMailController";
import { SurveysController } from "./controller/SurveysController";
import { UserController } from "./controller/UserController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();

router.post("/users", userController.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute);
router.get("/answers/:value", answerController.execute);

export { router };
