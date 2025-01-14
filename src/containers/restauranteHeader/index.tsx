import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestauranteContainer } from "./style";
import { Title } from "../../components/title/style";

interface RestauranteData {
  id: number;
  titulo: string;
  tipo: string;
  avaliacao: number;
  descricao: string;
  capa: string;
}

const RestauranteHeader = () => {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState<RestauranteData | null>(null);

  useEffect(() => {
    const fetchRestaurante = async () => {
      try {
        const response = await fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`);
        const data = await response.json();
        setRestaurante(data);
      } catch (error) {
        console.error("Erro ao buscar restaurante", error);
      }
    };

    fetchRestaurante();
  }, [id]);

  if (!restaurante) {
    return <p>Restaurante não encontrado</p>;
  }

  return (
    <RestauranteContainer backgroundImage={restaurante.capa}>
      <Title color="#fff" size="32px" width="100%" weight="100">{restaurante.tipo}</Title>
      <Title size="32px" color="#fff" width="100%" weight="900">{restaurante.titulo}</Title>
    </RestauranteContainer>
  );
};

export default RestauranteHeader;
