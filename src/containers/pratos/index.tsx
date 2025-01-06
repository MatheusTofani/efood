import { useState } from "react";
import { useParams } from "react-router-dom";
import { Title } from "../../components/title/style";
import { Container } from "../../components/container/style";
import { pratosData } from "../../data/pratos.ts";
import { CardPratos, Grid, ModalContent, Modalimage, PratoImage } from "./style.ts";
import { Button } from "../../components/button/style.ts";
import Modal from "../../components/modal";

interface Prato {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  restauranteId: number;
  valor: number;
  info: string; 
}

const PratosRestaurante = () => {
  const { id } = useParams<{ id: string }>();
  const pratos = pratosData.filter(
    (prato) => prato.restauranteId === Number(id)
  );

  const [selectedPrato, setSelectedPrato] = useState<Prato | null>(null);

  const handleOpenModal = (prato: Prato) => {
    setSelectedPrato(prato);
  };

  const handleCloseModal = () => {
    setSelectedPrato(null);
  };

  if (pratos.length === 0) {
    return <Title size="24px">Nenhum prato encontrado para este restaurante!</Title>;
  }

  return (
    <Container>
      <Grid>
        {pratos.map((prato) => (
          <CardPratos key={prato.id}>
            <PratoImage src={prato.imagem} alt={prato.nome} />
            <Title color="#fff" size="18px" weight="700">
              {prato.nome}
            </Title>
            <Title color="#fff" size="14px" weight="400">
              {prato.descricao}
            </Title>
            <Button
              background="#fff"
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
        <Modal onClose={handleCloseModal}>
          <Modalimage src={selectedPrato.imagem} alt={selectedPrato.nome} />
          <ModalContent>
            <Title size="24px" weight="700" color="#fff">{selectedPrato.nome}</Title>
            <Title size="14px" weight="400" color="#fff">{selectedPrato.info}</Title>
            <Button background="#fff" color="#e66767" width="218px">Adicionar ao carrinho - R$ {selectedPrato.valor.toFixed(2)}</Button>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default PratosRestaurante;
