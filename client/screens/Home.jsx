import React from 'react'
import {View, Text, StyleSheet, Platform, Dimensions, Button} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import  Colors  from '../constants/Colors'
import Globals from '../constants/Globals'
import Loader from '../components/Loader'
import { createStackNavigator } from '@react-navigation/stack';
import TestList from '../components/TestList'
import TestDetails from './TestDetails'

class Home extends React.Component{
    constructor(props){
        super(props)
        
    }

    async componentDidMount() {
        await this.props.refreshData()
        // this.setState({loading: true})
        // fetch(`${Globals.URL}`, {
        //     method: 'GET'
        // }).then(response => response.json())
        // .then(response => {
        //     this.setState({data: response, loading: false})
        // }).catch(err => {
        //     console.log(err)
        //     this.setState({loading: false})
        // })
    }

    render(){
        const Stack = createStackNavigator()
        const {data, loading, navigation} = this.props
        return(
            <Stack.Navigator initialRouteName={'Tests'} screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name={'Tests'}>
                    {props => <TestList {...props} data={data} loading={loading}/>}
                </Stack.Screen>
            
            </Stack.Navigator>
            
        )
    }
}

export default Home

const styles = StyleSheet.create({
    
})