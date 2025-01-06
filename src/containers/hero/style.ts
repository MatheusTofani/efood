import styled from "styled-components";
import Fundo from '../../assets/fundo.png'

export const HeroContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
width: 100%;
height:384px;
background-image: url(${Fundo});
padding: 64px 0;
text-align: center;
`
