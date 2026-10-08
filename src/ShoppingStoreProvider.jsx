import { useEffect, useReducer } from 'react';
import { createSafeContext } from './context';
import { onShoppingStoreRestoreAction } from './shoppingStoreMiddleware';
import { storage } from './asyncStorage';
import { SHOPPING_STORE_KEY } from './constants';

const [ShoppingStoreContext, useShoppingStore] =
  createSafeContext('shoppingStore');

const shoppingStoreReducer = (shoppingStore, action) => {
  switch (action.type) {
    case 'increment': {
      const state = { ...shoppingStore };

      const items = state.items;
      items[action.index].quantity++;

      state.cart.quantity++;
      state.cart.total += items[action.index].price;

      const indices = state.cart.indices;

      if (indices.findIndex(index => index === action.index) === -1) {
        indices.push(action.index);
      }

      action.onIncrementCallback(state);

      return state;
    }

    case 'decrement': {
      const state = { ...shoppingStore };
      const items = state.items;

      if (items[action.index].quantity > 0) {
        items[action.index].quantity--;

        state.cart.quantity--;
        state.cart.total -= items[action.index].price;

        const indices = state.cart.indices;

        if (items[action.index].quantity === 0) {
          indices.splice(
            indices.findIndex(index => index === action.index),
            1,
          );
        }
      }

      action.onDecrementCallback(state);

      return state;
    }

    case 'reset': {
      const state = { ...shoppingStore };
      const items = state.items;

      items.forEach(item => (item.quantity = 0));

      state.cart.quantity = 0;
      state.cart.total = 0;
      state.cart.indices = [];

      action.onResetCallback();

      return state;
    }

    case 'restore': {
      const state = { ...action.shoppingStore };
      return state;
    }
  }
};

export const ShoppingStoreProvider = ({ children }) => {
  const [shoppingStore, dispatch] = useReducer(
    shoppingStoreReducer,
    INIT_SHOPPING_STORE,
  );

  useEffect(() => {
    storage.getItem(SHOPPING_STORE_KEY).then(shoppingStoreString => {
      if (shoppingStoreString) {
        onShoppingStoreRestoreAction(dispatch, JSON.parse(shoppingStoreString));
      }
    });
  }, []);

  return (
    <ShoppingStoreContext.Provider value={{ shoppingStore, dispatch }}>
      {children}
    </ShoppingStoreContext.Provider>
  );
};

export { useShoppingStore };

const items = [
  { id: 1, name: 'Apple', quantity: 0, price: 180 },
  { id: 2, name: 'Banana', quantity: 0, price: 60 },
  { id: 3, name: 'Orange', quantity: 0, price: 100 },
  { id: 4, name: 'Mango', quantity: 0, price: 150 },
  { id: 5, name: 'Pineapple', quantity: 0, price: 80 },
  { id: 6, name: 'Grape', quantity: 0, price: 120 },
  { id: 7, name: 'Watermelon', quantity: 0, price: 30 },
  { id: 8, name: 'Strawberry', quantity: 0, price: 400 },
  { id: 9, name: 'Blueberry', quantity: 0, price: 1600 },
  { id: 10, name: 'Raspberry', quantity: 0, price: 2400 },
  { id: 11, name: 'Blackberry', quantity: 0, price: 2000 },
  { id: 12, name: 'Cherry', quantity: 0, price: 800 },
  { id: 13, name: 'Peach', quantity: 0, price: 250 },
  { id: 14, name: 'Pear', quantity: 0, price: 180 },
  { id: 15, name: 'Plum', quantity: 0, price: 250 },
  { id: 16, name: 'Apricot', quantity: 0, price: 400 },
  { id: 17, name: 'Nectarine', quantity: 0, price: 450 },
  { id: 18, name: 'Kiwi', quantity: 0, price: 350 },
  { id: 19, name: 'Papaya', quantity: 0, price: 50 },
  { id: 20, name: 'Guava', quantity: 0, price: 80 },
  { id: 21, name: 'Pomegranate', quantity: 0, price: 200 },
  { id: 22, name: 'Dragon Fruit', quantity: 0, price: 200 },
  { id: 23, name: 'Passion Fruit', quantity: 0, price: 400 },
  { id: 24, name: 'Lychee', quantity: 0, price: 250 },
  { id: 25, name: 'Longan', quantity: 0, price: 600 },
  { id: 26, name: 'Rambutan', quantity: 0, price: 500 },
  { id: 27, name: 'Mangosteen', quantity: 0, price: 800 },
  { id: 28, name: 'Durian', quantity: 0, price: 1500 },
  { id: 29, name: 'Jackfruit', quantity: 0, price: 60 },
  { id: 30, name: 'Star Fruit', quantity: 0, price: 150 },
  { id: 31, name: 'Custard Apple', quantity: 0, price: 150 },
  { id: 32, name: 'Soursop', quantity: 0, price: 350 },
  { id: 33, name: 'Sapodilla', quantity: 0, price: 80 },
  { id: 34, name: 'Persimmon', quantity: 0, price: 300 },
  { id: 35, name: 'Fig', quantity: 0, price: 500 },
  { id: 36, name: 'Date', quantity: 0, price: 400 },
  { id: 37, name: 'Coconut', quantity: 0, price: 80 },
  { id: 38, name: 'Avocado', quantity: 0, price: 350 },
  { id: 39, name: 'Lemon', quantity: 0, price: 120 },
  { id: 40, name: 'Lime', quantity: 0, price: 100 },
  { id: 41, name: 'Grapefruit', quantity: 0, price: 250 },
  { id: 42, name: 'Pomelo', quantity: 0, price: 150 },
  { id: 43, name: 'Tangerine', quantity: 0, price: 180 },
  { id: 44, name: 'Mandarin', quantity: 0, price: 160 },
  { id: 45, name: 'Clementine', quantity: 0, price: 300 },
  { id: 46, name: 'Kumquat', quantity: 0, price: 700 },
  { id: 47, name: 'Yuzu', quantity: 0, price: 1800 },
  { id: 48, name: 'Citron', quantity: 0, price: 200 },
  { id: 49, name: 'Blood Orange', quantity: 0, price: 400 },
  { id: 50, name: 'Bergamot Orange', quantity: 0, price: 600 },
  { id: 51, name: 'Cantaloupe', quantity: 0, price: 60 },
  { id: 52, name: 'Honeydew Melon', quantity: 0, price: 120 },
  { id: 53, name: 'Galia Melon', quantity: 0, price: 150 },
  { id: 54, name: 'Canary Melon', quantity: 0, price: 180 },
  { id: 55, name: 'Cranberry', quantity: 0, price: 1400 },
  { id: 56, name: 'Gooseberry', quantity: 0, price: 800 },
  { id: 57, name: 'Blackcurrant', quantity: 0, price: 1800 },
  { id: 58, name: 'Redcurrant', quantity: 0, price: 2000 },
  { id: 59, name: 'Whitecurrant', quantity: 0, price: 2200 },
  { id: 60, name: 'Mulberry', quantity: 0, price: 300 },
  { id: 61, name: 'Boysenberry', quantity: 0, price: 2200 },
  { id: 62, name: 'Loganberry', quantity: 0, price: 2200 },
  { id: 63, name: 'Cloudberry', quantity: 0, price: 3500 },
  { id: 64, name: 'Lingonberry', quantity: 0, price: 2000 },
  { id: 65, name: 'Huckleberry', quantity: 0, price: 2500 },
  { id: 66, name: 'Bilberry', quantity: 0, price: 2200 },
  { id: 67, name: 'Goji Berry', quantity: 0, price: 1800 },
  { id: 68, name: 'Acai Berry', quantity: 0, price: 2500 },
  { id: 69, name: 'Indian Gooseberry', quantity: 0, price: 100 },
  { id: 70, name: 'Jamun', quantity: 0, price: 200 },
  { id: 71, name: 'Jujube', quantity: 0, price: 100 },
  { id: 72, name: 'Loquat', quantity: 0, price: 300 },
  { id: 73, name: 'Quince', quantity: 0, price: 450 },
  { id: 74, name: 'Medlar', quantity: 0, price: 800 },
  { id: 75, name: 'Tamarind', quantity: 0, price: 200 },
  { id: 76, name: 'Bael', quantity: 0, price: 80 },
  { id: 77, name: 'Wood Apple', quantity: 0, price: 100 },
  { id: 78, name: 'Breadfruit', quantity: 0, price: 120 },
  { id: 79, name: 'Salak', quantity: 0, price: 600 },
  { id: 80, name: 'Langsat', quantity: 0, price: 700 },
  { id: 81, name: 'Santol', quantity: 0, price: 500 },
  { id: 82, name: 'Rose Apple', quantity: 0, price: 200 },
  { id: 83, name: 'Wax Apple', quantity: 0, price: 300 },
  { id: 84, name: 'Star Apple', quantity: 0, price: 500 },
  { id: 85, name: 'Canistel', quantity: 0, price: 400 },
  { id: 86, name: 'Black Sapote', quantity: 0, price: 600 },
  { id: 87, name: 'White Sapote', quantity: 0, price: 600 },
  { id: 88, name: 'Mamey Sapote', quantity: 0, price: 700 },
  { id: 89, name: 'Cherimoya', quantity: 0, price: 600 },
  { id: 90, name: 'Atemoya', quantity: 0, price: 450 },
  { id: 91, name: 'Feijoa', quantity: 0, price: 800 },
  { id: 92, name: 'Jabuticaba', quantity: 0, price: 1500 },
  { id: 93, name: 'Acerola', quantity: 0, price: 1000 },
  { id: 94, name: 'Surinam Cherry', quantity: 0, price: 800 },
  { id: 95, name: 'Cape Gooseberry', quantity: 0, price: 300 },
  { id: 96, name: 'Tamarillo', quantity: 0, price: 500 },
  { id: 97, name: 'Pepino Melon', quantity: 0, price: 400 },
  { id: 98, name: 'Prickly Pear', quantity: 0, price: 300 },
  { id: 99, name: 'Kiwano', quantity: 0, price: 800 },
  { id: 100, name: 'Miracle Fruit', quantity: 0, price: 3000 },
  { id: 101, name: 'Fuji Apple', quantity: 0, price: 250 },
  { id: 102, name: 'Gala Apple', quantity: 0, price: 220 },
  { id: 103, name: 'Granny Smith Apple', quantity: 0, price: 280 },
  { id: 104, name: 'Honeycrisp Apple', quantity: 0, price: 450 },
  { id: 105, name: 'Pink Lady Apple', quantity: 0, price: 350 },
  { id: 106, name: 'Golden Delicious Apple', quantity: 0, price: 220 },
  { id: 107, name: 'Red Delicious Apple', quantity: 0, price: 200 },
  { id: 108, name: 'Ambrosia Apple', quantity: 0, price: 350 },
  { id: 109, name: 'McIntosh Apple', quantity: 0, price: 350 },
  { id: 110, name: 'Braeburn Apple', quantity: 0, price: 300 },
  { id: 111, name: 'Alphonso Mango', quantity: 0, price: 600 },
  { id: 112, name: 'Kesar Mango', quantity: 0, price: 250 },
  { id: 113, name: 'Dasheri Mango', quantity: 0, price: 120 },
  { id: 114, name: 'Langra Mango', quantity: 0, price: 140 },
  { id: 115, name: 'Chausa Mango', quantity: 0, price: 150 },
  { id: 116, name: 'Banganapalli Mango', quantity: 0, price: 120 },
  { id: 117, name: 'Totapuri Mango', quantity: 0, price: 80 },
  { id: 118, name: 'Neelam Mango', quantity: 0, price: 120 },
  { id: 119, name: 'Himsagar Mango', quantity: 0, price: 180 },
  { id: 120, name: 'Amrapali Mango', quantity: 0, price: 140 },
  { id: 121, name: 'Cavendish Banana', quantity: 0, price: 60 },
  { id: 122, name: 'Red Banana', quantity: 0, price: 100 },
  { id: 123, name: 'Lady Finger Banana', quantity: 0, price: 90 },
  { id: 124, name: 'Blue Java Banana', quantity: 0, price: 250 },
  { id: 125, name: 'Burro Banana', quantity: 0, price: 180 },
  { id: 126, name: 'Concord Grape', quantity: 0, price: 300 },
  { id: 127, name: 'Thompson Grape', quantity: 0, price: 120 },
  { id: 128, name: 'Cotton Candy Grape', quantity: 0, price: 900 },
  { id: 129, name: 'Kyoho Grape', quantity: 0, price: 1200 },
  { id: 130, name: 'Moon Drops Grape', quantity: 0, price: 700 },
  { id: 131, name: 'Bartlett Pear', quantity: 0, price: 250 },
  { id: 132, name: 'Bosc Pear', quantity: 0, price: 350 },
  { id: 133, name: 'Anjou Pear', quantity: 0, price: 300 },
  { id: 134, name: 'Comice Pear', quantity: 0, price: 400 },
  { id: 135, name: 'Asian Pear', quantity: 0, price: 250 },
  { id: 136, name: 'Valencia Orange', quantity: 0, price: 150 },
  { id: 137, name: 'Navel Orange', quantity: 0, price: 200 },
  { id: 138, name: 'Cara Cara Orange', quantity: 0, price: 350 },
  { id: 139, name: 'Satsuma Mandarin', quantity: 0, price: 300 },
  { id: 140, name: 'Tangelo', quantity: 0, price: 300 },
  { id: 141, name: 'Meyer Lemon', quantity: 0, price: 400 },
  { id: 142, name: 'Eureka Lemon', quantity: 0, price: 200 },
  { id: 143, name: 'Key Lime', quantity: 0, price: 150 },
  { id: 144, name: 'Finger Lime', quantity: 0, price: 3000 },
  { id: 145, name: 'Persian Lime', quantity: 0, price: 180 },
  { id: 146, name: 'Bing Cherry', quantity: 0, price: 1000 },
  { id: 147, name: 'Rainier Cherry', quantity: 0, price: 1800 },
  { id: 148, name: 'Montmorency Cherry', quantity: 0, price: 1200 },
  { id: 149, name: 'Golden Kiwi', quantity: 0, price: 600 },
  { id: 150, name: 'Flat Peach', quantity: 0, price: 500 },
  { id: 151, name: 'Potato', quantity: 0, price: 30 },
  { id: 152, name: 'Tomato', quantity: 0, price: 41 },
  { id: 153, name: 'Onion', quantity: 0, price: 40 },
  { id: 154, name: 'Carrot', quantity: 0, price: 60 },
  { id: 155, name: 'Cabbage', quantity: 0, price: 35 },
  { id: 156, name: 'Cauliflower', quantity: 0, price: 60 },
  { id: 157, name: 'Broccoli', quantity: 0, price: 180 },
  { id: 158, name: 'Spinach', quantity: 0, price: 80 },
  { id: 159, name: 'Eggplant', quantity: 0, price: 60 },
  { id: 160, name: 'Okra', quantity: 0, price: 70 },
  { id: 161, name: 'Green Peas', quantity: 0, price: 120 },
  { id: 162, name: 'Green Beans', quantity: 0, price: 100 },
  { id: 163, name: 'Bell Pepper', quantity: 0, price: 120 },
  { id: 164, name: 'Cucumber', quantity: 0, price: 50 },
  { id: 165, name: 'Pumpkin', quantity: 0, price: 35 },
  { id: 166, name: 'Bottle Gourd', quantity: 0, price: 40 },
  { id: 167, name: 'Bitter Gourd', quantity: 0, price: 70 },
  { id: 168, name: 'Ridge Gourd', quantity: 0, price: 70 },
  { id: 169, name: 'Snake Gourd', quantity: 0, price: 60 },
  { id: 170, name: 'Ash Gourd', quantity: 0, price: 35 },
  { id: 171, name: 'Radish', quantity: 0, price: 45 },
  { id: 172, name: 'Beetroot', quantity: 0, price: 60 },
  { id: 173, name: 'Turnip', quantity: 0, price: 70 },
  { id: 174, name: 'Sweet Potato', quantity: 0, price: 60 },
  { id: 175, name: 'Yam', quantity: 0, price: 80 },
  { id: 176, name: 'Taro', quantity: 0, price: 80 },
  { id: 177, name: 'Cassava', quantity: 0, price: 60 },
  { id: 178, name: 'Garlic', quantity: 0, price: 200 },
  { id: 179, name: 'Ginger', quantity: 0, price: 160 },
  { id: 180, name: 'Leek', quantity: 0, price: 250 },
  { id: 181, name: 'Spring Onion', quantity: 0, price: 100 },
  { id: 182, name: 'Shallot', quantity: 0, price: 100 },
  { id: 183, name: 'Celery', quantity: 0, price: 200 },
  { id: 184, name: 'Lettuce', quantity: 0, price: 180 },
  { id: 185, name: 'Kale', quantity: 0, price: 400 },
  { id: 186, name: 'Swiss Chard', quantity: 0, price: 350 },
  { id: 187, name: 'Bok Choy', quantity: 0, price: 200 },
  { id: 188, name: 'Brussels Sprouts', quantity: 0, price: 600 },
  { id: 189, name: 'Asparagus', quantity: 0, price: 1000 },
  { id: 190, name: 'Artichoke', quantity: 0, price: 900 },
  { id: 191, name: 'Zucchini', quantity: 0, price: 160 },
  { id: 192, name: 'Butternut Squash', quantity: 0, price: 150 },
  { id: 193, name: 'Sweet Corn', quantity: 0, price: 70 },
  { id: 194, name: 'Parsnip', quantity: 0, price: 350 },
  { id: 195, name: 'Kohlrabi', quantity: 0, price: 80 },
  { id: 196, name: 'Drumstick', quantity: 0, price: 120 },
  { id: 197, name: 'Fenugreek Leaves', quantity: 0, price: 100 },
  { id: 198, name: 'Mustard Greens', quantity: 0, price: 60 },
  { id: 199, name: 'Ivy Gourd', quantity: 0, price: 70 },
  { id: 200, name: 'Pointed Gourd', quantity: 0, price: 80 },
];

const INIT_SHOPPING_STORE = {
  items,
  cart: {
    quantity: 0,
    total: 0,
    indices: [],
  },
};
