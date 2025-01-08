import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import axios from "axios";
import {
  SidebarContainer,
  SidebarOverlay,
  SidebarContent,
  SidebarItem,
  SidebarFooter,
  Pagamento,
  InputContainer,
  Input,
  InputContent,
} from "./style";
import { Title } from "../title/style";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../button/style";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
  const [step, setStep] = useState<"cart" | "delivery" | "payment">("cart");
  const [deliveryData, setDeliveryData] = useState({
    destinatário: "",
    endereço: {
      descrição: "",
      cidade: "",
      CEP: "",
      número: 0,
      complemento: "",
    },
  });
  const [paymentData, setPaymentData] = useState({
    nome: "",
    número: "",
    validade: "",
    CVC: "",
  });

  const total = cartItems.reduce(
    (acc: number, item: any) => acc + item.valor * item.quantidade,
    0
  );

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://fake-api-tau.vercel.app/api/efood/checkout",
        {
          produtos: cartItems.map((item: any) => ({
            id: item.id,
            preço: item.valor,
          })),
          entrega: deliveryData,
          pagamento: {
            cartão: {
              nome: paymentData.nome,
              número: paymentData.número,
              código: parseInt(paymentData.CVC),
              expira: {
                mês: parseInt(paymentData.validade.split("/")[0]),
                ano: parseInt(paymentData.validade.split("/")[1]),
              },
            },
          },
        }
      );

      alert("Compra finalizada com sucesso!");
      console.log("Resposta da API:", response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
      alert("Erro ao processar o pedido. Tente novamente.");
    }
  };

  return (
    <>
      {isOpen && <SidebarOverlay onClick={onClose} />}
      <SidebarContainer isOpen={isOpen}>
        <SidebarContent>
          {step === "cart" && (
            <>
              {cartItems.map((item: any) => (
                <SidebarItem key={item.id}>
                  <img src={item.imagem} alt={item.nome} />
                  <div>
                    <Title margin="0 0 16px 0" weight="900" size="18px">
                      {item.nome}
                    </Title>
                    <Title weight="400" size="14px">
                      R$ {item.valor.toFixed(2)}
                    </Title>
                  </div>
                  <p onClick={() => dispatch(removeFromCart(item.id))}>
                    <FaRegTrashAlt />
                  </p>
                </SidebarItem>
              ))}
              <SidebarFooter>
                <Title color="#FFEBD9" size="16px" weight="700">
                  Valor Total:
                </Title>
                <Title color="#FFEBD9" size="16px" weight="700">
                  R$ {total.toFixed(2)}
                </Title>
              </SidebarFooter>
              <SidebarFooter>
                <Button
                  width="100%"
                  background="#FFEBD9"
                  color="#E66767"
                  onClick={() => setStep("delivery")}
                >
                  Continuar com a entrega
                </Button>
              </SidebarFooter>
            </>
          )}

          {step === "delivery" && (
            <>
              <Title size="16px" weight="700" color="#FFEBD9" margin="0 0 16px 0">
                Entrega
              </Title>
              <Pagamento>
                <InputContainer>
                  <label>Quem irá receber:</label>
                  <Input
                    type="text"
                    required
                    onChange={(e) =>
                      setDeliveryData({
                        ...deliveryData,
                        destinatário: e.target.value,
                      })
                    }
                  />
                </InputContainer>
                <InputContainer>
                  <label>Endereço:</label>
                  <Input
                    type="text"
                    required
                    onChange={(e) =>
                      setDeliveryData({
                        ...deliveryData,
                        endereço: {
                          ...deliveryData.endereço,
                          descrição: e.target.value,
                        },
                      })
                    }
                  />
                </InputContainer>
                <InputContainer>
                  <label>Cidade:</label>
                  <Input
                    type="text"
                    required
                    onChange={(e) =>
                      setDeliveryData({
                        ...deliveryData,
                        endereço: {
                          ...deliveryData.endereço,
                          cidade: e.target.value,
                        },
                      })
                    }
                  />
                </InputContainer>
                <InputContent>
                  <InputContainer>
                    <label>CEP:</label>
                    <Input
                      required
                      onChange={(e) =>
                        setDeliveryData({
                          ...deliveryData,
                          endereço: {
                            ...deliveryData.endereço,
                            CEP: e.target.value,
                          },
                        })
                      }
                    />
                  </InputContainer>
                  <InputContainer>
                    <label>Número:</label>
                    <Input
                      required
                      onChange={(e) =>
                        setDeliveryData({
                          ...deliveryData,
                          endereço: {
                            ...deliveryData.endereço,
                            número: parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </InputContainer>
                </InputContent>
                <InputContainer>
                  <label>Complemento (opcional):</label>
                  <Input
                    onChange={(e) =>
                      setDeliveryData({
                        ...deliveryData,
                        endereço: {
                          ...deliveryData.endereço,
                          complemento: e.target.value,
                        },
                      })
                    }
                  />
                </InputContainer>
                <Button
                  width="100%"
                  background="#FFEBD9"
                  color="#E66767"
                  onClick={() => setStep("payment")}
                >
                  Avançar para o Pagamento
                </Button>
              </Pagamento>
              <Button
                width="100%"
                background="#FFEBD9"
                color="#E66767"
                onClick={() => setStep("cart")}
              >
                Voltar para o Carrinho
              </Button>
            </>
          )}

          {step === "payment" && (
            <>
              <Title size="16px" weight="700" color="#FFEBD9" margin="0 0 16px 0">
                Pagamento
              </Title>
              <Pagamento>
                <InputContainer>
                  <label>Nome no Cartão:</label>
                  <Input
                    type="text"
                    required
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, nome: e.target.value })
                    }
                  />
                </InputContainer>
                <InputContainer>
                  <label>Número do Cartão:</label>
                  <Input
                    type="text"
                    required
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, número: e.target.value })
                    }
                  />
                </InputContainer>
                <InputContent>
                  <InputContainer>
                    <label>Validade:</label>
                    <Input
                      placeholder="MM/AA"
                      required
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, validade: e.target.value })
                      }
                    />
                  </InputContainer>
                  <InputContainer>
                    <label>CVC:</label>
                    <Input
                      type="text"
                      required
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, CVC: e.target.value })
                      }
                    />
                  </InputContainer>
                </InputContent>
                <Button
                  width="100%"
                  background="#FFEBD9"
                  color="#E66767"
                  onClick={handleSubmit}
                >
                  Finalizar Compra
                </Button>
              </Pagamento>
              <Button
                width="100%"
                background="#FFEBD9"
                color="#E66767"
                onClick={() => setStep("delivery")}
              >
                Voltar para a Entrega
              </Button>
            </>
          )}
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
