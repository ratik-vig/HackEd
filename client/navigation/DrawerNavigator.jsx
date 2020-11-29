import * as React from 'react';
import { Button, View , Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home'
import Create from '../screens/Create'
import CameraView from '../screens/CameraView'
import Sidebar from '../components/Sidebar'
import {FontAwesome5} from '@expo/vector-icons'
import Globals from '../constants/Globals'

const Drawer = createDrawerNavigator()

class DrawerNavigator extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            loading: false,
            data: [],
            testId: ''
        }
    }

    refreshData = async() => {
        this.setState({loading: true})
        fetch(`${Globals.URL}`, {
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            this.setState({data: response, loading: false})
        }).catch(err => {
            console.log(err)
            this.setState({loading: false})
        })
    }

    

    render(){
        const {route} = this.props
        return(
                <Drawer.Navigator initialRouteName={'Home'} drawerContentOptions={{
                activeTintColor: '#f3f3f3',
                activeBackgroundColor: '#d35400',
                inactiveTintColor: '#d35400',
                inactiveBackgroundColor: '#f3f3f3',
                
              }}
              drawerContent={props => {
                return <Sidebar {...props} fName={route.params.fName} lName={route.params.lName} />
              }}
              screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#d35400'
                },
                headerTintColor: '#f3f3f3'
            }}>
                    <Drawer.Screen name={'Home'} options={{
                        
                        drawerIcon: ({color}) => (
                            <FontAwesome5 name={'home'} size={18} style={{color: color}} />
                        )
                    }}>
                        {props => <Home {...props} loading = {this.state.loading} data={this.state.data} refreshData={this.refreshData}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name={'CreateAnsKey'} options={{
                        title: 'Create Answer Key',
                        unmountOnBlur: true,
                        drawerLabel: ({color}) => (
                            <Text style={{color}}>Create Answer Key</Text>
                        ),
                        drawerIcon: ({color}) => (
                            <FontAwesome5 name={'plus'} size={18} style={{color: color}} />
                        )
                    }}>
                        {props => <Create {...props} refreshData={this.refreshData} />}
                    </Drawer.Screen>
                    <Drawer.Screen name={'Upload'} options={{
                        title: 'Upload OMR Sheet',
                        unmountOnBlur: true,
                        drawerLabel: ({color}) => (
                            <Text style={{color}}>Upload OMR Sheet</Text>
                        ),
                        drawerIcon: ({color}) => (
                            <FontAwesome5 name={'camera'} size={18} style={{color: color}} />
                        )
                    }}>
                        {props => <CameraView {...props} />}
                    </Drawer.Screen>
                </Drawer.Navigator>
             
            
        )
    }
}

export default DrawerNavigator