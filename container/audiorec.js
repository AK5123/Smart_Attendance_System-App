import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TouchableOpacity,
    Image,
    Dimensions
  } from 'react-native';
  import AudioRecord from 'react-native-audio-record';
  import {Buffer} from 'buffer'
  import RNFS from "react-native-fs"

export default class Audio extends Component{

    state = {
        recording: false,
        fileloc: "",
        toPrint:"",
        token:"",
        tokenIn: false
    }
    options = {
        sampleRate: 16000,  // default 44100
        channels: 1,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        audioSource: 6,     // android only (see below)
        wavFile: 'test.wav' // default 'audio.wav'
      };

    startreco = () => {
        console.log("start");
        AudioRecord.start();
        this.setState({
            recording: true
        });

    }
    
    stopreco = async() => {
        // AudioRecord.stop();
        if(this.state.recording){
          let audioFile = await AudioRecord.stop();
          console.log("stop",audioFile);
          this.setState({
              recording: false,
              fileloc: audioFile
          });
        }
    }

    speechtotext = async () => {

      let myHeaders1 = new Headers();
            myHeaders1.append("Host", "westus.stt.speech.microsoft.com");
            myHeaders1.append("Content-Type", "audio/wav");
            myHeaders1.append("Authorization", "Bearer "+this.state.token);
            myHeaders1.append("Accept", "application/json");
            
            var file = await RNFS.readFile(this.state.fileloc,"base64")
            console.log(typeof file , "\n");

            // var newfile = new Buffer(file,'binary').toString();
            // console.log("in there",typeof newfile,newfile);
            
            let requestOptions1 = {
              method: 'POST',
              headers: myHeaders1,
              body: file,
              redirect: 'follow'
            };
            
            fetch("https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US", requestOptions1)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));


    }

    giveAttendance = () => {

      var myHeaders = new Headers();
      myHeaders.append("Ocp-Apim-Subscription-Key", "b32ce6ab77e14591aac2646405775cdf");
      myHeaders.append("Host", "westus.api.cognitive.microsoft.com");
      myHeaders.append("Content-type", "application/x-www-form-urlencoded");
      myHeaders.append("Content-Length", "0");

      var raw = "";

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      console.log("s1",this.state);

      if(this.state.tokenIn && this.state.token){

        this.speechtotext();

      }else{

        fetch("https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken", requestOptions)
        .then(response => response.text())
        .then(result => {
            this.setState({token: result, tokenIn: true});
            setTimeout(()=>{
              this.setState({tokenIn: false});
            },540000);
            console.log("s2",this.state);
            this.speechtotext()
            
        })
        .catch(error => console.log('error', error));

      }

      
    }

    
    componentDidMount(){
  
        // console.log(this.options);
        AudioRecord.init(this.options);
    }

    render(){
        // console.log("hey")
        return(

          <View style={styles.body}>
          <View style={styles.header}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Attendance",{})}>
                  <Image style={styles.back} source={require("../assets/back.png")}/>
              </TouchableOpacity>
              <View style={{marginLeft:10, width:"50%"}}>
                 <Text style={{fontSize: 30,fontWeight: 'bold'}}>hi there</Text>
             </View>
          </View>

          <View style={styles.outer}>

            <View>
              <Text>
                  Repeat the following sentence {"\n"}
              </Text>
              <Text>
                {/* {this.randomsentence()} */}
              </Text>
            </View>

            <View style={styles.recordview}>
                <View style={styles.startbtn}>
                        <TouchableOpacity 
                        disabled={this.state.recording}
                        onPress={this.startreco}
                        style={styles.addbutton1}>
                            <Image style={{width:50, height: 50}} source={require("../assets/play-button.png")}/>
                        </TouchableOpacity>
                </View>

                {this.state.recording ? <View>
                    <Image source={require("../assets/voice_loaderrr.gif")} style={{height:300,width:300}}/>
                </View>: null}

                <View style={styles.stopbtn}>
                    <TouchableOpacity 
                        disabled={!this.state.recording}

                    onPress={this.stopreco}
                    style={styles.addbutton1}>
                          <Image style={{width:45, height: 45}} source={require("../assets/square.png")}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Text>
                  {this.state.toPrint}
                </Text>
            </View>
            <View>
            <TouchableOpacity 
            onPress={this.giveAttendance}
            style={styles.addbutton1}>
                <Text style={{color:"#FF6347"}}>
                    Proceed
                </Text>
            </TouchableOpacity>
            </View>
          </View>



            
        </View>
        )
      }

}

const styles = {
    parent:{
        flexDirection: "column",
        width: 500,
        height: 500,
        justifyContent: "space-around",
        alignItems: "center",
    },btn :{
      height : 100,
      borderRadius: 10,
    },
    body:{
      flex:1,
      flexDirection:"column"
  },
  header:{
      alignItems:"center",
      flexDirection:"row",
      width: "100%",
      height: 60,
      // borderWidth:1,
      shadowColor:'black',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.9,
      elevation: 6,
      backgroundColor:"yellow"

  },
  back:{
      marginLeft:5,
      height:35,
      width:35
  },
  outer:{
    flex:1,
    flexDirection:"column",
    alignItems: "center",
    justifyContent:"center"
  },
  recordview:{
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-around",
    width: "100%"
  },
  addbutton1:{
    width:Dimensions.get('window').width*0.2,
    height:50,
    // backgroundColor:"#000",
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    marginLeft:3,
    // shadowColor:'black',
    // shadowOffset: {width: 10, height: 10},
    // shadowOpacity: 1,
    // elevation: 5,
    // shadowRadius:6
  },
  startbtn:{
    alignItems:"center",
    justifyContent:"center"
  },
  stopbtn:{
    alignItems:"center",
    justifyContent:"center"
  }

}