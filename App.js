/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Search from './screens/Search';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


export default App;
