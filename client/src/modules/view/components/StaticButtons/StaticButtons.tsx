import {Dispatch, SetStateAction, FC} from "react";

import {useClickHandler, useExpressionCalculationHandler, useStaticButtonsLogic} from "../../hooks";
import {staticButtons} from "../../constants";
import styles from './staticButtons.module.scss';

interface IStaticButtonsProps {
    setResult: Dispatch<SetStateAction<string>>;
}

const StaticButtons: FC<IStaticButtonsProps> = ({setResult}) => {
    const {staticButtonsClickHandler} = useStaticButtonsLogic();
    const {calculateExpressionAndSaveToHistory} = useExpressionCalculationHandler();
    const clickHandler = useClickHandler<HTMLDivElement>((e) => staticButtonsClickHandler(e));

    return (
        <>
            {staticButtons.map((button, index) => {
                return <div onClick={clickHandler} key={index} className={styles.view}
                            style={{gridArea: `st${index}`}}>{button}</div>
            })}
            <div onClick={() => calculateExpressionAndSaveToHistory(setResult)} className={styles.equals}
                 style={{gridArea: `st${staticButtons.length}`}}>=
            </div>
        </>
    );
};

export {StaticButtons};