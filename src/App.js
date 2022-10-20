import React from 'react';
import Home from './Components/Home';
import { TodoUpdate } from './Components/TodoUpdate';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
function App() {
  return (
    <Router>
   
    <Routes>
    <Route exact path=''  element={<Home/>}/>
    <Route exact path='/update/:id'  element={<TodoUpdate/>}/>
    
    </Routes>

    </Router>
  );
}

export default App;
