import styled from "styled-components";

export const Grid = styled.div`
display: grid;
grid-template-columns: repeat(3, 320px);
gap: 32px;

@media (max-width: 1024px) {
  grid-template-columns: repeat(1, 320px);
  justify-content: center;
}
`

export const PratoImage = styled.img`
width: 304px;
height: 167px;
object-fit: cover;
`

export const CardPratos = styled.div`
background-color: #E66767;
width: 100%;
height: 338px;
padding: 8px;
display: flex;
justify-content: space-between;
flex-direction: column;
`

export const Modalimage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
margin-right: 24px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
`;