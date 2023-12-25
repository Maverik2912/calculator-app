import {CalculatorProvider} from "./modules/view/context";
import {clientModulesRegistry} from "@modules";

const App = () => {
    const {Calculator} = clientModulesRegistry.view;

    return (
        <CalculatorProvider>
            <Calculator />
        </CalculatorProvider>
    );
};

export default App;