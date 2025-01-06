import { ContainerTitle, Content, Estrela, Feedback, RestauranteImage, RestaurantesContainer, Tipo } from "./style";
import { Title } from "../title/style";
import { Button } from "../button/style";
import { useNavigate } from "react-router-dom";
import Star from "../../assets/estrela.png";
interface RestaurantesProps {
  id: number;
  titulo: string;
  nota: string;
  descricao: string;
  imagem: string;
  tipo: string;
}

const Restaurantes: React.FC<RestaurantesProps> = ({ id, titulo, nota, descricao, imagem, tipo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurantes/${id}/pratos`);
  };

  return (
    <RestaurantesContainer>
      <RestauranteImage src={imagem} alt={titulo} />
      <Tipo>{tipo}</Tipo>
      <Content>
        <ContainerTitle>
          <Title size="18px" weight="700">{titulo}</Title>
          <Feedback >
            <Title size="18px" weight="700">{nota}</Title>
            <Estrela src={Star} alt="Estrela" />
          </Feedback>
        </ContainerTitle>
        <Title lineHeight="22px" size="14px" weight="400">{descricao}</Title>
        <Button onClick={handleClick}>Saiba mais</Button>
      </Content>
    </RestaurantesContainer>
  );
};

export default Restaurantes;
