import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {FC, MouseEvent, useContext, useEffect, useState} from "react";

import {CalculatorContext} from "../../context";
import {IUpdatedInputValue} from "../../interfaces";
import {useClickHandler} from "../../hooks";
import {SymbolType} from "../../enums";
import styles from './engineeringOperationsButtons.module.scss';
import {OperationType} from "@common-enums";
import {filterMathOperationsByType} from "../../utils";

interface IEngineeringOperationsButtonsProps {
    displayMathOperatorsHandler: <T extends HTMLElement>(e: MouseEvent<T>) => IUpdatedInputValue;
}

const EngineeringOperationsButtons: FC<IEngineeringOperationsButtonsProps> = ({displayMathOperatorsHandler}) => {
    const {mathOperations} = useContext(CalculatorContext);
    const engineeringOperations = mathOperations && filterMathOperationsByType(mathOperations, OperationType.ENGINEERING);

    const [operation, setOperation] = useState<string>(SymbolType.EMPTY);

    const clickHandler = useClickHandler<HTMLOptionElement>((e) => displayMathOperatorsHandler(e));

    useEffect(() => {
        if (operation) {
            const syntheticEvent = {
                target: {
                    innerText: operation,
                }
            } as unknown as MouseEvent<HTMLOptionElement>;

            clickHandler(syntheticEvent);
            setOperation(SymbolType.EMPTY)
        }
    }, [operation, clickHandler]);

    const changeHandler = (event: SelectChangeEvent) => {
        const target = event.target as HTMLSelectElement;
        setOperation(target.value);
    };

    return (
        <div className={styles.eng_buttons_container}>
            <div>
                <FormControl sx={{m: 1, minWidth: 120}} size="small" className={styles.form_control}>
                    <InputLabel id="demo-select-small-label">Operation</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={operation}
                        label="Operation"
                        onChange={changeHandler}
                    >
                        {engineeringOperations &&
                            engineeringOperations.map(({outputText}) => {
                                return <MenuItem value={outputText} key={outputText}>{outputText}</MenuItem>
                            })}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export {EngineeringOperationsButtons};
