import LogoImage from '../../assets/logo.png'

import styled from "styled-components";

const LogoContainer = styled.img`
height: 57.5px;
width: 125px;

@media (max-width: 1024px) {
    width: 100px;
    height: 40.5px;
}
`

const  Logo = () =>  <LogoContainer src={LogoImage} alt="Logo" />

export default Logo