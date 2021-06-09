import Header from "./components/home.js";
import Signup from "./components/signup.js";
import Profileinst from "./components/profileinst.js";
import Profilefac from "./components/profilefac.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Facultyinst from "./components/facultyinst.js";
import Facultyfac from "./components/faculfac.js";
import Profilestud from "./components/profilestud.js";
import Subjectstud from "./components/subjectstud.js";
import Studentsec from "./components/studentfac.js";
function App() {
  return (
    
    <div>
    
    
      <Router>
        
        <Switch>
            <Route exact path="/">
              <Header/>
            </Route>
            <Route exact path="/facultyinst">
              <Facultyinst/>
            </Route>
            <Route exact path="/facultyfac">
              <Facultyfac/>
            </Route>
            <Route exact path="/subjectstud">
              <Subjectstud/>
            
            </Route>
            <Route exact path="/studentsec">
              <Studentsec/>
            
            </Route>
            <Route exact path="/signup">
              <Signup/>
            
            </Route>
            <Route exact path="/profileinst">
              <Profileinst/>
            </Route>
            <Route exact path="/profilefac">
              <Profilefac/>
            </Route>
            <Route exact path="/profilestud">
              <Profilestud/>
            </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
