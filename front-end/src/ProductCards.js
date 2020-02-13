import React, { Component } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Card,
  Icon,
  Form,
  Select
} from "semantic-ui-react";

export class ProductCard extends Component {
  state = {
    modalOpen: false,
    listings: [],
    transformedListings: [],
    selectedListing: null
  };

  openModal = product_id => {
    fetch(`http://localhost:3000/listings_for_product/${product_id}`)
      .then(res => res.json())
      .then(listings => {
        console.log(listings);
        this.setState({
          listings: listings,
          modalOpen: true,
          transformedListings: listings
            .filter(listing => {
              let keep = true;
              listings.forEach(l => {
                if (l.size === listing.size && l.price < listing.price) {
                  keep = false;
                }
              });
              return keep;
            })
            .sort((a, b) => (a.size > b.size ? 1 : -1))
            .map(listing => ({
              key: listing.id,
              text: `Size: ${listing.size} Price: $${listing.price}`,
              value: listing.id
            }))
        });
      });
  };

  addToCart = listing_id => {
    //send a POST request to the back end with the current user ID and the listing ID
    fetch(`http://localhost:3000/transactions/${listing_id}`, {
      credentials: "include"
    });
  };

  render() {
    const CardModal = () => (
      <Modal
        open={this.state.modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
      >
        <Modal.Header>
          <Image src={this.props.product.image} />
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>{this.props.product.name}</Header>
            <Header>Retail: ${this.props.product.retail}</Header>
            <p>Select your shoe size.</p>
            <Select
              label="Listings"
              options={this.state.transformedListings}
              placeholder="Listings"
              onChange={(e, { value }) =>
                this.setState({ selectedListing: value })
              }
            />
            <br></br>
            <p>Proceed to add to cart.</p>
            <Button
              positive
              onClick={() => {
                console.log(this.state.selectedListing);
                if (this.state.selectedListing !== null) {
                  this.addToCart(this.state.selectedListing);
                }
              }}
            >
              <i
                aria-hidden="true"
                style={{ margin: 0 }}
                className="plus cart icon"
              />
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
    return (
      <Card style={{ minHeight: 360 }}>
        <Image src={this.props.product.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.product.name}</Card.Header>
          <Card.Meta>
            <span className="date">{this.props.product.releaseDate}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <a>Retail: ${this.props.product.retail}</a>
          <Button
            positive
            style={{ marginLeft: 120 }}
            onClick={() => this.openModal(this.props.product.id)}
          >
            <i
              aria-hidden="true"
              style={{ margin: 0 }}
              className="plus icon"
            ></i>
          </Button>
          {CardModal()}
        </Card.Content>
      </Card>
    );
  }
}

export default ProductCard;
