import styled from "styled-components";


interface TitleProps {
  size?: string;
  width?: string;
  weight?: string;
  center?: string;
  lineHeight?: string;
  margin?: string;
}


export const Title = styled.div<TitleProps>`
  font-size: ${(props) => props.size || "2rem"};
  width: ${(props) => props.width || "auto"};
  color: ${(props) => props.color || "#E66767"};
  font-weight: ${(props) => props.weight || "normal"};
  text-align: ${(props) => props.center || "left"};
  line-height: ${(props) => props.lineHeight || "normal"};
  margin: ${(props) => props.margin || "0"};;
  z-index: 1;
`;


