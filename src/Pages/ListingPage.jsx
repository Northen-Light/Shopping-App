import { useNavigation } from '@react-navigation/native';
import { memo, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../ContextProviders/AuthProvider';
import { onLoginAction } from '../middlewares/authMiddleware';
import {
  onShoppingStoreIncrementAction,
  onShoppingStoreDecrementAction,
  onShoppingStoreAppendItemsAction,
} from '../middlewares/shoppingStoreMiddleware';
import { useShoppingStore } from '../ContextProviders/ShoppingStoreProvider';
import { TOTAL_ITEMS } from '../constants';

const Item = memo(({ itemName, itemPrice, itemQuantity, index, dispatch }) => {
  const { auth } = useAuth();
  const user = auth.user;

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.fontSize16}>
        {itemName}(₹{itemPrice})
      </Text>
      <Text style={styles.quantityText}>Qty : {itemQuantity}</Text>
      <View style={styles.modifyButtonContainer}>
        <TouchableOpacity
          style={styles.modifyButton}
          disabled={!user.isLoggedIn}
          onPress={() => onShoppingStoreIncrementAction(dispatch, index)}
        >
          <Text style={styles.fontSize16}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modifyButton}
          disabled={!user.isLoggedIn}
          onPress={() => onShoppingStoreDecrementAction(dispatch, index)}
        >
          <Text style={styles.fontSize16}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default function ListingPage() {
  const navigation = useNavigation();
  const { auth, dispatch: authDispatch } = useAuth();
  const { shoppingStore, dispatch: shoppingStoreDispatch } = useShoppingStore();
  const [isLoading, setLoading] = useState(false);

  const user = auth.user;
  const items = shoppingStore.items;
  const cartQuantity = shoppingStore.cart.quantity;
  const cartTotal = shoppingStore.cart.total;

  const hasMore = items.length < TOTAL_ITEMS;

  useEffect(() => {
    navigation.setOptions({
      title: 'Items List',
    });
  }, [navigation]);

  const loadMoreData = () => {
    if (!hasMore || isLoading) return;

    setLoading(true);

    setTimeout(() => {
      onShoppingStoreAppendItemsAction(shoppingStoreDispatch);
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.listingPageContainer}>
      {!user.isLoggedIn && (
        <>
          <Button title="Login" onPress={() => onLoginAction(authDispatch)} />
          <View style={styles.divider} />
        </>
      )}
      {user.isLoggedIn && cartQuantity > 0 && (
        <View style={styles.itemContainer}>
          <Text style={styles.fontSize24}>
            🛒 (x{cartQuantity}) Total : ₹{cartTotal}
          </Text>
          <Button
            title="Checkout"
            onPress={() => navigation.navigate('Payment')}
          />
        </View>
      )}
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <Item
            itemName={item.name}
            itemQuantity={item.quantity}
            itemPrice={item.price}
            index={index}
            dispatch={shoppingStoreDispatch}
          />
        )}
        keyExtractor={item => item.id}
        onEndReached={loadMoreData}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        ListFooterComponentStyle={styles.listFooterContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listingPageContainer: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    borderRadius: 4,
    backgroundColor: '#D3D3D3',
    marginVertical: 4,
    width: '100%',
    height: 48,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontSize16: {
    fontSize: 16,
  },
  fontSize24: {
    fontSize: 24,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modifyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modifyButton: {
    width: 32,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quantityText: {
    position: 'absolute',
    left: 160,
    fontSize: 16,
    marginHorizontal: 32,
  },
  divider: {
    margin: 8,
  },
  listFooterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
