import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import * as yup from "yup";
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
import InputMask from "react-input-mask";


const deliverySchema = yup.object().shape({
  destinatário: yup.string().required("Digite o nome"),
  endereço: yup.object().shape({
    descrição: yup.string().required("Digite o endereço"),
    cidade: yup.string().required("Digite a cidade"),
    CEP: yup
      .string()
      .matches(/^\d{5}-?\d{3}$/, "Digite um CEP válido")
      .required("Digite o CEP"),
    número: yup
      .string()
      .typeError("Digite um número válido")
      .required("Digite o número"),
    complemento: yup.string(),
  }),
});

const paymentSchema = yup.object().shape({
  nome: yup.string().required("Digite o nome no cartão"),
  número: yup
    .string()
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Digite um número de cartão válido")
    .required("Digite o número do cartão"),
  validadeMes: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])$/, "Digite um mês válido")
    .required("Digite o mês de validade"),
  validadeAno: yup
    .string()
    .matches(/^\d{4}$/, "Digite um ano válido")
    .required("Digite o ano de validade")
    .test("validity-test", "A data de validade é inválida", (value, context) => {
      const mes = parseInt(context.parent.validadeMes, 10);
      const ano = parseInt(value, 10);
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;

      if (ano < currentYear || (ano === currentYear && mes < currentMonth)) {
        return false;
      }
      return true;
    }),
  CVC: yup
    .string()
    .matches(/^\d{3}$/, "Digite um CVC válido")
    .required("Digite o CVC"),
});


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
      número: "",
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
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = cartItems.reduce(
    (acc: number, item: any) => acc + item.valor * item.quantidade,
    0
  );

  const validateDelivery = async () => {
    try {
      await deliverySchema.validate(deliveryData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const newErrors: any = {};
      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const validatePayment = async () => {
    try {
      await paymentSchema.validate(paymentData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const newErrors: any = {};
      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (step === "cart") {
      setStep("delivery");
      return;
    }

    if (step === "delivery") {
      if (!(await validateDelivery())) {
        return;
      }
      setStep("payment");
      return;
    }

    if (step === "payment") {
      if (!(await validatePayment())) {
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

        if (response.ok) {
          setOrderSuccess(true);
          dispatch({ type: "cart/clear" });
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
    cartItems.forEach((item: any) => {
      dispatch(removeFromCart(item.id));
    });

    setDeliveryData({
      destinatário: "",
      endereço: {
        descrição: "",
        cidade: "",
        CEP: "",
        número: "",
        complemento: "",
      },
    });
    setPaymentData({
      nome: "",
      número: "",
      validadeMes: "",
      validadeAno: "",
      CVC: "",
    });
    setErrors({});
    setOrderSuccess(false);
    setStep("cart");
    onClose();
  };
  return (
    <>
      {isOpen && <SidebarOverlay onClick={onClose} />}
      <SidebarContainer isOpen={isOpen}>
        <SidebarContent>
          {orderSuccess ? (
            <>
              <Title
                size='16px'
                weight='700'
                color='#FFEBD9'
                margin='0 0 10px 0'
              >
                {" "}
                Pedido realizado{" "}
              </Title>
              <Title
                size='14px'
                weight='400'
                color='#FFEBD9'
                margin='0 0 16px 0'
              >
                Estamos felizes em informar que seu pedido já está em processo
                de preparação e, em breve, será entregue no endereço fornecido.
                Gostaríamos de ressaltar que nossos entregadores não estão
                autorizados a realizar cobranças extras. Lembre-se da
                importância de higienizar as mãos após o recebimento do pedido,
                garantindo assim sua segurança e bem-estar durante a refeição.
                Esperamos que desfrute de uma deliciosa e agradável experiência
                gastronômica. Bom apetite!
              </Title>
              <InputContainer>
                <Button
                  width='100%'
                  background='#FFEBD9'
                  color='#E66767'
                  onClick={handleCompleteOrder}
                >
                  Concluir
                </Button>
              </InputContainer>
            </>
          ) : (
            <>
              {step === "cart" && (
                <>
                  {cartItems.length === 0 ? (
                    <Title size='16px' weight='700' color='#FFEBD9'>
                      Carrinho Vazio
                    </Title>
                  ) : (
                    <>
                      {cartItems.map((item: any) => (
                        <SidebarItem key={item.id}>
                          <img src={item.imagem} alt={item.nome} />
                          <div>
                            <Title margin='0 0 16px 0' weight='900' size='18px'>
                              {item.nome}
                            </Title>
                            <Title weight='400' size='14px'>
                              R$ {item.valor.toFixed(2)}
                            </Title>
                          </div>
                          <p onClick={() => dispatch(removeFromCart(item.id))}>
                            <FaRegTrashAlt />
                          </p>
                        </SidebarItem>
                      ))}
                      <SidebarFooter>
                        <Title color='#FFEBD9' size='16px' weight='700'>
                          Valor Total:
                        </Title>
                        <Title color='#FFEBD9' size='16px' weight='700'>
                          R$ {total.toFixed(2)}
                        </Title>
                      </SidebarFooter>
                      <SidebarFooter>
                        <Button
                          width='100%'
                          background='#FFEBD9'
                          color='#E66767'
                          onClick={handleSubmit}
                        >
                          Continuar com a entrega
                        </Button>
                      </SidebarFooter>
                    </>
                  )}
                </>
              )}

              {step === "delivery" && (
                <>
                  <Title
                    size='16px'
                    weight='700'
                    color='#FFEBD9'
                    margin='0 0 16px 0'
                  >
                    Entrega
                  </Title>
                  <Pagamento>
                    <InputContainer>
                      <label>Quem irá receber:</label>
                      <Input
                        type='text'
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
                        type='text'
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
                      {errors["endereço.descrição"] && <span>{errors["endereço.descrição"]}</span>}
                    </InputContainer>

                    <InputContainer>
                      <label>Cidade:</label>
                      <Input
                        type='text'
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
                      {errors["endereço.cidade"] && <span>{errors["endereço.cidade"]}</span>}
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
                      {errors["endereço.CEP"] && <span>{errors["endereço.CEP"]}</span>}
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
                              número: e.target.value,
                            },
                          })
                        }
                      />
                      {errors["endereço.número"] && <span>{errors["endereço.número"]}</span>}
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
                      width='100%'
                      background='#FFEBD9'
                      color='#E66767'
                      onClick={handleSubmit}
                    >
                      Avançar para o Pagamento
                    </Button>

                    <Button
                      width='100%'
                      background='#FFEBD9'
                      color='#E66767'
                      onClick={() => setStep("cart")}
                    >
                      Voltar para o Carrinho
                    </Button>
                  </Pagamento>
                </>
              )}

              {step === "payment" && (
                <>
                  <Title
                    size='16px'
                    weight='700'
                    color='#FFEBD9'
                    margin='0 0 16px 0'
                  >
                    Pagamento
                  </Title>
                  <Pagamento>
                    <InputContainer>
                      <label>Nome no Cartão:</label>
                      <Input
                        type='text'
                        required
                        value={paymentData.nome}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            nome: e.target.value,
                          })
                        }
                      />
                      {errors.nome && <span>{errors.nome}</span>}
                    </InputContainer>
                    <InputContainer>
                      <label>Número do Cartão:</label>
                      <InputMask
                        mask="9999 9999 9999 9999"
                        required
                        value={paymentData.número}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            número: e.target.value,
                          })
                        }
                      >
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            required
                          />
                        )}
                      </InputMask>
                      {errors.número && <span>{errors.número}</span>}
                    </InputContainer>

                    <InputContainer>
                      <label>CVC:</label>
                      <InputMask
                        mask="999"
                        required
                        value={paymentData.CVC}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            CVC: e.target.value,
                          })
                        }
                      >
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            required
                          />
                        )}
                      </InputMask>
                      {errors.CVC && <span>{errors.CVC}</span>}
                    </InputContainer>

                    <InputContainer>
                      <label>Validade:</label>
                      <InputContent>
                        <InputMask
                          mask="99"
                          placeholder="MM"
                          required
                          value={paymentData.validadeMes}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              validadeMes: e.target.value,
                            })
                          }
                        >
                          {(inputProps: any) => <Input {...inputProps} />}
                        </InputMask>

                        <InputMask
                          mask="9999"
                          placeholder="AAAA"
                          required
                          value={paymentData.validadeAno}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              validadeAno: e.target.value,
                            })
                          }
                        >
                          {(inputProps: any) => <Input {...inputProps} />}
                        </InputMask>
                      </InputContent>
                      {errors.validadeMes || errors.validadeAno ? (
                        <span>{errors.validadeMes || errors.validadeAno}</span>
                      ) : null}
                    </InputContainer>

                    <Button
                      width='100%'
                      background='#FFEBD9'
                      color='#E66767'
                      onClick={handleSubmit}
                    >
                      Finalizar Compra
                    </Button>
                  </Pagamento>
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
