import React from 'react'
import {View, ActivityIndicator, StyleSheet, Text, Dimensions} from 'react-native'
import Colors from '../constants/Colors'

const Loader = () => {
    return(
        <View style={{
            position: 'absolute',
            width: '100%', 
            height: '100%', 
            alignItems: 'center', 
            justifyContent: 'center', 
            elevation: 6
        }}>
            <View style={styles.overlay} />
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={'large'} color={Colors.primary} />
                <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 8}}>Loading</Text>
            </View>
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        backgroundColor: '#000',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        opacity: 0.8,
    },
    loaderContainer: {
        backgroundColor: Colors.secondary,
        width: Dimensions.get('screen').width * 0.8,
        height: Dimensions.get('screen').height/4,
        borderRadius: 10,
        maxHeight: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
})