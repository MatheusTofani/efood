import styled from "styled-components";
import Fundo from '../../assets/fundo.png'

export const HeaderContainer = styled.header`
height: 186px;
width: 100%;
background-image: url(${Fundo});
padding: 0 171px;
display: flex;
justify-content: space-between;
align-items: center;

@media (max-width: 1024px) {
    padding: 0 10px;
}
`

export const Flex = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

export const TitleContainer = styled.div`
transition: 0.3s ease;
  &:hover {
   color:rgb(223, 153, 153) ; 
   cursor: pointer;
  }
`