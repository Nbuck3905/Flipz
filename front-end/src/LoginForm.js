import React, { Component } from "react";
import { history } from "./History";
import background from "./images/Flipz.jpg";

export class LoginForm extends Component {
  state = {
    usernameInputValue: "",
    passwordInputValue: "",
    usernameInput: "",
    passwordInput: "",
    errorMessage: "",
    signUpView: false
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.usernameInputValue,
        password: this.state.passwordInputValue
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          this.setState({ errorMessage: user.message });
        } else {
          console.log(this.props);
          this.props.setLoggedInUser(user);
          history.push("/products");
        }
      });
  };

  handleSignUp = e => {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.usernameInput,
        password: this.state.passwordInput
      })
    })
      .then(res => res.json())
      .then(user => {
        console.log(user);
        if (user.error) {
          return this.setState({ errorMessage: user.message });
        } else {
          this.props.setLoggedInUser(user);
          history.push("/products");
        }
      });
  };

  renderLoginForm = () => {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh"
        }}
      >
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            top: "15%",
            position: "relative"
          }}
        >
          <div className="ui card">
            <div className="content">
              <h1>Login</h1>
              <form className="ui form">
                <div className="field">
                  <label>Username</label>
                  <input
                    placeholder="Username"
                    onChange={e =>
                      this.setState({ usernameInputValue: e.target.value })
                    }
                    value={this.state.usernameInputValue}
                    type="text"
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    placeholder="Password"
                    onChange={e =>
                      this.setState({ passwordInputValue: e.target.value })
                    }
                    value={this.state.passwordInputValue}
                    type="password"
                  />
                </div>
                <button
                  type="submit"
                  className="ui button"
                  onClick={this.handleSubmit}
                >
                  Login
                </button>
                <button
                  type="submit"
                  className="ui button"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ signUpView: true });
                  }}
                >
                  Create Account
                </button>
                {this.state.errorMessage ? (
                  <div style={{ color: "red" }}>
                    Invalid username or password.
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderSignupForm = () => {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh"
        }}
      >
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            top: "15%",
            position: "relative"
          }}
        >
          <div className="ui card">
            <div className="content">
              <h1>Create account</h1>
              <form className="ui form">
                <div className="field">
                  <label>Username</label>
                  <input
                    placeholder="Username"
                    onChange={e =>
                      this.setState({ usernameInput: e.target.value })
                    }
                    value={this.state.usernameInput}
                    type="text"
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    placeholder="Password"
                    onChange={e =>
                      this.setState({ passwordInput: e.target.value })
                    }
                    value={this.state.passwordInput}
                    type="password"
                  />
                </div>

                <button
                  type="submit"
                  className="ui button"
                  onClick={this.handleSignUp}
                >
                  Create Account
                </button>
                <button
                  type="submit"
                  className="ui button"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ signUpView: false });
                  }}
                >
                  Cancel
                </button>
                {this.state.errorMessage ? (
                  <div style={{ color: "red" }}>Username has been taken</div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.signUpView) {
      return this.renderSignupForm();
    } else {
      return this.renderLoginForm();
    }
  }
}

export default LoginForm;
