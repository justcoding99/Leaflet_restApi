import React from "react";
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';  
import axios from 'axios';


class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    let _this = this;
    axios.get('http://127.0.0.1:5000/users')
    .then(function (response) {
      _this.setState({
        users: response.data.users
      })
    })
    .catch(function (error) {
      console.log(error);
    });

  }


  render() {

    
    return (
      <div>
          Users
          {this.state.users.map(({ name, email }) => (
            <li key={email}>{name} - {email}</li>
      ))}
      </div>
    );
    
  }
}

export default withRouter(Users);