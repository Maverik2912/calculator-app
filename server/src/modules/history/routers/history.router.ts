import {Router} from "express";

import {historyController} from "../controllers";

export const historyRouter = Router();
historyRouter.get('/', historyController.getHistoryList);