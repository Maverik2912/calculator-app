import {Dispatch, FC, SetStateAction} from "react";

import {useClickHandler, useHelperButtonLogic} from "../../hooks";
import {helperButtons} from "../../constants";
import styles from './helperButtons.module.scss';

interface IHelperButtonsProps {
    setResult: Dispatch<SetStateAction<string>>;
}

const HelperButtons: FC<IHelperButtonsProps> = ({setResult}) => {
    const {helperButtonsClickHandler} = useHelperButtonLogic();
    const clickHandler = useClickHandler<HTMLDivElement>(e => helperButtonsClickHandler(e, setResult));

    return (
        <>
            {helperButtons.map((button, index) => {
                return <div onClick={clickHandler} key={index} className={styles.view} style={{gridArea: `he${index}`}}>{button}</div>
            })}
        </>
    );
};

export {HelperButtons};