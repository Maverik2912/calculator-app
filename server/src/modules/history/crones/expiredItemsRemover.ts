import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import {historyRepository} from "../repositories";
import {dbConstants} from "@constants";

dayjs.extend(utc);
export const removeOldCalculatorItems = async () => {
    try {
        const prevHour = dayjs().utc().subtract(dbConstants.expiresInHours, "hour").toISOString();
        await historyRepository.deleteManyByTimestamp(prevHour);
    } catch (e) {
        throw new Error(e.message);
    }
};

export const expiredItemsRemover = new CronJob("0 0 * * *", removeOldCalculatorItems);
