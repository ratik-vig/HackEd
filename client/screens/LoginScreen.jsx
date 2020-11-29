import React from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, Alert, Platform, ActivityIndicator, Keyboard} from "react-native";
import {StatusBar} from "expo-status-bar";
import Colors from '../constants/Colors'
import Globals from '../constants/Globals'

class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    handleEmail = (email) => {
        this.setState({email}, () => console.log(this.state.email))
    }

    handlePassword = (password) => {
        this.setState({password}, () => console.log(this.state.password))
    }

    loginHandler = () => {
        Keyboard.dismiss()
        this.setState({loading: true})
        const body = new FormData()
        body.append('email', this.state.email)
        body.append('password', this.state.password)
        fetch(`${Globals.URL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
              },
            body: body
        }).then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.status === 200){
                this.props.navigation.replace('Drawer', {fName: response.first_name, lName: response.last_name})
            }else{
                Alert.alert('login', response.message, [{text: 'Okay'}])
            }
            this.setState({loading: false})
        })
        .catch(err => console.log(err))
        
    }

    render(){
        const {email, password} = this.state;
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
                    <Text style={styles.subText}>Please Log in to continue</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.formWrapper}>
                        <View style={styles.inputGroup}>
                            <Text>Email</Text>
                            <TextInput style={styles.input} placeholder={'Enter email'} value={email} autoCapitalize={'none'} onChangeText={this.handleEmail}/>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text>Password</Text>
                            <TextInput style={styles.input} placeholder={'Enter passsword'} value={password} autoCapitalize={'none'} secureTextEntry={true} onChangeText={this.handlePassword}/>
                        </View>
                        <View style={styles.formActions}>
                            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.7} onPress={this.loginHandler}>
                                <View>
                                    <Text style={styles.textSecondary}>Log In</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.signupBtn} activeOpacity={0.7} onPress={() => {
                                navigation.push('Signup')
                            }}>
                                <View>
                                    <Text style={styles.textPrimary}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default LoginScreen

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
        flex: 1
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
    loginBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupBtn: {
        backgroundColor: Colors.secondary,
        borderRadius: 20,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
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
