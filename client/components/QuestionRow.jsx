import React from 'react'
import {View, Button, StyleSheet, Text, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const QuestionRow = (props) => {
    const mapping = {0:'A',1:'B',2:'C',3:'D'}
    return(
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 'auto'}}>
            <Text style={{color: 'black'}}>{`Q${props.row+1}`}</Text>
            <View style={{flexDirection: 'row', marginLeft: 16}}>
                {props.questions.map((que, index) => {
                    return <TouchableOpacity key={props.row.toString()+index.toString()} onPress={() => props.selectOption( props.row, index)}><View style={que===1 ? styles.optBtnSelected:styles.optBtn} key={props.row.toString() + '1'} ><Text style={que===1 ? styles.btnTextSelected:styles.btnText}>{mapping[index]}</Text></View></TouchableOpacity>
                })}
                
            </View> 
        </View>
    )
} 
export default QuestionRow;

const styles = StyleSheet.create({
    optBtn: {
        width: Dimensions.get('screen').width <400 ? Dimensions.get('screen').width/8 : Dimensions.get('screen').width/7,
        height: Dimensions.get('screen').width < 400 ? Dimensions.get('screen').width/8 : Dimensions.get('screen').width/7,
        backgroundColor: '#f3f3f3',
        borderColor: '#d35400',
        borderWidth: 1,
        borderRadius: 50,
        marginHorizontal: 8,
        marginVertical: 4
    },
    optBtnSelected: {
        width: Dimensions.get('screen').width <400 ? Dimensions.get('screen').width/8 : Dimensions.get('screen').width/7,
        height: Dimensions.get('screen').width <400 ? Dimensions.get('screen').width/8 : Dimensions.get('screen').width/7,
        borderColor: '#d35400',
        backgroundColor: '#d35400',
        borderWidth: 1,
        borderRadius: 50,
        marginHorizontal: 8,
        marginVertical: 4
    },
    btnText: {
        textAlign: 'center',
        lineHeight: Dimensions.get('screen').width <400 ? Dimensions.get('screen').width/8 : Dimensions.get('screen').width/7,
        color: '#000'
    },
    btnTextSelected: {
        textAlign: 'center',
        lineHeight: Dimensions.get('screen').width <400 ? Dimensions.get('screen').width/8 : Dimensions.get('screen').width/7,       
        color: '#f3f3f3'
    },
    btnContainer: {
        marginHorizontal: 'auto'
    }
})