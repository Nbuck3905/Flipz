import React, { Component } from "react";
import background from "./images/Flipz.jpg";
import { Button } from "semantic-ui-react";
import { history } from "./History";

export class HomePage extends Component {
  render() {
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
          <div class="ui card">
            <div class="content">
              <div
                class="header"
                style={{ justifyContent: "center", display: "flex" }}
              >
                Flipz
              </div>
            </div>
            <div class="content">
              <div class="description">
                Welcome to Flipz a website made to make your "Flipz" easier.
                <br />
                <br />
                Click the Login button to login or create a account.
              </div>
            </div>
            <div
              class="extra content"
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Button secondary onClick={() => history.push("./Login")}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
