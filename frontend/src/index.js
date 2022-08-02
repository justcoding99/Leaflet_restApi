import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./styles.css";
import Login from "./Login";
import { Leaflet } from "./leaflet";
import Signup from "./Signup";
import Users from "./users";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getCurrentUser,ACCESS_TOKEN } from "./APIUtils";




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      collapsed: false,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this)
  }



 handleLogout(){
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated : false,
      currentUser : null,
      loading: true,
    });
    alert("Çıkış yapıldı");
  }



  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: true,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }
  componentDidMount(){
    this.loadCurrentlyLoggedInUser();
  }
  render() {
    return (
      <Router>
        <div>
          <nav>          
             {
              this.state.authenticated ? (
                <ul>
              <li>
                <Link to="/leaflet">Leaflet</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/logout" onClick={this.handleLogout} >Logout</Link>
                
              </li>
              </ul>
              ): 
              (  <ul>
                  <li>
                  <Link to="/LoginForm">Login</Link>
                </li>
              </ul>
              )} 
          </nav>





          
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/leaflet">
              <Leaflet />            
            </Route>
              
            <Route
              path="/LoginForm"
              render={(props) => (
                <Login authenticated={this.state.authenticated} {...props} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}



const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
