import { Routes, Route } from "react-router-dom";
import Overview from "@/Pages/Overview/Overview";
import Analysis from "@/Pages/Analysis/Analysis";
import Valuts from "@/Pages/Valuts/Vaults";
import Settings from '@/Pages/Settings/Settings'
import Help from '@/Pages/Help/help'

function App() {
    return (
    <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/vaults" element={<Valuts />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
    </Routes>
    );
}

export default App;