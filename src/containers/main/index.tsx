
import Restaurantes from "../../components/restaurantes";
import { restaurantesData } from "../../data/restaurantes";
import { Grid } from "./style";

const Main = () => {
  return (
   
      <Grid>
      {restaurantesData.map((restaurante) => (
        <Restaurantes
          key={restaurante.id}
          id={restaurante.id} 
          tipo={restaurante.tipo}
          nota={restaurante.nota}
          titulo={restaurante.titulo}
          descricao={restaurante.descricao}
          imagem={restaurante.imagem}
        />
      ))}
      </Grid>
  
  );
};

export default Main;
