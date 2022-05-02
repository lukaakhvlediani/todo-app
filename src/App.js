import "./App.css";
import { Input } from "./Input";
import {Login } from "./Login"
import {Register} from "./Register"
import {
  BrowserRouter as Router,

  Route,
 
  Routes
} from "react-router-dom";
import RequireAuth from "./UseAuth";
function App() {
  return (
    <div className="App">
   <Routes>
      
      <Route  path="/" index element={<Login />} 
      />
    
 
      <Route  path="Register" index element={<Register />} 
      />
           <Route  path="Todos" index element={<RequireAuth><Input /></RequireAuth>} 
      />
      
       
      
    </Routes>
    </div>
  );
}

export default App;
