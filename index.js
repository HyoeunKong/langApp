import { registerRootComponent } from 'expo'
import { Ionicons } from '@expo/vector-icons'

import App from './App'
import App2 from './App2'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App2)
