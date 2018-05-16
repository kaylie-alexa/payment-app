import React, { Component } from "react";

import Button from "./components/Button";
import Input from "./components/Input";
import {
  FlexContainer,
  Logo,
  Header,
  Form,
  Annotation
} from "./components/helpers";
import { isValidExpiration, isProvided } from "./utils/validators";
import { getAutofixers, getValidations } from "./utils";
import { VISA_CARD_TYPE, AMEX_CARD_TYPE } from "./constants";

class App extends Component {
  state = {
    type: "",
    year: "",
    month: "",
    cardNumber: "",
    annotation: "",
    errorFields: new Set()
  };

  _handleCardNumberChange = (name, value) => {
    let type;

    if (value.startsWith("4")) {
      type = VISA_CARD_TYPE;
    } else if (value.startsWith("34") || value.startsWith("37")) {
      type = AMEX_CARD_TYPE;
    }

    this.setState({ type, cardNumber: value });
  };

  _handleExpirationChange = (type, value) => {
    const newState = { [`${type}`]: value };
    let isValid = isValidExpiration({ ...this.state, ...newState });
    let annotation;

    if (!isValid) {
      annotation = "Please enter a valid expiration date";
    }

    this._handleValidate(type, value, !isValid);
    this.setState({ annotation });
  };

  _handleChange = (type, value) => {
    this.setState({ [`${type}`]: value });
  };

  _handleValidate = (type, value, hasError) => {
    const { errorFields } = this.state;

    if (hasError) {
      errorFields.add(type);
    } else {
      errorFields.delete(type);
    }

    this.setState({ errorFields });
  };

  _handleSubmit = e => {
    e.preventDefault();
    let annotation;

    const { type } = this.state;

    if (!type) {
      annotation =
        "Please enter a valid card type. We currently only support VISA or AMEX.";
    } else {
      // fetch call to send form values goes here
      annotation = "Success! Your payment information has been submitted";
    }

    this.setState({ annotation });
  };

  render() {
    const {
      type,
      cardNumber,
      name,
      year,
      month,
      annotation,
      errorFields
    } = this.state;
    const autofixers = getAutofixers({ type });
    const validators = getValidations({ type });
    const valid =
      errorFields.size === 0 &&
      [cardNumber, name, year, month].every(isProvided);

    return (
      <Form onSubmit={this._handleSubmit}>
        <Header>Enter your credit card information</Header>
        <Input
          id="name"
          name="name"
          label="Name"
          placeholder="Name"
          onChange={this._handleChange}
          hideLabel={true}
        />
        <Input
          id="card-number"
          name="cardNumber"
          label="Card Number"
          placeholder="Card Number"
          autofixers={autofixers["card-number"]}
          validators={validators["card-number"]}
          onChange={this._handleCardNumberChange}
          onBlur={this._handleValidate}
          hideLabel={true}
        />
        <Input
          id="cvv2"
          name="cvv2"
          label="CVV2"
          placeholder="CVV2"
          autofixers={autofixers["cvv2"]}
          validators={validators["cvv2"]}
          onChange={this._handleChange}
          onBlur={this._handleValidate}
          hideLabel={true}
        />
        <FlexContainer>
          <Input
            id="expiration-month"
            name="month"
            label="Expiration Month"
            placeholder="Exp. Month"
            width="48%"
            autofixers={autofixers["expiration-month"]}
            hideLabel={true}
            onChange={this._handleChange}
            onBlur={this._handleExpirationChange}
          />
          <Input
            id="expiration-year"
            name="year"
            label="Expiration Year"
            placeholder="Exp. Year"
            width="48%"
            autofixers={autofixers["expiration-year"]}
            onChange={this._handleChange}
            onBlur={this._handleExpirationChange}
            hideLabel={true}
          />
        </FlexContainer>
        <FlexContainer>
          <Logo src="./visa.png" alt="Visa" active={type === VISA_CARD_TYPE} />
          <Logo src="./mastercard.png" alt="Mastercard" />
          <Logo
            src="./amex.png"
            alt="American Express"
            active={type === AMEX_CARD_TYPE}
          />
          <Logo src="./discover.png" alt="Discover" />
        </FlexContainer>
        <Annotation success={valid}>{annotation}</Annotation>
        <Button type="submit" disabled={!valid} onClick={this._handleValidate}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default App;
