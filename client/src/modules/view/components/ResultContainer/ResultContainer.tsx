import {FC} from "react";

import {textMessages} from "../../texts";
import styles from './resultContainer.module.scss';

interface IResultContainerProps {
    result: string;
}
const ResultContainer: FC<IResultContainerProps> = ({result}) => {
    return (
        <div className={styles.result_container}>
            <h3>{textMessages.innerText.result}</h3>
            <div className={styles.result}>{result != null && result}</div>
        </div>
    );
};

export {ResultContainer};