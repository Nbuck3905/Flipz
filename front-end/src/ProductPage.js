import React, { Component } from "react";
import { NavBar } from "./NavBar";
import { ProductCard } from "./ProductCards";
import background from "./images/product.jpg";
import styles from "./styles.css";
import { Button } from "semantic-ui-react";

export class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filtered: [],
      paginated: [],
      page: 1,
      searchTerm: ""
    };
  }

  paginator = (items, page, per_page) => {
    page = page || 1;
    per_page = per_page || 10;
    let offset = (page - 1) * per_page;
    let paginatedItems = items.slice(offset).slice(0, per_page);
    let total_pages = Math.ceil(items.length / per_page);
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  };

  handleChange = e => {
    let productList = [];
    let searchedProductList = [];

    if (e.target.value !== "") {
      productList = this.state.products;
      searchedProductList = productList.filter(product => {
        const lc = product.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      searchedProductList = this.state.products;
    }
    this.setState({
      filtered: searchedProductList,
      searchTerm: e.target.value
    });
  };

  handlePrevPage = () => {
    this.setState({
      page: this.state.page - 1,
      paginated: this.paginator(this.state.products, this.state.page - 1, 30)
        .data
    });
  };

  handleNextPage = () => {
    this.setState({
      page: this.state.page + 1,
      paginated: this.paginator(this.state.products, this.state.page + 1, 30)
        .data
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(products =>
        this.setState({
          filtered: products,
          products: products,
          paginated: this.paginator(products, 1, 30).data
        })
      );
  }

  render() {
    console.log(this.state.paginated);
    return (
      <div>
        <NavBar action={this.handleChange} />
        <div
          style={{ backgroundImage: `url(${background})`, minHeight: "100vh" }}
        >
          <div>
            <div style={{ width: "100vw", display: "inline-block" }}>
              {this.state.page > 1 ? (
                <Button
                  negative
                  style={{ float: "left", margin: "5px" }}
                  onClick={this.handlePrevPage}
                >
                  Previous Page
                </Button>
              ) : null}
              <Button
                positive
                style={{ float: "right", margin: "5px" }}
                onClick={this.handleNextPage}
              >
                Next Page
              </Button>
            </div>

            <div
              className="ui cards"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {this.state.searchTerm !== ""
                ? this.state.filtered.map(product => {
                    return <ProductCard product={product} />;
                  })
                : this.state.paginated.map(product => {
                    return <ProductCard product={product} />;
                  })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
