import {useState} from "react";

import {ResultContainer} from "../ResultContainer";
import {ButtonsContainer} from "../ButtonsContainer";
import {CalculatorInput} from "../CalculatorInput";
import {ButtonsProvider} from "../../context";
import {ToggleButtonComponent} from "../ToggleButton";
import {ShownOperationsType} from "../../enums";
import styles from './calculatorUi.module.scss';

const CalculatorUi = () => {
    const [result, setResult] = useState<string>(null);
    const [operationsType, setOperationsType] = useState<ShownOperationsType>(ShownOperationsType.ARITHMETIC);

    return (
        <div className={styles.calculator}>
                <CalculatorInput setResult={setResult}/>
                <ResultContainer result={result}/>
                <ToggleButtonComponent operationsType={operationsType} setOperationsType={setOperationsType} />

                <ButtonsProvider>
                    <ButtonsContainer setResult={setResult} operationsType={operationsType} />
                </ButtonsProvider>
        </div>
    );
};

export {CalculatorUi};
