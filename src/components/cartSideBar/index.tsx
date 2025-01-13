import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
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
    validadeMes: "",
    validadeAno: "",
    CVC: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [orderSuccess, setOrderSuccess] = useState(false); // Estado para controlar a exibição da mensagem de sucesso

  const total = cartItems.reduce(
    (acc: number, item: any) => acc + item.valor * item.quantidade,
    0
  );

  const validateDelivery = () => {
    let valid = true;
    const newErrors: any = {};

    if (!deliveryData.destinatário) {
      newErrors.destinatário = "Campo obrigatório";
      valid = false;
    }
    if (!deliveryData.endereço.descrição) {
      newErrors.endereçoDescrição = "Campo obrigatório";
      valid = false;
    }
    if (!deliveryData.endereço.cidade) {
      newErrors.endereçoCidade = "Campo obrigatório";
      valid = false;
    }
    if (!deliveryData.endereço.CEP) {
      newErrors.endereçoCEP = "Campo obrigatório";
      valid = false;
    }
    if (!deliveryData.endereço.número) {
      newErrors.endereçoNumero = "Campo obrigatório";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validatePayment = () => {
    let valid = true;
    const newErrors: any = {};

    if (!paymentData.nome) {
      newErrors.nome = "Campo obrigatório";
      valid = false;
    }
    if (!paymentData.número) {
      newErrors.número = "Campo obrigatório";
      valid = false;
    }
    if (!paymentData.CVC) {
      newErrors.CVC = "Campo obrigatório";
      valid = false;
    }
    if (!paymentData.validadeMes || !paymentData.validadeAno) {
      newErrors.validade = "Campo obrigatório";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (step === "cart") {
      setStep("delivery");
      return;
    }

    if (step === "delivery") {
      if (!validateDelivery()) {
        return;
      }
      setStep("payment");
      return;
    }

    if (step === "payment") {
      if (!validatePayment()) {
        return;
      }

      const orderData = {
        products: cartItems.map((item: any) => ({
          id: item.id,
          price: item.valor,
        })),
        delivery: {
          receiver: deliveryData.destinatário,
          address: {
            description: deliveryData.endereço.descrição,
            city: deliveryData.endereço.cidade,
            zipCode: deliveryData.endereço.CEP,
            number: deliveryData.endereço.número,
            complement: deliveryData.endereço.complemento,
          },
        },
        payment: {
          card: {
            name: paymentData.nome,
            number: paymentData.número,
            code: parseInt(paymentData.CVC),
            expires: {
              month: parseInt(paymentData.validadeMes),
              year: parseInt(paymentData.validadeAno),
            },
          },
        },
      };

      // Logando os dados enviados para a API para verificar
      console.log("Dados da ordem:", orderData);

      try {
        const response = await fetch(
          "https://fake-api-tau.vercel.app/api/efood/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          }
        );

        const responseData = await response.json();

        console.log("Resposta da API:", responseData);

        if (response.ok) {
          // Exibe a mensagem de sucesso dentro do Sidebar
          setOrderSuccess(true);
          dispatch({ type: "cart/clear" }); // Limpar o carrinho após a compra
        } else {
          alert("Erro ao processar o pedido. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao finalizar a compra:", error);
        alert("Erro ao processar o pedido. Tente novamente.");
      }
    }
  };

  const handleCompleteOrder = () => {
    // Resetando todos os estados
    dispatch({ type: "cart/clear" }); // Limpar o carrinho
    setDeliveryData({
      destinatário: "",
      endereço: {
        descrição: "",
        cidade: "",
        CEP: "",
        número: 0,
        complemento: "",
      },
    }); // Resetando os dados de entrega
    setPaymentData({
      nome: "",
      número: "",
      validadeMes: "",
      validadeAno: "",
      CVC: "",
    }); // Resetando os dados de pagamento
    setErrors({}); // Limpando os erros
    setOrderSuccess(false); // Resetando o estado de sucesso
    onClose(); // Fechar o sidebar
  };

  return (
    <>
      {isOpen && <SidebarOverlay onClick={onClose} />}
      <SidebarContainer isOpen={isOpen}>
        <SidebarContent>
          {orderSuccess ? (
            <>
            
                <Title size="16px" weight="700" color="#FFEBD9" margin="0 0 16px 0">
                  Compra realizada com sucesso!
                </Title>
                <Button
                  width="100%"
                  background="#FFEBD9"
                  color="#E66767"
                  onClick={handleCompleteOrder}
                >
                  Concluir
                </Button>
      
            </>
          ) : (
            <>
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
                      onClick={handleSubmit}
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
                        value={deliveryData.destinatário}
                        onChange={(e) =>
                          setDeliveryData({
                            ...deliveryData,
                            destinatário: e.target.value,
                          })
                        }
                      />
                      {errors.destinatário && <span>{errors.destinatário}</span>}
                    </InputContainer>
                    <InputContainer>
                      <label>Endereço:</label>
                      <Input
                        type="text"
                        required
                        value={deliveryData.endereço.descrição}
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
                      {errors.endereçoDescrição && <span>{errors.endereçoDescrição}</span>}
                    </InputContainer>
                    <InputContainer>
                      <label>Cidade:</label>
                      <Input
                        type="text"
                        required
                        value={deliveryData.endereço.cidade}
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
                      {errors.endereçoCidade && <span>{errors.endereçoCidade}</span>}
                    </InputContainer>
                    <InputContainer>
                      <label>CEP:</label>
                      <Input
                        required
                        value={deliveryData.endereço.CEP}
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
                      {errors.endereçoCEP && <span>{errors.endereçoCEP}</span>}
                    </InputContainer>
                    <InputContainer>
                      <label>Número:</label>
                      <Input
                        required
                        value={deliveryData.endereço.número}
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
                      {errors.endereçoNumero && <span>{errors.endereçoNumero}</span>}
                    </InputContainer>
                    <InputContainer>
                      <label>Complemento (opcional):</label>
                      <Input
                        value={deliveryData.endereço.complemento}
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
                      onClick={handleSubmit}
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
                        value={paymentData.nome}
                        onChange={(e) =>
                          setPaymentData({ ...paymentData, nome: e.target.value })
                        }
                      />
                      {errors.nome && <span>{errors.nome}</span>}
                    </InputContainer>
                    <InputContainer>
                      <label>Número do Cartão:</label>
                      <Input
                        type="text"
                        required
                        value={paymentData.número}
                        onChange={(e) =>
                          setPaymentData({ ...paymentData, número: e.target.value })
                        }
                      />
                      {errors.número && <span>{errors.número}</span>}
                    </InputContainer>
                    <InputContainer>
                      <label>CVC:</label>
                      <Input
                        type="text"
                        required
                        value={paymentData.CVC}
                        onChange={(e) =>
                          setPaymentData({ ...paymentData, CVC: e.target.value })
                        }
                      />
                      {errors.CVC && <span>{errors.CVC}</span>}
                    </InputContainer>
                    <InputContent>
                      <InputContainer>
                        <label>Validade (Mês/Ano):</label>
                        <Input
                          placeholder="MM"
                          required
                          value={paymentData.validadeMes}
                          onChange={(e) =>
                            setPaymentData({ ...paymentData, validadeMes: e.target.value })
                          }
                        />
                        <Input
                          placeholder="AAAA"
                          required
                          value={paymentData.validadeAno}
                          onChange={(e) =>
                            setPaymentData({ ...paymentData, validadeAno: e.target.value })
                          }
                        />
                        {errors.validade && <span>{errors.validade}</span>}
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
            </>
          )}
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
