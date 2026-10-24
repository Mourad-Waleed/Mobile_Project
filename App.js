import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';
import { cancelGroup, createGroup, finalizeGroup, getGroupDetails } from './src/repositories/groupRepository';
import { getProviderById, getProviders } from './src/repositories/restaurantRepository';
import BrowseRestaurantsScreen from './src/screens/BrowseRestaurantsScreen';
import CreateGroupOrderScreen from './src/screens/CreateGroupOrderScreen';
import GroupOrderDetailsScreen from './src/screens/GroupOrderDetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import JoinGroupOrderScreen from './src/screens/JoinGroupOrderScreen';
import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/MenuScreen';
import ParticipantsInvitationsScreen from './src/screens/ParticipantsInvitationsScreen';
import ProviderDiscoveryScreen from './src/screens/ProviderDiscoveryScreen';
import RestaurantDetailsScreen from './src/screens/RestaurantDetailsScreen';
import SignUpScreen from './src/screens/SignUpScreen';

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
  // Swaps the screen on top, so Back skips a form that was already submitted.
  const replaceTop = (name, params = {}) =>
    setStack((previous) => [...previous.slice(0, -1), { name, params }]);

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
            onJoinPress={() => navigate('joinGroup')}
            onProviderPress={(provider) => navigate('details', { providerId: provider.providerId })}
            onStartGroup={(provider) => navigate('createGroup', { providerId: provider.providerId })}
          />
        );
      case 'joinGroup':
        return (
          <JoinGroupOrderScreen
            user={user}
            onBack={goBack}
            onJoined={(groupCode) => replaceTop('groupDetails', { groupCode })}
          />
        );
      case 'groupDetails': {
        const group = getGroupDetails(params.groupCode);
        // Finalizing or cancelling changes the stored group in place, so
        // re-render the stack to show the new status.
        const refresh = () => setStack((previous) => [...previous]);
        return (
          <GroupOrderDetailsScreen
            group={group}
            currentUserId={user?.userId}
            onBack={goBack}
            onViewMenu={() => navigate('menu', { providerId: group?.providerId })}
            onViewParticipants={() => navigate('participants', { groupCode: params.groupCode })}
            onFinalize={() => {
              const { error } = finalizeGroup(params.groupCode, user);
              error ? Alert.alert('Could not finalize', error) : refresh();
            }}
            onCancel={() => {
              const { error } = cancelGroup(params.groupCode, user);
              error ? Alert.alert('Could not cancel', error) : refresh();
            }}
          />
        );
      }
      case 'participants':
        return (
          <ParticipantsInvitationsScreen
            group={getGroupDetails(params.groupCode)}
            currentUserId={user?.userId}
            onBack={goBack}
          />
        );
      case 'createGroup':
        return (
          <CreateGroupOrderScreen
            providerId={params.providerId}
            provider={getProviderById(params.providerId)}
            onBack={goBack}
            onCreate={(groupData) => {
              const group = createGroup({ ...groupData, organizer: user });
              replaceTop('groupDetails', { groupCode: group.code });
            }}
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
