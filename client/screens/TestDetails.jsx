import React from 'react'
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import Globals from '../constants/Globals'
import {FontAwesome5, Feather} from '@expo/vector-icons'
import { Provider, Searchbar, DefaultTheme } from 'react-native-paper';
import {LineChart} from 'expo-chart-kit'
import Colors from '../constants/Colors'
import Loader from '../components/Loader'
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';


const chartConfig={
    backgroundColor: '#d35400',
    backgroundGradientFrom: '#d35400',
    backgroundGradientTo: '#d35400',
    decimalPlaces: 2, 
    color: () => `rgba(255, 255, 255, 0.8)`,
    style: {
        borderRadius: 16,
    }
}

class TestDetails extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data: [],
            loading: false,
            showModal: false,
            graphData: {
                labels: ['0-5', '6-10', '11-15', '16-20', '21-25', '26-30'],
                datasets: [{
                    data: [ 0,0,0,0,0,0 ]
                }]
            },
            searchId: '',
            filteredTests: [],
            selectedTest: {}
        }
    }
    
    async componentDidMount(){
        await this.fetchData()
    }

    fetchData = () => {
        this.setState({loading: true})
        fetch(`${Globals.URL}/get_results?test_id=${this.props.route.params.id}`, {
            method: 'GET',
        }).then(response => response.json())
        .then(response => {
            this.setState({data: response, loading: false, filteredTests: response})
            this.formatGraphData()
        })
        .catch(err => {
            console.log(err)
            this.setState({loading: false})
        })
    }

    handlePress = () => {
        this.setState({expanded: !this.state.expanded})
    }

    hideModal = () => {
        this.setState({showModal: false})
    }

    calculateAvgMarks = () => {
        let marks = 0
        this.state.data.map(obj => {
            marks += obj.marks
        })
        return (marks/(this.state.data.length)).toFixed(1)
    }

    calculateHighestMarks = () => {
        let high = 0
        this.state.data.map(obj => {
            if(obj.marks > high) high = obj.marks
        })
        return high
    }

    formatGraphData = () => {
        const {data} = this.state
        const {route} = this.props
        const labels = route.params.numQuestions === 20 ? ['0-4','5-8','9-12','13-16', '17-20']:['0-5', '6-10', '11-15', '16-20', '21-25', '26-30']
        let numStudents = route.params.numQuestions === 20 ? new Array(5).fill(0) : new Array(6).fill(0)
        const datasets = []
        let graphData =  {}

        data.map(obj => {
            if(route.params.numQuestions === 20){
                if(obj.marks <= 4) numStudents[0]++
                else if(obj.marks <= 8) numStudents[1]++
                else if(obj.marks <= 12) numStudents[2]++
                else if(obj.marks <= 16) numStudents[3]++
                else numStudents[4]++
            }else{
                if(obj.marks <= 5) numStudents[0]++
                else if(obj.marks <= 10) numStudents[1]++
                else if(obj.marks <= 15) numStudents[2]++
                else if(obj.marks <= 20) numStudents[3]++
                else if(obj.marks <= 25) numStudents[4]++
                else numStudents[5]++
            }
            
        })
        datasets.push({data: numStudents})
        graphData = {labels: labels, datasets: datasets}
        this.setState({graphData})
    }

    handleSearchIdChange = (text) => {
        this.setState({searchId: text}, () => {
            this.filterTests()
        })
    }

    filterTests = () => {
        const {id, data, searchId} = this.state
        if(id === '') this.setState({filteredTests: data})
        else{
            let tmp = []
            tmp = data.filter(obj => {
                return obj.enrollment_number.startsWith(searchId)
            })
            this.setState({filteredTests: tmp})
        }
    }

    selectTest = (test) => {
        this.setState({selectedTest: test, showModal: true})
    }

    render(){
        const {selectedTest, data} = this.state
        const {navigation, route} = this.props
        return(
            <Provider theme={{
                ...DefaultTheme,
                roundness: 2,
                colors: {
                    ...DefaultTheme.colors,
                    primary: Colors.primary,
                    secondary: Colors.secondary
                }
            }}>
            
            <View style={{flex: 1}}>

                <Modal hideModalContentWhileAnimating={true} isVisible={this.state.showModal} onBackdropPress={() => this.setState({showModal: false})}>
                    <View style={{backgroundColor: Colors.secondary, padding: 20, borderRadius: 5, height: '60%'}}>
                        <View>
                            <View style={{paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: Colors.grey}}>
                                <Text>Enrollment Number: {this.state.selectedTest.enrollment_number}</Text>
                                <Text>Marks Obtained: {this.state.selectedTest.marks}</Text>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} style={{height: '90%'}}>
                            {selectedTest.responses !== undefined && selectedTest.responses.map((answers, idx) => (
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 8, backgroundColor: Colors.primary, opacity: idx%2==0 ? 0.9:0.6}}>
                                    <Text>{answers.question}</Text>
                                    <Text>{answers.answer}</Text>
                                </View>
                            ))}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                
                {this.state.loading && <Loader />}
                {this.state.filteredTests.length === 0 ? 
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Feather name={'slash'} size={72} color={Colors.grey} />
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: Colors.grey, marginTop: 8}}>No OMR sheet uploaded for this test</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        navigation.goBack()
                    }}>
                    <View style={{...styles.btn, flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome5 name={'arrow-left'} color={Colors.secondary}/>
                        <Text style={{color: Colors.secondary, marginLeft: 4}}>Go Back</Text>
                    </View>
                    </TouchableOpacity>
                </View>:
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Test ID: {route.params.id}</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                    navigation.goBack()
                                }}>
                                <View style={styles.btn}>
                                    <FontAwesome5 name={'arrow-left'} color={Colors.secondary}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {this.state.graphData ? <LineChart
                            data={this.state.graphData}
                            width={Dimensions.get('screen').width * 0.98}
                            height={Dimensions.get('screen').height < 400 ? Dimensions.get('screen').height * 0.2 : Dimensions.get('screen').height * 0.25}
                            chartConfig={chartConfig}
                            style={{
                                marginTop: 8,
                                borderRadius: 16,
                            }}
                            bezier
                        />:null}
                        <View style={styles.detailsContainer}>
                            <View>
                                <Text style={{...styles.textBlackCenter, ...styles.textBold}}>Total Students</Text>
                                <Text style={styles.textBlackCenter}>{this.state.data.length}</Text>
                            </View>
                            <View>
                                <Text style={{...styles.textBlackCenter, ...styles.textBold}}>Average Marks</Text>
                                <Text style={styles.textBlackCenter}>{this.calculateAvgMarks()}</Text>
                            </View>
                            <View>
                                <Text style={{...styles.textBlackCenter, ...styles.textBold}}>Highest marks</Text>
                                <Text style={styles.textBlackCenter}>{this.calculateHighestMarks()}</Text>
                            </View>
                    
                        </View>
                        <Searchbar 
                            placeholder={'Search by Enrollment Number'}
                            style={{
                                width: Dimensions.get('screen').width * 0.95,
                                marginTop: 16,
                                backgroundColor: Colors.secondary
                            }}
                            value={this.state.searchId}
                            onChangeText={this.handleSearchIdChange}
                        />
                        {this.state.filteredTests.length === 0 && !this.state.loading? 
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Feather name={'slash'} size={72} color={Colors.grey} />
                                <Text style={{color: Colors.grey}}>No result</Text>
                            </View>:
                        <ScrollView style={styles.resultContainer} showsVerticalScrollIndicator={false}>
                            {this.state.filteredTests.map((obj, idx) => (
                                <TouchableOpacity key={idx} active={0.7} style={styles.listItem} onPress={() => this.selectTest(obj)}>
                                    <View>
                                        <Text style={{...styles.textBlackCenter, ...styles.textBold}}>Enrollment Number</Text>
                                        <Text style={styles.textBlackCenter}>{obj.enrollment_number}</Text>
                                    </View>
                                    <View>
                                        <Text style={{...styles.textBlackCenter, ...styles.textBold}}>Marks</Text>
                                        <Text style={styles.textBlackCenter}>{obj.marks}</Text>
                                    </View>
                                    <View>
                                        <FontAwesome5 name={'plus'} color={Colors.primary} />
                                    </View>

                                </TouchableOpacity>
                                
                            ))}
                            
                        </ScrollView>}
                    </View>}
            
            </View>
            </Provider>
        )
    }
}

export default TestDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Dimensions.get('screen').width <400 ? 48 : 64,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width * 0.90,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16
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
    },
    textBlackCenter: {
        color: '#000',
        textAlign: 'center',
        fontSize: Dimensions.get('screen').width <400 ? 12 : 14
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('screen').width <400 ? 12 : 14
    },

    detailsContainer: {
        width: Dimensions.get('screen').width * 0.95,
        backgroundColor: Colors.secondary,
        elevation: 5,
        borderRadius: 5,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 12
    },
    
    listItem: {
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1,
        width: Dimensions.get('screen').width * 0.9,
        paddingVertical: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})