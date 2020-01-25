import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {RNCamera} from 'react-native-camera';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Geolocation from 'react-native-geolocation-service';

import Toolbar from './toolbar';

export default class Pic extends PureComponent {
  camera = null;

  state = {
    path: null,
    cam: 'front',
    lat: 0.0,
    long: 0.0,
  };

  async componentDidMount() {
    console.log('Phoyo');
  }

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

  componentWillMount() {
    this.getLocation();
  }

  onCapture = async () => {
    if (this.camera) {
      const options = {quality: 0.2, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log('hello', data.uri);
      console.log(RNCamera.Constants);
      this.setState({path: data.uri});
      // var file = await RNFS.readFile(this.state.path, 'base64');
      var date = new Date().toLocaleTimeString();
      var form = new FormData();
      form.append('image', {
        name: 'test.jpg',
        type: 'image/jpg',
        uri: data.uri,
      });
      form.append('eid', this.props.navigation.state.params.eid);
      form.append('timestamp', date);
      form.append('lat', this.state.lat);
      form.append('long', this.state.long);
      console.log('s1', this.state);

      axios
        .post('http://192.168.42.60:2000/appImage', form)
        .then(res => {
          console.log(res);
        })
        .catch(e => console.log(e));
    }
    // this.props.navigation.navigate('Attendance');
    // console.log(
    //   PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA),
    // );
  };

  switchCam = () => {
    console.log(this.state.cam);
    if (this.state.cam === 'front') this.setState({cam: 'back'});
    else this.setState({cam: 'front'});
  };

  renderCam = () => {
    return (
      <React.Fragment>
        <View>
          <RNCamera
            ref={camera => (this.camera = camera)}
            style={styles.preview}
            type={RNCamera.Constants.Type[this.state.cam]}
            flashMode={RNCamera.Constants.FlashMode.auto}
          />
        </View>
        <Toolbar onCapture={this.onCapture} switchCam={this.switchCam} />
      </React.Fragment>
    );
  };

  // renderImg = () => {
  //   return (
  //     <React.Fragment>
  //       <Image source={{uri: this.state.path}} style={styles.preview} />
  //       <Text style={styles.cancel} onPress={() => this.setState({path: null})}>
  //         Cancel
  //       </Text>
  //     </React.Fragment>
  //   );
  // };

  render() {
    return <View style={styles.preview}>{this.renderCam()}</View>;
  }
}

const {width: winWidth, height: winHeight} = Dimensions.get('window');
const styles = {
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'blue',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#000',
  // },
  // preview: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // capture: {
  //   flex: 0,
  //   backgroundColor: '#fff',
  //   borderRadius: 5,
  //   padding: 15,
  //   paddingHorizontal: 20,
  //   alignSelf: 'center',
  //   margin: 20,
  // },
};
