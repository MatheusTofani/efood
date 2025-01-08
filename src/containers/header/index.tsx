import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../components/logo";
import { Title } from "../../components/title/style";
import { HeaderContainer } from "./style";
import CartSidebar from "../../components/cartSideBar";

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
        <Title
          center="center"
          size="20px"
          weight="500"
          onClick={toggleCart}
        >
          Carrinho ({totalItems})
        </Title>
      </HeaderContainer>
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default Header;
