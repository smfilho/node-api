import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UserRepository";
import { SurveysUsersRepository } from "../repositories/SurveyUsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (!userAlreadyExists) {
      return response.status(400).json({
        error: "User does not exists",
      });
    }

    const survey = await surveysRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      return response.status(400).json({
        error: "User does not exists",
      });
    }

    // save info on surveyUser table
    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id: survey.id,
    });
    await surveysUsersRepository.save(surveyUser);

    // send e-mail to user
    await SendMailService.execute(email, survey.title, survey.description);

    return response.json(surveyUser);
  }
}

export { SendMailController };
