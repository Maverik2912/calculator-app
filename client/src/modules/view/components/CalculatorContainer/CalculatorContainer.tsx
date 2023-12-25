import {useContext, useEffect, useMemo, useState} from "react";

import {CalculatorUi} from "../CalculatorUi";
import {HistoryContainer} from "../HistoryContainer";
import {clientModulesRegistry} from "@modules";
import {CalculatorContext} from "../../context";
import {HistoryModuleState} from "@common-enums";
import styles from './calculatorContainer.module.scss';
import {historyConfig} from "../../configs";

const CalculatorContainer = () => {
    const {setHistory, history} = useContext(CalculatorContext);
    const historyService = useMemo(() => clientModulesRegistry.apiManager.services.history, []);
    const [historyLoading, setHistoryLoading] = useState<boolean>(true);

    useEffect(() => {
        historyService.getHistory(Number(historyConfig.limit))
            .then(({data: {historyModuleState, calculatorHistoryRecords}}) => {
                if (historyModuleState === HistoryModuleState.ENABLED) {
                    setHistory(calculatorHistoryRecords);
                }
            })
            .finally(() => {
                setHistoryLoading(false);
            });
    }, [historyService, setHistory]);

    return (
        <>
            {!historyLoading &&
                <div className={styles.container}>
                    <div className={styles.sub_container}>
                        <CalculatorUi/>
                        {history &&
                            <div className={styles.history_container}>
                                <HistoryContainer/>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    );
};

export {CalculatorContainer};