import React, { Component } from "react";
import "./Login.css";
import { login, ACCESS_TOKEN } from "./APIUtils";
import { Redirect } from "react-router-dom";

class Login extends Component {
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.error) {
      setTimeout(() => {
        alert(this.props.location.state.error);
        this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {},
        });
      }, 100);
    }
  }

  render() {
    if (this.props.authenticated) {
      return (
        <Redirect
          to={{
            pathname: "/leaflet",
            state: { from: this.props.location },
          }}
        />
      );
    }

    return (
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">Giriş Yap</h1>
          <LoginForm {...this.props} />
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const loginRequest = Object.assign({}, this.state);

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        alert("Başarılı bir şekilde giriş yapıldı.! " + response.accessToken);
        console.log(response.accessToken);
        this.props.history.push("/leaflet");
        window.location.reload(false);
      })
      .catch((error) => {
        alert((error && error.message) || "Oops! Giriş yapılamadı.");
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-item">
          <input           
            name="email"            
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            name="password"            
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <button type="submit" className="btn btn-block btn-primary">
            Giriş
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
