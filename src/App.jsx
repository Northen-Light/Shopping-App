import {
  ActivityIndicator,
  Linking,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './Pages/LandingPage';
import ListingPage from './Pages/ListingPage';
import PaymentPage from './Pages/PaymentPage';
import ExplorePage from './Pages/ExplorePage';
import { AuthProvider } from './ContextProviders/AuthProvider';
import { ShoppingStoreProvider } from './ContextProviders/ShoppingStoreProvider';
import { useEffect, useState } from 'react';
import { storage } from './asyncStorage';
import { NAVIGATION_STATE_KEY } from './constants';

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
      <Stack.Screen name="Explore" component={ExplorePage} />
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
  const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(
    __DEV__ ? false : Platform.OS === 'web',
  );

  useEffect(() => {
    const restoreNavigationState = async () => {
      try {
        const initialURL = await Linking.getInitialURL();

        if (!initialURL) {
          const navigationStateString = await storage.getItem(
            NAVIGATION_STATE_KEY,
          );

          if (navigationStateString) {
            setInitialState(JSON.parse(navigationStateString));
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreNavigationState();
    }
  }, [isReady]);

  if (!isReady) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        storage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state))
      }
    >
      <AppProviders>
        <RootStack />
      </AppProviders>
    </NavigationContainer>
  );
}

export default App;
