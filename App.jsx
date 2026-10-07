import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './src/LandingPage';
import ListingPage from './src/ListingPage';
import PaymentPage from './src/PaymentPage';
import { AuthProvider } from './src/AuthProvider';
import { ShoppingStoreProvider } from './src/ShoppingStoreProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Listing" component={ListingPage} />
      <Stack.Screen name="Payment" component={PaymentPage} />
    </Stack.Navigator>
  );
}

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ShoppingStoreProvider>{children}</ShoppingStoreProvider>
    </AuthProvider>
  );
};

function AppContent() {
  return (
    <NavigationContainer>
      <AppProviders>
        <RootStack />
      </AppProviders>
    </NavigationContainer>
  );
}

export default App;
