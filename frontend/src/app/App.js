import {Dashboard} from "../pages/dashboard/Dashboard";
import 'noty/lib/noty.css'
import '../asserts/css/noty.css'
require('dotenv').config()
function App() {
    return (
        <div className="App">
            <Dashboard/>
        </div>
    );
}

export default App;
