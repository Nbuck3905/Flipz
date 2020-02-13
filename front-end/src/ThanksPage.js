import React, { Component } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { history } from "./History";

export class ThanksPage extends Component {
  home = () => {
    history.push("/products");
  };

  render() {
    return (
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          padding: 100
        }}
      >
        <Card style={{ textAlign: "center" }}>
          <Card.Content>
            <Card.Header>Thank you for your purchase</Card.Header>
            <Card.Description>
              Thank you for trusting Flipz for your shoe needs. Please allow 3-5
              buisness days for your item to ship.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button positive onClick={this.home}>
              Exit
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default ThanksPage;
