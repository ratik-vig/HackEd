import React from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import Colors from '../constants/Colors'
import {FontAwesome5} from '@expo/vector-icons'
import Loader from '../components/Loader'

class TestList extends React.Component{
    render(){
        
        const {loading, data, navigation} = this.props
        console.log(loading)
        return(
            <View style={{flex: 1}}>
                 { loading && <Loader />}
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                {data.map((test, idx) => (
                    <View key={idx} style={styles.card}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.inputGroup}>
                                <Text style={{...styles.textBlackCenter, ...styles.textBold}}>Test ID</Text>
                                <Text style={styles.textBlackCenter}>{test.id}</Text>
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={{...styles.textBlackCenter, ...styles.textBold}}>Number of Questions</Text>
                                <Text style={styles.textBlackCenter}>{test.no_questions}</Text>
                            </View>
                        </View>
                        
                        
                        <View style={styles.actions}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate('Upload', {id: test.id})
                            }}>
                                <View style={styles.btns}>
                                    <Text style={styles.textWhite}>Evaluate</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate('Test', {id: test.id, numQuestions: test.no_questions})
                            }}>
                                <View style={styles.btns}>
                                    <Text style={styles.textWhite}>More</Text>
                                    <FontAwesome5 name={'chevron-right'} color={Colors.secondary} style={{marginLeft: 4}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
           </View>
        )
    }
}

export default TestList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingBottom: 16,
    },
    card: {
        width: Dimensions.get('screen').width * 0.9,
        padding: 16,
        backgroundColor: Colors.secondary,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 16,

    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 16
    },
    btns: {
        backgroundColor: Colors.primary,
        color: Colors.secondary,
        marginHorizontal: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textWhite: {
        color: Colors.secondary,
    },
    textBlackCenter: {
        color: '#000',
        textAlign: 'center'
    },
    textBold: {
        fontWeight: 'bold'
    },
    inputGroup: {
        marginHorizontal: 8
    }
})