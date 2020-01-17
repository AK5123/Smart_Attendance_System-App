import React,{Component} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';

export default class Loc extends Component{

  state = {
    lat:0.0,
    long:0.0
  }

    componentDidMount(){
      Geolocation.getCurrentPosition(
        (position) => {
           let currentLongitude = JSON.stringify(position.coords.longitude);
           let currentLatitude = JSON.stringify(position.coords.latitude);

           this.setState({ lat:currentLongitude,  long:currentLatitude });
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
     );
    }
    render(){
        return(
          <View>
            <Text> Latitude:{this.state.lat}  Longitude:{this.state.long}</Text>
          </View>
        )
      }

}