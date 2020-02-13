import React, { Component } from "react";
import NavBar from "./NavBar";
import { Form } from "semantic-ui-react";

const options = [
  { key: "", text: "", value: "" },
  { key: "4", text: "4", value: "4" },
  { key: "5", text: "5", value: "5" },
  { key: "6", text: "6", value: "6" },
  { key: "7", text: "7", value: "7" },
  { key: "8", text: "8", value: "8" },
  { key: "9", text: "9", value: "9" },
  { key: "10", text: "10", value: "10" },
  { key: "11", text: "11", value: "11" },
  { key: "12", text: "12", value: "12" },
  { key: "13", text: "13", value: "13" },
  { key: "14", text: "14", value: "14" },
  { key: "15", text: "15", value: "15" }
];

export class SellersForm extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <div>
        <NavBar />
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Listing price"
              placeholder="Listing price $"
            />
            <Form.Input fluid label="Name of shoe" placeholder="Name of shoe" />
            <Form.Select
              fluid
              label="Size"
              options={options}
              placeholder="Size"
            />
          </Form.Group>
          <Form.Group inline>
            <label>Condition</label>
            <Form.Radio
              label="Dead Stock"
              value="sm"
              checked={value === "sm"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Lightly used"
              value="md"
              checked={value === "md"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Wear and tear"
              value="lg"
              checked={value === "lg"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.TextArea
            label="About"
            placeholder="Tell us more about your shoe..."
          />
          <h5>Upload your shoe</h5>
          <Form.Input type="file" />
          <br></br>
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <br></br>
          <Form.Button>Sell</Form.Button>
        </Form>
      </div>
    );
  }
}
