import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../ContextProviders/AuthProvider';
import { onLoginAction, onLogoutAction } from '../middlewares/authMiddleware';
import { onShoppingStoreResetAction } from '../middlewares/shoppingStoreMiddleware';
import { useShoppingStore } from '../ContextProviders/ShoppingStoreProvider';

export default function LandingPage() {
  const navigation = useNavigation();
  const { auth, dispatch: authDispatch } = useAuth();
  const { shoppingStore, dispatch: shoppingStoreDispatch } = useShoppingStore();

  const user = auth.user;
  const cartQuantity = shoppingStore.cart.quantity;

  return (
    <View style={styles.landingPageContainer}>
      {user?.isLoggedIn ? (
        <Text style={styles.headerText}>Hi {user.userName}</Text>
      ) : (
        <Button title="Login" onPress={() => onLoginAction(authDispatch)} />
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
        <>
          <Button
            title="Logout"
            onPress={() => {
              onLogoutAction(authDispatch);
              onShoppingStoreResetAction(shoppingStoreDispatch);
            }}
          />
          <View style={styles.divider} />
        </>
      )}
      <Button
        title="Reset"
        onPress={() => {
          onLogoutAction(authDispatch);
          onShoppingStoreResetAction(shoppingStoreDispatch);
        }}
      />
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
