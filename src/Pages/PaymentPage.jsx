/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useShoppingStore } from '../ContextProviders/ShoppingStoreProvider';
import { onShoppingStoreResetAction } from '../middlewares/shoppingStoreMiddleware';

export default function Payment() {
  const navigation = useNavigation();
  const [orderStatus, setOrderStatus] = useState('IN_PROGRESS');
  const [modalVisible, setModalVisible] = useState(false);
  const { shoppingStore, dispatch: shoppingStoreDispatch } = useShoppingStore();

  const cartItemIndices = shoppingStore.cart.indices;
  const cartQuantity = shoppingStore.cart.quantity;
  const cartTotal = shoppingStore.cart.total;
  const items = shoppingStore.items;

  const timerId = useRef();

  const onPlaceOrder = () => {
    setOrderStatus('IN_PROGRESS');
    setModalVisible(true);

    timerId.current = setTimeout(() => {
      setOrderStatus('DONE');

      setTimeout(() => {
        setModalVisible(false);
        onShoppingStoreResetAction(shoppingStoreDispatch);
        navigation.popTo('Landing');
      }, 1000);
    }, 5000);
  };

  const onModalClose = () => {
    clearTimeout(timerId.current);
    setModalVisible(false);
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Payment',
    });
  }, [navigation]);

  return (
    <View style={styles.paymentPageContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.orderProgressionView}>
            <Text style={{ ...styles.fontSize24, marginVertical: 16 }}>
              {orderStatus === 'IN_PROGRESS'
                ? `Placing order...`
                : 'Order placed ✓'}
            </Text>
            {orderStatus === 'IN_PROGRESS' && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          </View>
        </View>
      </Modal>
      <ScrollView>
        {cartItemIndices.map(cartItemIndex => {
          const cartItem = items[cartItemIndex];

          return (
            <View key={cartItem.id} style={styles.itemContainer}>
              <Text style={styles.fontSize24}>
                {cartItem.name}(x{cartItem.quantity})
              </Text>
              <Text style={styles.fontSize24}>
                Total : ₹{cartItem.price * cartItem.quantity}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={{ ...styles.itemContainer, marginTop: 24 }}>
        <Text style={styles.fontSize24}>🛒 Items(x{cartQuantity})</Text>
        <Text style={styles.fontSize24}>Total : ₹{cartTotal}</Text>
      </View>
      <Button title="Place order" onPress={onPlaceOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  paymentPageContainer: {
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
  fontSize24: {
    fontSize: 24,
  },
  modalContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
  },
  orderProgressionView: {
    width: 200,
    height: 200,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
