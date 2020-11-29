import React from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, Alert, Platform, Keyboard, ActivityIndicator} from "react-native";
import {StatusBar} from "expo-status-bar";
import Colors from '../constants/Colors'
import Globals from '../constants/Globals'
import { ScrollView } from 'react-native-gesture-handler';


class SignupScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            loading: false
        }
    }

    handleFname = (fname) => {
        this.setState({firstName: fname})
    }

    handleLname = (lname) => {
        this.setState({lastName: lname})
    }

    handleEmail = (email) => {
        this.setState({email})
    }

    handlePassword = (password) => {
        this.setState({password}, () => console.log(this.state.password))
    }

    handleConfirmPassword = (confirmPassword) => {
        this.setState({confirmPassword})
    }

    signupHandler = () => {
        this.setState({loading: true})
        Keyboard.dismiss()
        const {fname, lname, email, password, confirmPassword} = this.state;
        if(fname === '' || lname==='', email===''|| password===''||confirmPassword===''){
            Alert.alert('','All fields are required to continue', [{text: 'Okay'}])
            return;
        }
        if(password !== confirmPassword){
            Alert.alert('','Password do not match', [{text: 'Okay'}])
            return;
        }
        const body = new FormData()
        body.append('first_name', fname)
        body.append('last_name', lname)
        body.append('email', email)
        body.append('password', password)
        fetch(`${Globals.URL}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
              },
            body: body
        }).then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.status === 200){
                Alert.alert('','Signup successful. Redirecting to login.')
                setTimeout(() => {
                    this.props.navigation.replace('Login')
                }, 1000)
                
            }else{
                Alert.alert('login', response.message, [{text: 'Okay'}])
            }
            this.setState({loading: false})
        })
        .catch(err => console.log(err)) 
    }

    render(){
        const {fname, lname, email, password, confirmPassword} = this.state
        const {navigation} = this.props;
        return(
            <View style={styles.container}>
                {this.state.loading && (
                <View style={{position: 'absolute',
                    width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 1}}>
                    <View style={styles.overlay} />
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size={'large'} color={Colors.primary} />
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 8}}>Loading</Text>
                    </View>
                </View>)}
                <StatusBar style={'auto'} />
                <View style={styles.header}>
                    <Text style={styles.logo}>EduvateOMR</Text>
                    <Text style={styles.subText}>Create your account</Text>
                </View>
                <ScrollView style={styles.form} showsVerticalScrollIndicator={false} >
                    <View style={styles.formWrapper}>
                        <View style={styles.inputGroup}>
                            <Text>First Name</Text>
                            <TextInput style={styles.input} placeholder={'Enter first name'} value={fname} onChangeText={this.handleFname} returnKeyType="next" onSubmitEditing={() => { this.secondTextInput.focus(); }} blurOnSubmit={false}/>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text>Last Name</Text>
                            <TextInput ref={(input) => { this.secondTextInput = input }} style={styles.input} placeholder={'Enter last name'} value={lname} onChangeText={this.handleLname} returnKeyType="next" onSubmitEditing={() => { this.thirdTextInput.focus(); }} blurOnSubmit={false}/>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text>Email</Text>
                            <TextInput ref={(input) => { this.thirdTextInput = input }} style={styles.input} placeholder={'Enter email'} autoCapitalize={'none'} value={email} onChangeText={this.handleEmail} returnKeyType="next" onSubmitEditing={() => { this.fourthTextInput.focus(); }} blurOnSubmit={false}/>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text>Password</Text>
                            <TextInput ref={(input) => { this.fourthTextInput = input }} style={styles.input} placeholder={'Enter passsword'} autoCapitalize={'none'} secureTextEntry={true} value={password} onChangeText={this.handlePassword} returnKeyType="next" onSubmitEditing={() => { this.fifthTextInput.focus(); }} blurOnSubmit={false}/>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text>Confirm password</Text>
                            <TextInput ref={(input) => { this.fifthTextInput = input }} style={styles.input} placeholder={'Confirm Password'} autoCapitalize={'none'} secureTextEntry={true} value={confirmPassword} onChangeText={this.handleConfirmPassword}/>
                        </View>
                        <View style={styles.formActions}>
                            <TouchableOpacity style={styles.signupBtn} activeOpacity={0.7} onPress={this.signupHandler}>
                                <View>
                                    <Text style={styles.textSecondary}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.7} onPress={() => {
                                navigation.replace('Login')
                            }}>
                                <View>
                                    <Text style={styles.textPrimary}>Log In</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('screen').height > 768 ? Dimensions.get('screen').height * 0.33 : Dimensions.get('screen').height * 0.25,
    },
    logo: {
        color: Colors.secondary,
        fontSize: 48,
        fontFamily: 'poppins'
    },
    subText: {
        fontSize: 18,
        color: Colors.secondary,
        fontFamily: 'poppins'
    },
    form: {
        height: Dimensions.get('screen').height > 768 ? Dimensions.get('screen').height * 0.67 : Dimensions.get('screen').height * 0.75,
        backgroundColor: Colors.secondary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 32,
    },
    formWrapper: {
        flex: 1,
    },
    inputGroup: {
        marginTop: Dimensions.get('screen').height > 768 ? 24 : 12,
        borderBottomWidth: 1,
        borderColor: Colors.grey,
    },
    input: {
        marginTop: Platform.android ? 0:8
    },
    formActions: {
        marginVertical: Dimensions.get('screen').height > 768 ? 24 : 16,
    },
    signupBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtn: {
        backgroundColor: Colors.secondary,
        borderRadius: 20,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    textPrimary: {
        color: Colors.primary
    },
    textSecondary: {
        color: Colors.secondary
    },
    overlay: {
        position: 'absolute',
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        opacity: 0.8,
        zIndex: 1,
        
    },
    loaderContainer: {
        backgroundColor: Colors.secondary,
        width: Dimensions.get('screen').width * 0.8,
        height: Dimensions.get('screen').height/4,
        borderRadius: 10,
        maxHeight: 200,
        zIndex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
