import React, { Component } from "react";
import NavBar from "./NavBar";
import { Button, Form, Checkbox, Card } from "semantic-ui-react";
import { history } from "./History";

export class CheckoutPage extends Component {
  buy = () => {
    fetch("http://localhost:3000/check_out", {
      credentials: "include"
    }).then(this.thanks);
  };

  thanks = () => {
    history.push("/thanks");
  };

  render() {
    return (
      <div>
        <NavBar />
        <div
          style={{
            padding: 100,
            justifyContent: "center",
            display: "flex"
          }}
        >
          <div>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Card.Content>
                <Card.Header style={{ padding: 15 }}>Checkout</Card.Header>
                <Form onSubmit={this.buy}>
                  <Form.Field>
                    <label>Full name</label>
                    <input placeholder="Full name" />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input placeholder="Email" />
                  </Form.Field>
                  <Form.Field>
                    <label>Card #</label>
                    <input placeholder="Card #" />
                  </Form.Field>
                  <Form.Field>
                    <label>Address</label>
                    <input placeholder="Address" />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox label="I agree to the Terms and Conditions" />
                  </Form.Field>
                  <Button positive onClick={this.buy} type="submit">
                    Buy
                  </Button>
                </Form>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutPage;
