import {IMathOperations} from "../../../interfaces";


/**
 * Interface representing a service for getting list of math operations.
 */
export interface IMathOperationsService {
    getData(): IMathOperations,
}