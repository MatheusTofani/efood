
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import {
  SidebarContainer,
  SidebarOverlay,
  SidebarContent,
  SidebarItem,
  SidebarFooter,
} from "./style"; 

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc: number, item: any) => acc + item.valor * item.quantidade, 0);

  return (
    <>
      {isOpen && <SidebarOverlay onClick={onClose} />}
      <SidebarContainer isOpen={isOpen}>
        <SidebarContent>
          <h2>Carrinho</h2>
          {cartItems.map((item: any) => (
            <SidebarItem key={item.id}>
              <img src={item.imagem} alt={item.nome} />
              <div>
                <p>{item.nome}</p>
                <p>R$ {item.valor.toFixed(2)}</p>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Remover</button>
            </SidebarItem>
          ))}
          <SidebarFooter>
            <p>Total: R$ {total.toFixed(2)}</p>
          </SidebarFooter>
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
