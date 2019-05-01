import React from "react";
import { Switch, Route} from "react-router-dom";

//import the components
import Main from "./components/main";
import Item from "./components/item";
import AddItem from "./components/additem";

const Routes = () => (
   
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/additem" component={AddItem} />
            <Route exact path="/item/:id" component={Item} />
        </Switch>
       
) 

export default Routes;