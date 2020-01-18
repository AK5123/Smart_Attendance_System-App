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
import Home from './container/home';
import Attendance from './container/attendance';
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
import {check, PERMISSIONS, request} from 'react-native-permissions';

const AppSwitchNavigator = createSwitchNavigator({
  Home: {screen: Home},
  Attendance: {screen: Attendance},
  Loc: {screen: Location},
  Pic: {screen: Pic},
  Audiorec: {screen: Audiorec},
});

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component {

  checkStatus = async() =>{
    let checkLoc = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if(checkLoc != "granted"){
      let checkLocStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log(checkLocStatus);
    }
    let checkMicro = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if(checkMicro != "granted"){
      let checkMicroStatus = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      console.log(checkMicroStatus);
    }  
    let checkCam = await check(PERMISSIONS.ANDROID.CAMERA);
    if(checkCam != "granted"){
      let checkCamStatus = await request(PERMISSIONS.ANDROID.CAMERA);
      console.log(checkCamStatus);
    }  
    let checkStorage = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if(checkStorage != "granted"){
      let checkStorageStatus = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      console.log(checkStorageStatus);
    }  
  }

  componentDidMount(){
    this.checkStatus()
  }

  render() {
    return <AppContainer />;
  }
}

export default App;
