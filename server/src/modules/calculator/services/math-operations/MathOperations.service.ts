import {IMathOperationsService} from "./interfaces";
import {mathOperations} from "../../config";
import {IMathOperations} from "../../interfaces";

class MathOperationsService implements IMathOperationsService{
    /**
     * Method retrieves mathOperations data from service to client.
     * @returns {IMathOperations} MathOperations data.
     */
    public getData(): IMathOperations {
        return <IMathOperations>mathOperations;
    }
}
export const mathOperationsService = new MathOperationsService();