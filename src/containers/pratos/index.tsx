import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Title } from "../../components/title/style";
import { Container } from "../../components/container/style";
import { CardPratos, Grid, PratoImage } from "./style.ts";
import { Button } from "../../components/button/style.ts";
import PratosModal from "../../components/modal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

interface Prato {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  valor: number;
  info: string;
}

const PratosRestaurante = () => {
  const { id } = useParams<{ id: string }>();
  const [pratos, setPratos] = useState<Prato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [selectedPrato, setSelectedPrato] = useState<Prato | null>(null);

  useEffect(() => {
    const fetchPratos = async () => {
      try {
        if (id) {
          const response = await fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes`);
          const data = await response.json();
          const restaurante = data.find((rest: any) => rest.id === parseInt(id));
          if (restaurante) {
            setPratos(restaurante.cardapio.map((prato: any) => ({
              id: prato.id,
              nome: prato.nome,
              descricao: prato.descricao,
              imagem: prato.foto,
              valor: prato.preco,
              info: prato.porcao,
            })));
          }
        }
      } catch (error) {
        console.error("Erro ao buscar pratos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPratos();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (pratos.length === 0) {
    return <Title size="24px">Nenhum prato encontrado para este restaurante!</Title>;
  }

  const handleOpenModal = (prato: Prato) => {
    setSelectedPrato(prato);
  };

  const handleCloseModal = () => {
    setSelectedPrato(null);
  };

  const handleAddToCart = (prato: Prato) => {
    const pratoComQuantidade = { ...prato, quantidade: 1 };
    dispatch(addToCart(pratoComQuantidade));
    handleCloseModal();
  };

  return (
    <Container>
      <Grid>
        {pratos.map((prato) => (
          <CardPratos key={prato.id}>
            <PratoImage src={prato.imagem} alt={prato.nome} />
            <Title color="#fff" size="18px" weight="700">
              {prato.nome}
            </Title>
            <Title color="#fff" size="12px" weight="400">
              {prato.descricao}
            </Title>
            <Button
              background="#FFEBD9"
              color="#E66767"
              width="100%"
              onClick={() => handleOpenModal(prato)}
            >
              Ver Detalhes
            </Button>
          </CardPratos>
        ))}
      </Grid>

      {selectedPrato && (
        <PratosModal
          isOpen={!!selectedPrato}
          onRequestClose={handleCloseModal}
          prato={selectedPrato}
          onAddToCart={() => handleAddToCart(selectedPrato)}
        />
      )}
    </Container>
  );
};

export default PratosRestaurante;
