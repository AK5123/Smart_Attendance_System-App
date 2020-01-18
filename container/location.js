import React,{Component} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
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

    handleRoute = (val) =>{
        this.props.navigation.navigate(val,{main:"value"});

    }
    render(){
        return(
          <View>
            <Text> Latitude:{this.state.lat}  Longitude:{this.state.long}</Text>
            <TouchableOpacity 
                    onPress={()=>this.handleRoute('Audiorec')}>
                    <View style={[styles.card,styles.loginButton,styles.buttonContainer]}>
                        <View style={styles.textview}>
                            <Text style={styles.textc}>Next</Text>
                        </View>
                    </View>
            </TouchableOpacity>
          </View>
        )
      }

}

const styles = {
  textview:{
      justifyContent:"center",
      width:100
  },
  textc:{
      textAlign:"center",
      // color:"white",
      fontWeight:"bold",
      // borderColor:"green",
      // borderWidth:2
  },
  card:{
      flexDirection:"row",
      justifyContent:"space-around"
  },
  image1:{
      width:50,
      height:50,
      margin:10,
      marginTop:25
  },
  nitin:{
      backgroundColor:"#222222",
      justifyContent:"center",
      flex:1,
      alignItems:"center",
      flexDirection:"column",
      
  },
  buttonContainer: {
      height:100,
      // flexDirection: 'row',
      // justifyContent: 'center',
      // alignItems: 'center',
      marginBottom:20,
      width:200,
      // paddingTop:25,
      justifyContent:"center",
      // marginLeft: 15,
      borderRadius: 10
    },
    loginButton: {
      backgroundColor: "#FF6347",
    }
}

//this.props.navigation.state;