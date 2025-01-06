import styled from "styled-components";

export const RestaurantesContainer = styled.div`
width: 472px;
height:398px;
background-color: #fff;
border: solid 1px #E66767;
position: relative;
`
export const RestauranteImage = styled.img`
width: 100%;
height: 55%;
object-fit: cover;
position: relative;
`

export const Tipo = styled.div`
background-color: #E66767;
position: absolute;
top: 10px;
right: 10px;
padding: 4px 8px;
color: #fff;
`

export const Content = styled.div`
padding: 8px;
width: 100%; 
height: 45%;
display: flex;
flex-direction: column;
justify-content: space-between;
`

export const ContainerTitle = styled.div`
display: flex;
justify-content: space-between;
`

export const Estrela = styled.img`
width: 20px;
height: 20px;
`

export const Feedback = styled.div`
display: flex;
align-items: center;
gap: 4px;
`