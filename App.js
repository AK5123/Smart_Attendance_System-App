/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Audiorec from './container/audiorec';
import Location from './container/location';
import Pic from './container/photo';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

const AppSwitchNavigator = createSwitchNavigator({
  Pic: {screen: Pic},
  Audiorec: {screen: Audiorec},
  Loc: {screen: Location},
});

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
