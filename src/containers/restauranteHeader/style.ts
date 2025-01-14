import styled from "styled-components";

export const RestauranteContainer = styled.div<{ backgroundImage: string }>`
  height: 280px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  padding: 25px 170px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1024px) {
    padding: 25px 10px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
