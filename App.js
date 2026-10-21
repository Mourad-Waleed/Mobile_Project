import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';
import { getProviders } from './src/repositories/restaurantRepository';
import BrowseRestaurantsScreen from './src/screens/BrowseRestaurantsScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/MenuScreen';
import ProviderDiscoveryScreen from './src/screens/ProviderDiscoveryScreen';
import RestaurantDetailsScreen from './src/screens/RestaurantDetailsScreen';
import SignUpScreen from './src/screens/SignUpScreen';

// Temporary handlers for screens that belong to other team members
// (joining a group, creating a group). Replace when those screens exist.
const comingSoon = (message) => () => Alert.alert('Coming soon', message);

// Simple navigation without a library (none is chosen yet).
// `stack` is a list of routes { name, params }; the last one is on screen.
// navigate() pushes a route, goBack() pops it. Screens receive ids in
// `params` (never copies of the data) and look the data up themselves.
// Limits: no swipe-back gesture or animations, no deep links, and the
// stack resets when the app reloads.
export default function App() {
  const [stack, setStack] = useState([{ name: 'login', params: {} }]);
  const [user, setUser] = useState(null);

  const navigate = (name, params = {}) =>
    setStack((previous) => [...previous, { name, params }]);
  const goBack = () =>
    setStack((previous) => (previous.length > 1 ? previous.slice(0, -1) : previous));
  const resetTo = (name) => setStack([{ name, params: {} }]);

  // Android hardware back button: go back a screen when there is one to go back to.
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) {
        goBack();
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [stack.length]);

  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser);
    resetTo('home');
  };

  const renderRoute = ({ name, params }) => {
    switch (name) {
      case 'signup':
        return <SignUpScreen onSignUp={handleAuthenticated} onGoToLogin={() => resetTo('login')} />;
      case 'home':
        return (
          <HomeScreen
            user={user}
            onSearchPress={() => navigate('browse', { focusSearch: true })}
            onCuisinePress={(cuisine) => navigate('browse', { cuisine })}
            onBrowsePress={() => navigate('browse')}
            onProviderPress={(providerId) => navigate('details', { providerId })}
            onGroupOrderPress={() => navigate('providers')}
          />
        );
      case 'browse':
        return (
          <BrowseRestaurantsScreen
            initialCuisine={params.cuisine ?? null}
            autoFocusSearch={Boolean(params.focusSearch)}
            onBack={goBack}
            onProviderPress={(providerId) => navigate('details', { providerId })}
          />
        );
      case 'details':
        return (
          <RestaurantDetailsScreen
            providerId={params.providerId}
            onBack={goBack}
            onViewMenu={(providerId) => navigate('menu', { providerId })}
          />
        );
      case 'menu':
        return <MenuScreen providerId={params.providerId} onBack={goBack} />;
      case 'providers':
        return (
          <ProviderDiscoveryScreen
            currentUser={user}
            providers={getProviders()}
            onBack={goBack}
            onJoinPress={comingSoon('Join with code opens the Join screen (another team member).')}
            onProviderPress={(provider) => navigate('details', { providerId: provider.providerId })}
            onStartGroup={(provider) =>
              comingSoon(`Starting a group with ${provider.name} opens Create Group (another team member).`)()
            }
          />
        );
      case 'login':
      default:
        return <LoginScreen onLogin={handleAuthenticated} onGoToSignUp={() => resetTo('signup')} />;
    }
  };

  // Every screen in the stack stays mounted; only the top one is visible.
  // This keeps things like Browse's search text and filter when you come back.
  return (
    <>
      {stack.map((route, index) => (
        <View
          key={`${index}-${route.name}`}
          style={index === stack.length - 1 ? styles.screen : styles.hidden}
        >
          {renderRoute(route)}
        </View>
      ))}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
});
