import {MouseEvent, useContext} from "react";

import {textMessages} from "../../texts";
import {CalculatorContext} from "../../context";
import styles from './historyItem.module.scss';

const HistoryItem = () => {
    const {arrow} = textMessages.innerText.history;
    const {setInputValue, history} = useContext(CalculatorContext);

    const clickHandler = (e: MouseEvent<HTMLSpanElement>): void => {
        const target = e.target as HTMLSpanElement;
        setInputValue(target.innerText);
    }

    return (
        <>
            {history &&
                history.map(({expression, result}) => {
                    return (
                        <div key={expression} className={styles.history_item}>
                            <span>{expression}</span>
                            <span>{arrow}</span>
                            <span className={styles.result} onClick={clickHandler}>{result}</span>
                        </div>
                    );
                })}
        </>
    );
};

export {HistoryItem};