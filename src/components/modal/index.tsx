import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { Title } from "../../components/title/style";
import { Button } from "../../components/button/style.ts";

const ModalContent = styled.div`
  background: #e66767;
  padding: 32px;
  height: 344px;
  width: 1024px;
  display: flex;
 
  justify-content: space-between;
  color: #fff;
  z-index: 1000;
  gap: 24px; 
`;

const Modalimage = styled.img`
 height: 100%;
 width: 304px;
  object-fit: cover;
  margin-bottom: 16px;
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; 
  width: 100%; 
  
`;



interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  prato: {
    imagem: string;
    nome: string;
    descricao: string;
    info: string;
    valor: number;
  };
  onAddToCart: () => void;
}

const PratosModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  prato,
  onAddToCart,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "none",
          border: "none",
          zIndex: 1000,
        },
      }}
    >
      <ModalContent>
        <Modalimage src={prato.imagem} alt={prato.nome} />
        <ModalInfo>
          <Title color="white" size="24px" weight="700">{prato.nome}</Title>
          <Title color="white" size="14px" weight="400">{prato.descricao}</Title>
          <Title color="white" size="14px" weight="400">{prato.info}</Title>
          <Button
            background="#FFEBD9"
            color="#e66767"
            width="218px"
            onClick={onAddToCart}
          >
            Adicionar ao carrinho - R$ {prato.valor.toFixed(2)}
          </Button>
        </ModalInfo>
      </ModalContent>
    </Modal>
  );
};

export default PratosModal;
