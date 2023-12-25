import {Dispatch, FC, SetStateAction} from "react";

import {StaticButtons} from "../StaticButtons";
import {HelperButtons} from "../HelperButtons";
import {SimpleOperationsButtons} from "../SimpleOperationsButtons";
import {useClickHandler, useOperatorOutputHandler} from "../../hooks";
import {AdvancedOperationsButtons} from "../AdvancedOperationsButtons";
import {EngineeringOperationsButtons} from "../EngineeringOperationsButtons";
import {ShownOperationsType} from "../../enums";
import './buttonsContainer.scss';

interface IButtonsContainerProps {
    setResult: Dispatch<SetStateAction<string>>;
    operationsType: ShownOperationsType;
}
const ButtonsContainer: FC<IButtonsContainerProps> = ({setResult, operationsType}) => {
    const {displayMathOperatorsHandler} = useOperatorOutputHandler();
    const clickHandler = useClickHandler<HTMLDivElement>((e) => displayMathOperatorsHandler(e));

    return (
        <div className="flex_container">
            {operationsType === ShownOperationsType.ARITHMETIC ?
                <AdvancedOperationsButtons clickHandler={clickHandler}/>
                :
                <EngineeringOperationsButtons displayMathOperatorsHandler={displayMathOperatorsHandler} />
            }

            <div className="handlers">
                <HelperButtons setResult={setResult}/>
                <StaticButtons setResult={setResult}/>
                <SimpleOperationsButtons clickHandler={clickHandler}/>
            </div>
        </div>
    );
};
export {ButtonsContainer};