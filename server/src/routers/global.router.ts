import {Router} from "express";

import {modulesRegistry} from "@modules";

export const globalRouter = Router();

globalRouter.use('/math-operations', modulesRegistry.Calculator.Routers.mathOperationsRouter);
globalRouter.use('/expression', modulesRegistry.Calculator.Routers.expressionRouter);
globalRouter.use('/history', modulesRegistry.History.Routers);
