import { Routes, Route } from "react-router-dom";
import Overview from "./Pages/Overview/Overview";
import Analysis from "./Pages/Analysis/Analysis";
import Valuts from "./Pages/Valuts/Vaults";

function App() {
    return (
    <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/vaults" element={<Valuts />} />
    </Routes>
    );
}

export default App;