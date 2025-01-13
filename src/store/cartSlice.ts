import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definir o tipo de item do carrinho
interface CartItem {
  id: number;
  nome: string;
  imagem: string;
  valor: number;
  quantidade: number;
}

// Definir o estado inicial do carrinho
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Criação do slice para o carrinho
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantidade += action.payload.quantidade;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = []; // Limpa todos os itens do carrinho
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
