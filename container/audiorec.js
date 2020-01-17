import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';
  import AudioRecord from 'react-native-audio-record';

export default class Audio extends Component{

    state = {
        recording: false,
        fileloc: ""
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


    
    componentDidMount(){
  
        console.log(this.options);
        AudioRecord.init(this.options);
    }

    render(){
        console.log("hey")
        return(
          <View style={styles.parent}>
            <Button 
            title="Start"
            onPress={()=> this.startreco()} />
            <Button 
            title="Stop"
            onPress={() => this.stopreco()} />
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
    }
}