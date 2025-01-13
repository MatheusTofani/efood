import styled from "styled-components";

interface ButtonProps {
  background?: string;
  color?: string;
  width?: string;
}

export const Button = styled.a<ButtonProps>`
  background-color: ${(props) => props.background || "#E66767"};
  color: ${(props) => props.color || "#fff"};
  padding: 4px 6px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 700;
  width: ${(props) => props.width || "82px"};
  text-align: center;
  transition: 0.3s ease;

  &:hover {
    background-color:rgb(223, 153, 153);
  }
`;
