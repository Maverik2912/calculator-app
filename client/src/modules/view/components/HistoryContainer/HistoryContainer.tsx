import {textMessages} from "../../texts";
import {HistoryItem} from "../HistoryItem";
import styles from './historyContainer.module.scss';

const HistoryContainer = () => {
   const {title} = textMessages.innerText.history;

    return (
        <>
            <h2 className={styles.history_title}>{title}</h2>
            <HistoryItem />
        </>
    );
};

export {HistoryContainer};