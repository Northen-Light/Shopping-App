import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthProvider';
import { loginAction, logoutAction } from './authMiddleware';
import { onShoppingStoreResetAction } from './shoppingStoreMiddleware';
import { useShoppingStore } from './ShoppingStoreProvider';

export default function LandingPage() {
  const navigation = useNavigation();
  const { user, dispatch: authDispatch } = useAuth();
  const { shoppingStore, dispatch: shoppingStoreDispatch } = useShoppingStore();

  const cartQuantity = shoppingStore.cart.quantity;

  return (
    <View style={styles.landingPageContainer}>
      {user?.isLoggedIn ? (
        <Text style={styles.headerText}>Hi {user.userName}</Text>
      ) : (
        <Button title="Login" onPress={() => loginAction(authDispatch)} />
      )}
      <View style={styles.divider} />
      <Text style={styles.headerText}>Welcome to Shopping App</Text>
      {cartQuantity > 0 && (
        <>
          <View style={styles.divider} />
          <Button
            title="Go to cart"
            onPress={() => navigation.navigate('Payment')}
          />
        </>
      )}
      <View style={styles.divider} />
      <Button
        title="Explore the store"
        onPress={() => navigation.navigate('Listing')}
      />
      <View style={styles.divider} />
      {user.isLoggedIn && (
        <Button
          title="Logout"
          onPress={() => {
            logoutAction(authDispatch);
            onShoppingStoreResetAction(shoppingStoreDispatch);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  landingPageContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
  },
  divider: {
    marginVertical: 16,
  },
});
