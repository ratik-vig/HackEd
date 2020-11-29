import React from 'react'
import{View, Text, TextInput, Image, Button, Alert, TouchableOpacity} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Globals from '../constants/Globals'
import Colors from '../constants/Colors'
import Loader from '../components/Loader' 

class CameraView extends React.Component{
    constructor(props){
        super(props)
        this.state={
            testId: '',
            image: '',
            loading: false
        }
    }

    componentDidMount() {
        console.log(this.props)
        if(this.props.route.params !== undefined){
            this.setState({testId: this.props.route.params.id.toString()})
        }
        else if(this.props.testId !== undefined) this.setState({testId: this.props.testId})
    }

    clickImage = async () => {
        const img = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
            base64: true
          })
        this.setState({image: img.uri})
    }

    uploadImage = () => {
        if(this.state.image === ''){
            Alert.alert('','Click an image for evaluation', [{text: 'Okay'}])
            return;
        }
        this.setState({loading: true})
        var photo = {
            uri: this.state.image,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        
        var body = new FormData();
        body.append('file', photo);
        body.append('test_id', this.state.testId)
        console.log(body)
          fetch(`${Globals.URL}/upload`,{
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: body
          }).then(response => response.json())
          .then(response => {
            console.log(response)
            this.setState({loading: false})
            if(response.isSuccessful){
                Alert.alert('Student Result', `Test ID: ${this.state.testId}\nEnrollment Number: ${response.enrollment_number}\nMarks obtained: ${response.marks}`, [{text: 'Okay'}])
            }else{
                Alert.alert('Student Result', `${response.message}`, [{text: 'Okay'}])
            }
            
          })
          .catch(error => {
            console.log(error)
            this.setState({loading: false})
          })
    }

    handleIdChange = (testId) => {
        this.setState({testId})
    }

    render(){
        const {testId, image, loading} = this.state
        return(
           
            <View style={{ flex: 1, zIndex: 9}}>
                    { loading && <Loader /> }
            
            <View style={styles.container}>
                <View style={styles.inputGroup}>
                    <Text style={styles.testId}>Test ID: </Text>
                    <TextInput style={styles.testId} onChangeText={this.handleIdChange} value={testId} placeholder={'Enter Test ID'}/>
                </View>
                <View style={styles.imagePreview}>
                {!image ? <Text>No Image to preview</Text>:
                <Image style={styles.image} source={{uri: image}}></Image>}
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity activeOpacity={0.7} onPress={this.clickImage}>
                        <View style={styles.btns}>
                            <Text style={styles.textWhite}>{'Click image'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress = {this.uploadImage}>
                        <View style={styles.btns}>
                            <Text style={styles.textWhite}>{'Evaluate'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* <Button title='click image' onPress={this.clickImage}/>
                <Button title='evaluate' onPress = {this.uploadImage} /> */}
            </View>
            </View>
        )
    }
}

export default CameraView

const styles = {
    container: { alignItems: 'center'},
    imagePreview: {
      width: '95%',
      height: 250,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    btns: {
        backgroundColor: Colors.primary,
        color: Colors.secondary,
        marginHorizontal: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5
    },
    textWhite: {
        color: Colors.secondary
    }, 
    actions:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    testId: {
        fontWeight: 'bold',
        fontSize: 16,
    }
  }