import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNavigator from './navigation/DrawerNavigator';
import MainNavigator from './navigation/MainNavigator';
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from './screens/SignupScreen';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      loading: true
    }
  }

  fetchFonts = () => {
    return Font.loadAsync({
      'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    })
  }

  render() {
    const {loading} = this.state
    if(loading){
      return <AppLoading startAsync={this.fetchFonts} onFinish={() => this.setState({loading: false})} />
    }
    return (
      <MainNavigator />
    );
  }
}

export default App;

