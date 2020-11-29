import React from 'react'

import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'

const Sidebar = (props) => {
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.userImg} source={require('../assets/user.jpg')} />
                <Text style={styles.userName}>{props.fName + ' '+ props.lName}</Text>
            </View>
            <View style={styles.body}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props}>
                        
                    </DrawerItemList>
                    
                    <TouchableOpacity style={styles.logoutBtn} active={0.7} onPress = {() => props.navigation.replace('Login')} >
                        <View>
                            <Text style={styles.textSecondary}>Log Out</Text>
                        </View>
                    </TouchableOpacity>
                
                    
                </DrawerContentScrollView>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    header: {
        backgroundColor: '#d35400',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 5
    },
    userImg: {
        width: 100,
        height: 100,
        marginTop: 32,
        borderRadius: 50
    },
    userName: {
        color: '#f3f3f3',
        marginTop: 20,
        fontSize: 22
    },
    logoutBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
        marginTop: 16,
        width: '95%',
        marginLeft: 8
    },
    textSecondary: {
        color: Colors.secondary
    }
})
export default Sidebar;