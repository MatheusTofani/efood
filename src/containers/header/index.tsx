import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../components/logo";
import { Title } from "../../components/title/style";
import { Flex, HeaderContainer, TitleContainer } from "./style";
import CartSidebar from "../../components/cartSideBar";
import { Container } from "../../components/container/style";

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state: any) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantidade,
    0
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <>
      <HeaderContainer>
       <Container >
        <Flex>
        <Title
          center="center"
          size="20px"
          weight="500"
          onClick={handleGoBack}
          color="#E66767"
        >
         <TitleContainer>
          Restaurantes
          </TitleContainer>
        </Title>
      
        <Logo />
        <Title
          center="center"
          size="20px"
          weight="500"
          onClick={toggleCart}
        >
           <TitleContainer>
           ({totalItems}) produto(s) no carrinho 
          </TitleContainer>
        </Title>
        </Flex>
        </Container>
      </HeaderContainer>
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default Header;
