import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { DEFAULT_BORDER_COLOR } from "../constants";

const StyledButton = styled.button`
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;

  outline: none;
  background-color: ${props => (props.disabled ? " #a495bf" : "#9370DB")};
  border-radius: 3px;
  border: 1px solid ${DEFAULT_BORDER_COLOR};

  color: #fff;
`;

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  };

  render() {
    const { children, disabled, onClick } = this.props;

    return (
      <StyledButton disabled={disabled} onClick={onClick}>
        {children}
      </StyledButton>
    );
  }
}
