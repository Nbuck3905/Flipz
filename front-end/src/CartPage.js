import React, { Component } from "react";
import NavBar from "./NavBar";
import { Button, Card, Image } from "semantic-ui-react";
import { history } from "./History";

export class CartPage extends Component {
  state = {
    items: [],
    total: null
  };

  componentDidMount() {
    fetch(`http://localhost:3000/view_cart`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(items => {
        console.log(items);
        let total = 0;
        let prices = items.map(item => item.listing.price);
        console.log(prices);
        prices.forEach(price => (total += parseInt(price)));
        this.setState({ items: items, total: total });
      });
  }

  checkOut = () => {
    history.push("/checkout");
  };

  delete = chosen_item => {
    fetch(
      `http://localhost:3000/transactions/delete/${chosen_item.transaction.id}`
    ).then(
      this.setState({
        items: this.state.items.filter(
          item => item.transaction.id !== chosen_item.transaction.id
        ),
        total: this.state.total - parseInt(chosen_item.listing.price)
      })
    );
  };

  render() {
    console.log(this.state.items);
    return (
      <div>
        <NavBar />
        <div>
          <h1
            style={{
              textAlign: "center",
              padding: 20
            }}
          >
            Items in your cart
          </h1>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              color: "green"
            }}
          >
            <h2>Total: ${this.state.total}</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              minHeight: 100,
              padding: 15
            }}
          >
            {this.state.items.map(item => {
              return (
                <Card style={{ width: "40vw" }}>
                  <Card.Content>
                    <Card.Header>{`${item.product.name}`}</Card.Header>
                    <Image
                      src={item.product.image}
                      style={{ width: "90%", paddingLeft: "5%" }}
                    />
                  </Card.Content>
                  <Card.Content
                    extra
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "space-between"
                    }}
                  >
                    <Card.Header
                      style={{
                        textAlign: "center",
                        display: "inline-block"
                      }}
                    >
                      ${item.listing.price} - Size {item.listing.size}
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Button
                      negative
                      style={{
                        float: "right",
                        display: "inline-block",
                        position: "relative"
                      }}
                      onClick={() => this.delete(item)}
                    >
                      -
                    </Button>
                  </Card.Content>
                </Card>
              );
            })}
          </div>
          <div
            style={{ justifyContent: "center", display: "flex", padding: 10 }}
          >
            <Button positive onClick={this.checkOut}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
