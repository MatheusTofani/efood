import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo";
import { Title } from "../../components/title/style";
import { HeaderContainer } from "./style";

const Header = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleGoBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <>
      <HeaderContainer>
        <Title
          center="center"
          size="20px"
          weight="500"
          onClick={handleGoBack}
        color="#E66767"
        >
          Restaurantes
        </Title>
        <Logo />
        <Title center="center" size="20px" weight="500">Carrinho</Title>
      </HeaderContainer>
    </>
  );
};

export default Header;
