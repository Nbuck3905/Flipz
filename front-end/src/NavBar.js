import React, { Component } from "react";
import { history } from "./History";
import { Input, Menu, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

export class NavBar extends Component {
  state = { activeItem: "" };

  handleItemClick = name => this.setState({ activeItem: name });

  handleChange = e => {
    let productList = [];
    let searchedProductList = [];

    if (e.target.value !== "") {
      productList = this.props.products;
      searchedProductList = productList.filter(product => {
        const lc = product.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      searchedProductList = this.props.products;
    }
    this.setState({
      filtered: searchedProductList
    });
    this.handleChange = this.handleChange.bind(this);
  };

  handleLogOut = () => {
    console.log("signing out");
    history.push("/login");
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include"
    });
    history.push("/");
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu secondary style={{ padding: 15, justifyContent: "center" }}>
          <Link to="/products">
            <Menu.Item
              name="products"
              active={activeItem === "products" ? true : false}
              onClick={() => this.handleItemClick("products")}
            />
          </Link>
          <Link to="/sellersform">
            <Menu.Item
              name="sell"
              active={activeItem === "sell" ? true : false}
              onClick={() => this.handleItemClick("sell")}
            />
          </Link>
          <Link to="/viewcart">
            <Menu.Item
              name="cart"
              active={activeItem === "cart"}
              onClick={() => (this.handleItemClick("cart") ? true : false)}
            />
          </Link>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                icon="search"
                placeholder="Search..."
                onChange={this.props.action}
              />
            </Menu.Item>
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleLogOut}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default NavBar;
