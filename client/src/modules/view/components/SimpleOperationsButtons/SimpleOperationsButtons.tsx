import {FC, MouseEventHandler, useContext} from "react";

import {CalculatorContext} from "../../context";
import {filterMathOperationsByType} from "../../utils";
import styles from './simpleOperationsButtons.module.scss';
import {OperationType} from "@common-enums";

interface ISimpleOperationsButtonsProps {
    clickHandler: MouseEventHandler<HTMLDivElement>;
}

const SimpleOperationsButtons: FC<ISimpleOperationsButtonsProps> = ({clickHandler}) => {
        const {mathOperations} = useContext(CalculatorContext);
        const simpleOperations = mathOperations && filterMathOperationsByType(mathOperations, OperationType.SIMPLE);

        return (
            <>
                {simpleOperations &&
                    simpleOperations.map(({operator}, index) => {
                        return <div onClick={clickHandler} key={operator} className={`${styles.view} simple`}
                                    style={{gridArea: `si${index}`}}>{operator}</div>
                    })}
            </>
        );
    }
;

export {SimpleOperationsButtons};