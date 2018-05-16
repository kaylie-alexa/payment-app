import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DEFAULT_BORDER_COLOR } from "../constants";
import { Annotation } from "./helpers";

const StyledInput = styled.input.attrs({
  type: "text"
})`
  display: inline-block;
  margin: 10px 0 0;
  outline: none;

  border-radius: 3px;
  box-sizing: border-box;
  border: ${props =>
    props.error ? "1px solid red" : `1px solid ${DEFAULT_BORDER_COLOR}`};

  padding: 10px 0;
  text-align: center;
  width: ${props => props.width || "100%"};
`;

const StyledLabel = styled.label`
  display: ${props => props.hideLabel && "none"};
`;

export default class Input extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    autofixers: PropTypes.arrayOf(PropTypes.func),
    validators: PropTypes.arrayOf(
      PropTypes.shape({
        fn: PropTypes.func,
        error: PropTypes.string
      })
    )
  };

  static defaultProps = { validators: [], autofixers: [] };

  state = { value: "", error: "" };

  _handleChange = e => {
    const { value } = e.target;
    const { name, autofixers, onChange } = this.props;

    const cleanedValue = autofixers.reduce((memo, fn) => fn(memo), value);

    this.setState({
      value: cleanedValue,
      error: ""
    });

    onChange && onChange(name, cleanedValue);
  };

  _handleBlur = () => {
    const { value } = this.state;
    const { name, validators, onBlur } = this.props;

    const validationError = validators.find(({ fn }) => !fn(value));

    if (validationError) {
      const { error } = validationError;
      this.setState({ error });
    }

    onBlur && onBlur(name, value, validationError);
  };

  render() {
    const { label, hideLabel, id, name, placeholder, width } = this.props;
    const { value, error } = this.state;

    return [
      <StyledLabel key="label" for={id} hideLabel={hideLabel}>
        {label}
      </StyledLabel>,
      <StyledInput
        key="input"
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={this._handleChange}
        onBlur={this._handleBlur}
        error={error}
        width={width}
        value={value}
      />,
      error && <Annotation key="annotation">{error}</Annotation>
    ];
  }
}
