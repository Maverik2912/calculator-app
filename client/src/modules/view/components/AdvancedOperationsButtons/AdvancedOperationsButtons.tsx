import {FC, MouseEventHandler, useContext} from "react";

import {CalculatorContext} from "../../context";
import styles from './advancedOperationsButtons.module.scss';
import {OperationType} from "@common-enums";
import {filterMathOperationsByType} from "../../utils";

interface IAdvancedOperationsButtonsProps {
    clickHandler: MouseEventHandler<HTMLDivElement>;
}

const AdvancedOperationsButtons: FC<IAdvancedOperationsButtonsProps> = ({clickHandler}) => {
    const {mathOperations} = useContext(CalculatorContext);
    const advancedOperations = mathOperations && filterMathOperationsByType(mathOperations, OperationType.ADVANCED);

    return (
        <div className={styles.advancedOperations}>
            {advancedOperations &&
                advancedOperations.map(({outputText}) => {
                    return <div onClick={clickHandler} className={styles.operation} key={outputText}>{outputText}</div>
                })}
        </div>
    );
};

export {AdvancedOperationsButtons};