import {Router} from "express";

import {expressionController} from "../../controllers";

export const expressionRouter = Router();

expressionRouter.post('/', expressionController.calculateAndSaveToDb);
