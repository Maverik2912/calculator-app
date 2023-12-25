import React, {Dispatch, FC, SetStateAction} from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

import {ShownOperationsType} from "../../enums";
import styles from './toggleButtonComponent.module.scss';

interface IToggleButtonComponentProps {
    operationsType: ShownOperationsType;
    setOperationsType: Dispatch<SetStateAction<ShownOperationsType>>;
}

const ToggleButtonComponent: FC<IToggleButtonComponentProps> = ({setOperationsType, operationsType}) => {
    const onChangeHandler = (event: React.MouseEvent<HTMLElement>, value: ShownOperationsType): void => {
            setOperationsType(value);
    };

    return (
        <ToggleButtonGroup
            className={styles.toggleButtons}
            color="info"
            value={operationsType}
            exclusive
            onChange={onChangeHandler}
            size="small"
        >
            <ToggleButton value={ShownOperationsType.ARITHMETIC}>{ShownOperationsType.ARITHMETIC}</ToggleButton>
            <ToggleButton value={ShownOperationsType.ENGINEERING}>{ShownOperationsType.ENGINEERING}</ToggleButton>
        </ToggleButtonGroup>
    );
};

export {ToggleButtonComponent};