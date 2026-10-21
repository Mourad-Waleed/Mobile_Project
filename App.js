import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { currentUser, providers } from './src/data/mockData';
import ProviderDiscoveryScreen from './src/screens/ProviderDiscoveryScreen';

// Temporary handlers: the other screens do not exist yet, so each action
// just shows what it will do. Replace with real navigation later.
const comingSoon = (message) => () => Alert.alert('Coming soon', message);

export default function App() {
  return (
    <>
      <ProviderDiscoveryScreen
        currentUser={currentUser}
        providers={providers}
        onJoinPress={comingSoon('Join with code opens the Join screen (S04).')}
        onProviderPress={(provider) => comingSoon(`${provider.name} opens its menu (S02).`)()}
        onStartGroup={(provider) =>
          comingSoon(`Starting a group with ${provider.name} opens Create Group (S03).`)()
        }
      />
      <StatusBar style="auto" />
    </>
  );
}
