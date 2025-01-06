import LogoImage from '../../assets/logo.png'

import styled from "styled-components";

const LogoContainer = styled.img`
height: 57.5px;
width: 125px;
`

const  Logo = () =>  <LogoContainer src={LogoImage} alt="Logo" />

export default Logo