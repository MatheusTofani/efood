import Logo from "../../components/logo"
import { Title } from "../../components/title/style"
import { FooterContainer, Redes, RedesContainer } from "./style"
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
const Footer = () => {

    return (
        <FooterContainer>
            <Logo />
            <RedesContainer>
                <Redes><FaInstagram /></Redes>
                <Redes><FaFacebook /></Redes>
                <Redes><FaTwitter /></Redes>
            </RedesContainer>
            <Title center="center" size="10px" width="480px" weight="400">A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado. </Title>
        </FooterContainer>
    )
}

export default Footer