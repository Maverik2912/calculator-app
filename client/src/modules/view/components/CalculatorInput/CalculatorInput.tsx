import {Dispatch, FC, SetStateAction, useContext} from "react";

import {CalculatorContext} from "../../context";
import {useInputEventHandlers} from "../../hooks";
import styles from './calculatorInput.module.scss';

interface ICalculatorInputProps {
    setResult: Dispatch<SetStateAction<string>>;
}

const CalculatorInput: FC<ICalculatorInputProps> = ({setResult}) => {
    const {inputValue, setInputValue} = useContext(CalculatorContext);
    const {blurHandler, focusHandler, keyDownHandler} = useInputEventHandlers();

    return (
        <div className={styles.calculator_input_container}>
            <input
                value={inputValue}
                onKeyDown={(e) => keyDownHandler(e, setResult)}
                onChange={(event) => setInputValue(event.target.value)}
                onFocus={focusHandler}
                onBlur={blurHandler}
                className={styles.calculator_input}
                type="text"/>
        </div>
    );
};

export {CalculatorInput};