import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
//import the routes
import Routes from "./routes";


const App = (props) => {
  
  const [path, setPath] = useState();
 
  window.addEventListener("load",() => {
    console.log("window loaded")
    if(window.location.pathname === "/additem"){
      //so we can hide the additem option on the menu
     setPath(window.location.pathname);
    }
   })
  

  const checkPath = () =>  {
     //listen to the changes in the router
     const unlistenHistory = props.history.listen((location) => {
       setPath(location.pathname);
     });
  }

  useEffect(() => {
    checkPath();
  })

  //check if the path matches the route
  const showAddItem = path;
  let addItem;
  if(showAddItem !== "/additem"){
    addItem =  <li id="additem"><Link to="/additem">Add Item</Link></li>
  }

 return (

  <div className="App">
  <nav>
  <ul>
    <li><Link to="/"> MERNHOOKS </Link></li>
  </ul>
  <ul>
    <li><Link to="/">Items</Link></li>
    {addItem}
  </ul>
</nav>
<Routes />
</div>
);
}

export default withRouter(App);
