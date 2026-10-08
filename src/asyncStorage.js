import { createAsyncStorage } from '@react-native-async-storage/async-storage';

const storage = createAsyncStorage('shoppingAppDB');

export { storage };
