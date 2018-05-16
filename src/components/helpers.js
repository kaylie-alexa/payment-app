import styled from "styled-components";
import { DEFAULT_BORDER_COLOR } from "../constants";

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.form`
  background-color: #eaeaea;
  border-radius: 3px;
  border: 1px solid ${DEFAULT_BORDER_COLOR};

  max-width: 400px;
  margin: auto;
  padding: 25px 50px;
`;

export const Header = styled.header`
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Logo = styled.img`
  width: 70px;
  filter: ${props => (props.active ? "grayscale(0)" : "grayscale(90%)")};
`;

export const Annotation = styled.span`
  font-size: 12px;
  color: ${props => (props.success ? "green" : "red")};
`;
