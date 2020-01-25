import React, {Component} from 'react';
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
  Image,
} from 'react-native';

export default class Attendance extends Component {
  state = {
    attended: null,
  };

  renderAttended = () => {
    return (
      <View style={styles.attend}>
        <Image style={styles.tick} source={require('../assets/correct.png')} />
        <Text style={{fontSize: 30, fontWeight: 'bold', width: '100%'}}>
          {' '}
          Attendance recorded{' '}
        </Text>
      </View>
    );
  };

  handleRoute = val => {
    this.props.navigation.navigate(val, {
      eid: this.props.navigation.state.params.eid,
    });
  };

  renderToAttend = () => {
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <View style={styles.voicebtn}>
          <TouchableOpacity
            onPress={() => this.handleRoute('Audiorec')}
            style={styles.addbutton1}>
            <Text style={{color: '#FF6347'}}>Voice</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={styles.facebtn}>
          <TouchableOpacity
            onPress={() => this.handleRoute('Pic')}
            style={styles.addbutton1}>
            <Text style={{color: '#FF6347'}}>Face</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  componentDidMount() {
    if (this.props.navigation.state) {
      let obj = this.props.navigation.state;
      this.setState({attended: obj.params.val});
    }
  }
  render() {
    return (
      <View style={styles.body}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Image style={styles.back} source={require('../assets/back.png')} />
          </TouchableOpacity>
          <View style={{marginLeft: 10, width: '50%'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: 'beige'}}>
              Welcome
            </Text>
          </View>
        </View>
        {this.state.attended ? this.renderAttended() : this.renderToAttend()}
      </View>
    );
  }
}

const styles = {
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
    color: 'beige',
  },
  back: {
    marginLeft: 5,
    height: 35,
    width: 35,
  },
  tick: {
    height: 60,
    width: 60,
    marginBottom: 10,
  },
  attend: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
  voicebtn: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '8%',
  },
  facebtn: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '15%',
  },
  addbutton1: {
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
  line: {
    width: Dimensions.get('window').width * 0.6,
    height: 2,
    borderTopWidth: 1,
    borderColor: '#FF6347',
  },
};
