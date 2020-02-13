import React, { Component } from "react";
import { LoginForm } from "./LoginForm";
import { ProductPage } from "./ProductPage";
import NavBar from "./NavBar";
import { history } from "./History";
import { Router, Route, Switch } from "react-router-dom";
import { SellersForm } from "./SellersForm";
import { HomePage } from "./HomePage";
import { CartPage } from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import ThanksPage from "./ThanksPage";

export default class App extends Component {
  state = {
    loggedInUser: null
  };

  componentDidMount() {
    fetch("http://localhost:3000/user", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(loggedInUser => {
        this.setState({ loggedInUser: loggedInUser });
      });
  }

  setLoggedInUser = user => {
    console.log(user);
    this.setState({ loggedInUser: user });
    localStorage.setItem("current_user", user);
  };

  render() {
    return (
      <Router history={history}>
        <Switch>
          <div className="App">
            <Route
              path="/login"
              render={props => (
                <LoginForm {...props} setLoggedInUser={this.setLoggedInUser} />
              )}
            />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/products" component={ProductPage} />
            <Route exact path="/logout" component={NavBar} />
            <Route exact path="/sellersform" component={SellersForm} />
            <Route exact path="/viewcart" component={CartPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/thanks" component={ThanksPage} />
          </div>
        </Switch>
      </Router>
    );
  }
}
