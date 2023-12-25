import {expiredItemsRemover} from "./expiredItemsRemover";

export const cronRunner = (): void => {
    expiredItemsRemover.start();
}