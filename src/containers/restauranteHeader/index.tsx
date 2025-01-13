import { useParams } from "react-router-dom";
import { RestauranteContainer } from "./style";
import { restaurantesData } from "../../data/restaurantes";
import { Title } from "../../components/title/style";

const RestauranteHeader = () => {
  const { id } = useParams();
  const restaurante = restaurantesData.find((item) => item.id === Number(id));

  if (!restaurante) {
    return <p>Restaurante não encontrado</p>;
  }

  return (
    <RestauranteContainer
      backgroundImage={restaurante.imagem}
    >
        <Title color="#fff" size="32px" width="100%" weight="100">{restaurante.tipo}</Title>
        <Title size="32px" color="#fff" width="100%" weight="900">{restaurante.titulo}</Title>
    </RestauranteContainer>
  );
};

export default RestauranteHeader;
