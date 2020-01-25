'use strict';
import React from 'react';
import {Camera} from 'react-native-camera';
// import { Ionicons } from '@expo/vector-icons';
// import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';

// const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default class Toolbar extends React.Component {
  render() {
    return (
      <View style={styles.bottomToolbar}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {/* <View style={styles.alignCenter}>
            <Button title="flash" />
          </View> */}
          <View style={styles.alignCenter}>
            <Button onPress={this.props.onCapture} title="capture" />
          </View>
          <View style={styles.alignCenter}>
            <Button onPress={this.props.switchCam} title="Switch" />
          </View>
        </View>
      </View>
    );
  }
}

const {width: winWidth, height: winHeight} = Dimensions.get('window');

const styles = {
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF',
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: 'red',
    borderColor: 'transparent',
  },
};
