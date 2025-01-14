import React, { useEffect, useState } from "react";
import Restaurantes from "../../components/restaurantes";
import { Grid } from "./style";

interface RestauranteData {
  id: number;
  titulo: string;
  tipo: string;
  avaliacao: number;
  descricao: string;
  capa: string;
}

const Main = () => {
  const [restaurantesData, setRestaurantesData] = useState<RestauranteData[]>([]);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await fetch("https://fake-api-tau.vercel.app/api/efood/restaurantes");
        const data = await response.json();
        setRestaurantesData(data);
      } catch (error) {
        console.error("Erro ao carregar os restaurantes:", error);
      }
    };

    fetchRestaurantes();
  }, []);

  return (
    <Grid>
      {restaurantesData.map((restaurante) => (
        <Restaurantes
          key={restaurante.id}
          id={restaurante.id}
          tipo={restaurante.tipo}
          nota={restaurante.avaliacao.toString()}
          titulo={restaurante.titulo}
          descricao={restaurante.descricao}
          imagem={restaurante.capa}
        />
      ))}
    </Grid>
  );
};

export default Main;
