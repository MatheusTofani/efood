import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  nome: string;
  imagem: string;
  valor: number;
  quantidade: number;
}


interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as any[], // Tipando como array de qualquer tipo inicialmente
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push({ ...action.payload, quantidade: 1 });
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const item = state.items[index];
        if (item.quantidade > 1) {
          item.quantidade -= 1; // Apenas decrementa a quantidade
        } else {
          state.items.splice(index, 1); // Remove o item completamente se a quantidade for 1
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;


