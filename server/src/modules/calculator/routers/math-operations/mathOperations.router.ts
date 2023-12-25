import {Router} from "express";

import {mathOperationsController} from "../../controllers";

export const mathOperationsRouter = Router();

mathOperationsRouter.get('/list', mathOperationsController.getData);