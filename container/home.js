import React,{Component} from 'react';
// import Geolocation from 'react-native-geolocation-service';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';

export default class Home extends Component{

    state={
        uid:"Enter uid"
    }

    handleText = (text)=>{
        if(text.slice(0,text.length-1) == "search here!!"){
            this.setState({
                uid:""+text.slice(text.length-1,text.length)
            })
        }
        else{
            this.setState({
                uid:text
            })
        }
    }

    handleRoute = (val) => {
        this.props.navigation.navigate(val,{val:false})
    }

    render(){
        return(
            <View style={styles.body}>
                <View>
                    <Text style={styles.head}>
                    TEMP
                    </Text>
                </View>
                <View style={styles.uid}>
                    <TextInput 
                       style={styles.searchbox}
                       placeholder="Enter uid"
                       placeholderTextColor="#FF6347"
                        // onChangeText={(text)=>this.handleText(text)}
                        // value={this.state.uid}
                        />
                </View>
                <View style={styles.login}>
                    <TouchableOpacity 
                    onPress={()=> this.handleRoute("Attendance")}
                    style={styles.addbutton1}>
                        <Text style={{color:"#FF6347"}}>
                            Enter
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles={
    body:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    head:{
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily:''
    },
    uid:{
        flexDirection: 'row',
        width: '80%',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:"50%"
    },
    login:{
        justifyContent:'space-around',
        alignItems:'center',
        marginTop: "15%"
    },
    searchbox:{
        width:Dimensions.get('window').width*0.65,
        height:40,
        backgroundColor:'#383838',
        // borderWidth:1,
        // shadowColor:'#000',
        // shadowOffset: {width: 0, height: 3},
        // shadowOpacity: 0.3,
        // elevation: 1,
        borderRadius:3,
        color:"#FF6347",
        textAlign:"center"
    },
    addbutton1:{
        width:Dimensions.get('window').width*0.4,
        height:50,
        backgroundColor:"#383838",
        borderRadius:3,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:3,
    },

}