import Logo from "../../components/logo"
import { Title } from "../../components/title/style"
import { HeroContainer } from "./style"

const Hero = () => {
    return (
        <HeroContainer>
            <Logo />
            <Title center="center" width="539px" size="36px" weight="900">Viva experiências gastronômicas no conforto da sua casa</Title>
        </HeroContainer>
    )
}

export default Hero