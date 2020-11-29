import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DrawerNavigator from './DrawerNavigator'
import { StatusBar } from 'expo-status-bar';
import TestDetails from '../screens/TestDetails';

class MainNavigator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render(){
        const Stack = createStackNavigator()
        return(
            <NavigationContainer>
                <StatusBar style={'auto'} />
                <Stack.Navigator initialRouteName={'Login'} screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name={'Login'} component={LoginScreen} />
                    <Stack.Screen name={'Signup'} component={SignupScreen} />
                    <Stack.Screen name={'Drawer'} component={DrawerNavigator} />
                    <Stack.Screen name={'Test'} component={TestDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default MainNavigator