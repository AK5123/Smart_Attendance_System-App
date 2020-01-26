import React, {Component} from 'react';
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
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AudioRecord from 'react-native-audio-record';
import {Buffer} from 'buffer';
import RNFS from 'react-native-fs';
import Geolocation from 'react-native-geolocation-service';

export default class Audio extends Component {
  state = {
    recording: false,
    fileloc: '',
    toPrint: '',
    token: '',
    tokenIn: false,
    lat: 0.0,
    long: 0.0,
    result: -1,
    eid: null,
    sentance:"",
    id:"b32ce6ab77e14591aac2646405775cdf",
  };
  options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: 'test.wav', // default 'audio.wav'
  };

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let currentLongitude = JSON.stringify(position.coords.longitude);
        let currentLatitude = JSON.stringify(position.coords.latitude);
        console.log(currentLatitude, currentLongitude);
        this.setState({lat: currentLatitude, long: currentLongitude});
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  startreco = () => {
    console.log('start');
    AudioRecord.start();
    this.setState({
      recording: true,
    });
  };

  componentWillMount() {
    this.getLocation();
  }

  stopreco = async () => {
    // AudioRecord.stop();
    this.renderSentence();
    if (this.state.recording) {
      let audioFile = await AudioRecord.stop();
      console.log('stop', audioFile);
      this.setState({
        recording: false,
        fileloc: audioFile,
      });
    }
  };

  speechtotext = async () => {
    let myHeaders1 = new Headers();
    myHeaders1.append('Host', 'westus.stt.speech.microsoft.com');
    myHeaders1.append('Content-Type', 'audio/wav');
    myHeaders1.append(
      'Content-Disposition',
      'attachment;filename="' + 'test.wav' + '"',
    );
    myHeaders1.append('Authorization', 'Bearer ' + this.state.token);
    myHeaders1.append('Accept', 'application/json');

    // var file = await RNFS.readFile(this.state.fileloc,"base64")
    // console.log(typeof file , "\n");

    // var newfile = new Buffer(file,'binary').toString();
    // console.log("in there",typeof newfile,newfile);

    var form = new FormData();
    form.append('eid', this.state.eid);
    form.append('audio', {
      name: 'test.wav',
      type: 'audio/wav',
      uri: 'file://' + this.state.fileloc,
    });

    let requestOptions1 = {
      method: 'POST',
      headers: myHeaders1,
      body: form,
    };

    fetch(
      'https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US',
      requestOptions1,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  checkStatus = () => {
    // var form = new FormData();
    // form.append("body",{
    //   name: 'test.wav',
    //   type: 'audio/wav',
    //   uri: 'file://' + this.state.fileloc,
    // });

    // var config = {
    //   headers: {
    //     "Ocp-Apim-Subscription-Key": this.state.id,
    //     "Host": "westus.stt.speech.microsoft.com",
    //     "Content-type": "audio/wav",
    //     "Accept": "application/json",
    //   }
    // }
    
    // axios.post("https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US",form,config).then(val => {
    //     console.log("in",val.data);
    // }).catch(e => console.log(e))

    var myHeaders = new Headers();
    myHeaders.append("Ocp-Apim-Subscription-Key", "b32ce6ab77e14591aac2646405775cdf");
    myHeaders.append("Host", "westus.stt.speech.microsoft.com");
    myHeaders.append("Content-Type", "audio/wav");
    myHeaders.append("Accept", "application/json");

    var file = "<file contents here>";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: file,
      redirect: 'follow'
    };

    fetch("https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }
  giveAttendance = async () => {
    // var file = await RNFS.readFile(this.state.fileloc, 'base64');
    console.log('s1', this.props.navigation.state.params.eid, this.state);
    var date = new Date().toLocaleTimeString();
    var form = new FormData();
    form.append('eid', this.props.navigation.state.params.eid);
    form.append('audio', {
      name: 'test.wav',
      type: 'audio/wav',
      uri: 'file://' + this.state.fileloc,
    });
    form.append('timestamp', date);
    form.append('lat', this.state.lat);
    form.append('long', this.state.long);

    axios
      .post('http://192.168.43.224:2000/appAudio', form)
      .then(res => {
        console.log(res.data);
        this.setState({result: res.data.result});
      })
      .catch(e => console.log(e));

    
  };

  renderSentence = () => {
    let arr = [
      'It is a long established fact that a reader will be distracted',
      'The readable content of a page when looking at its layout.',
      'Contrary to popular belief, Lorem Ipsum is not simply random text',
      'Thank you for your support, Lorem Ipsum is not simply random text',
      'The standard Lorem Ipsum passage is used since the 1500s',
      'It is a long established fact that a reader will be distracted',
      'The readable content of a page when looking at its layout.',
      'Contrary to popular belief, Lorem Ipsum is not simply random text',
      'Thank you for your support,a set of words that is complete in itself',
      'The standard Lorem Ipsum passage is used since the 1500s',
    ];
    let r = Math.floor(Math.random() * 10);
    console.log(arr[r],"in")
    this.setState({sentance: arr[r]});
  };

  componentDidMount() {
    this.renderSentence();
    AudioRecord.init(this.options);
    console.log('eid ', this.props.navigation.state.params.eid);
    this.setState({eid: this.props.navigation.state.params.eid});
  }

  renderResult = () => {
    if (this.state.result !== -1) {
      if (this.state.result === 1) return <Text>Attendance granted</Text>;
      else return <Text>Attendance not granted</Text>;
    }
    return null;
  };
  render() {
    // console.log("hey")
    return (
      <View style={styles.body}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Attendance', {})}>
            <Image style={styles.back} source={require('../assets/back.png')} />
          </TouchableOpacity>
          <View style={{marginLeft: 10, width: '50%'}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'beige',
                width: 400,
              }}>
              Record and Proceed
            </Text>
          </View>
        </View>

        <View style={styles.outer}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                color: 'beige',
                textAlign: 'center'
              }}>
              Repeat the following sentence {'\n'}
            </Text>
            <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  color: '#FF6347',
                  textAlign: 'center'
                }}> {this.state.sentance+"\n"}
            </Text>
          </View>

          <View style={styles.recordview}>
            <View style={styles.startbtn}>
              <TouchableOpacity
                disabled={this.state.recording}
                onPress={this.startreco}
                style={styles.addbutton1}>
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../assets/play-button.png')}
                />
              </TouchableOpacity>
            </View>

            {this.state.recording ? (
              <View>
                <Image
                  source={require('../assets/voice_loaderrr.gif')}
                  style={{height: 300, width: 300}}
                />
              </View>
            ) : null}

            <View style={styles.stopbtn}>
              <TouchableOpacity
                disabled={!this.state.recording}
                onPress={this.stopreco}
                style={styles.addbutton1}>
                <Image
                  style={{width: 45, height: 45}}
                  source={require('../assets/square.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text>{this.state.toPrint}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={this.giveAttendance}
              style={styles.proceed}>
              <Text style={{color: '#FF6347'}}>Proceed</Text>
            </TouchableOpacity>
          </View>
          <View>{this.renderResult()}</View>
        </View>
      </View>
    );
  }
}

const styles = {
  parent: {
    flexDirection: 'column',
    width: 500,
    height: 500,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    height: 100,
    borderRadius: 10,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    // borderWidth:1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.9,
    elevation: 6,
    backgroundColor: '#383838',
  },
  back: {
    marginLeft: 5,
    height: 35,
    width: 35,
  },
  outer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  addbutton1: {
    width: Dimensions.get('window').width * 0.2,
    height: 50,
    // backgroundColor:"#000",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    // shadowColor:'black',
    // shadowOffset: {width: 10, height: 10},
    // shadowOpacity: 1,
    // elevation: 5,
    // shadowRadius:6
  },
  proceed: {
    width: Dimensions.get('window').width * 0.4,
    height: 50,
    backgroundColor: '#383838',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 6,

    width: Dimensions.get('window').width * 0.65,
    height: 60,
    backgroundColor: '#383838',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    borderRadius: 10,
    color: '#FF6347',
    textAlign: 'center',
  },

  startbtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopbtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};
