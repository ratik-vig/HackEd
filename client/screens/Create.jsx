import React from 'react'
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert} from 'react-native'
import QuestionRow from '../components/QuestionRow'
import {Picker} from '@react-native-community/picker';
import Globals from '../constants/Globals';
import Loader from '../components/Loader'
import Colors from '../constants/Colors';

const answersMapping = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd'
}

class Create extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            testId: null,
            numQuestions: 20,
            questions: [],
            loading: false
        }
    }

    componentDidMount() {
        this.updateQuestions()
    }

    updateQuestions = () => {
        const qs = []
        for(let i = 0; i<this.state.numQuestions; i++){
                    qs[i] = new Array(4)
                  }
                  for (let i = 0; i < this.state.numQuestions; i++) { 
                    for (let j = 0; j < 4; j++) { 
                        
                         qs[i][j] = 0; 
                    } 
                }
        this.setState({questions: qs})
    }

    selectOption = (row, col) => {
        const tmp = this.state.questions
        if(tmp[row][col] === 0) tmp[row][col] = 1
        else tmp[row][col] = 0
        this.setState({questions: tmp})
    }

    checkAllMarked = () => {
        const {questions} = this.state
        for(let i=0;i<questions.length;i++){
            if(questions[i][0] === 0 && questions[i][1] === 0 && questions[i][2] === 0 && questions[i][3] === 0) return false
        }
        return true;
    }

    saveKey = () => {
        this.setState({loading: true})
        if(!this.checkAllMarked()){
            Alert.alert('','Please mark all answers to save', [{text: 'Okay'}])
            this.setState({loading: false})
            return;
        }
        const key = []
        let qno = 0
        for(let row=0;row<this.state.questions.length; row++){
            qno++
            let answers = ''
            for(let col=0;col<4;col++){
                if(this.state.questions[row][col] === 1) answers += answersMapping[col+1]
            }
            key.push({question: qno, answer: answers})
        }
        
        const data = {
            id: this.state.testId,
            answers: JSON.stringify(key),
            status: 'False',
            no_questions: this.state.numQuestions
        }

        
        let options = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            method: 'POST'
          };
        
          options.body = new FormData();
          for (let key in data) {
            options.body.append(key, data[key]);
          }

        fetch(`${Globals.URL}/create_test`, options).then(response => response.json())
        .then(response => {
            this.props.refreshData()
            this.setState({loading: false})
            this.props.navigation.navigate('Home')
        })
        .catch(error => this.setState({loading: false}))
    }


    render(){
        const {loading, testId} = this.state
        return(
            <View style={{flex: 1}}>
                {loading && <Loader />}
                
            <ScrollView showsVerticalScrollIndicator ={false} style = {styles.container}>
                        
                         <View style={styles.group}>
                            <Text>Test ID</Text>
                            <TextInput placeholder='Enter Test ID' keyboardType='number-pad' returnKeyType='done' onSubmitEditing={(event) => {
                                this.setState({testId: event.nativeEvent.text})
                            }}></TextInput>
                            {testId && <View style={styles.group}>
                                    <Text>Select number of questions</Text>
                                    <Picker
                                        selectedValue={this.state.numQuestions}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({numQuestions: itemValue}, () => this.updateQuestions())
                                        }>
                                        <Picker.Item label="20" value={20} />
                                        <Picker.Item label="30" value={30} />
                                    </Picker>
                                    
                                </View>}
                                </View>
                            {this.state.testId && this.state.numQuestions && 
                                <View style={{marginTop: 16, alignItems: 'center'}}>
            
                                    {this.state.questions.map((question, index) => {
                                        return <QuestionRow key={index} questions={question} row={index} selectOption={this.selectOption} />
                                    })}
                                </View>}
                                {testId && 
                                    <TouchableOpacity activeOpacity={0.7} onPress={this.saveKey}>
                                        <View style={styles.btn}>
                                            <Text style={styles.textWhite}>Save</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                    </ScrollView>
                    </View>
        )
    }
}

export default Create

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 32,
        marginVertical: 32
    },
    group: {
        borderBottomWidth: 1,
        borderBottomColor: '#a8a8a8'
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: Colors.primary,
        borderRadius: 5,
        marginVertical: 16
    },
    textWhite: {
        color: Colors.secondary,
        textAlign: 'center'
    }
})