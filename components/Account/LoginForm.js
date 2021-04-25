import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { signInWithEmailAndPassword } from '../../utils/actions'
import {useNavigation} from '@react-navigation/native'
import { validateEmail } from '../../utils/helpers'
import { isEmpty, size } from 'lodash'
const defaultFormValues = ()=>{
    return {
        email : '',
        pass : ''
    }
}
export default function LoginForm() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const onChange = (val, name)=>{
        setFormData({
            ...formData,
            [name] : val
        })
    }
    const doLogin = async ()=>{
        if(!validateData()){
            return;
        }
        const result = await signInWithEmailAndPassword(formData)
        if(!result.statusResponse){
            setErrorEmail(result.error);
            return;
        }
        navigation.navigate("tasks");
    }
    const validateData= ()=>{
        setErrorEmail("");
        setErrorPass("");
        let isValid = true;
        if(!validateEmail(formData.email)){
            setErrorEmail("Debes de ingresar un email válido");
            isValid = false;
        }

        if(isEmpty(formData.pass)){
            setErrorPass("Debes de ingresar tu contraseña");
            isValid = false;
        }
        return isValid;
    }
    return (
        <View style={styles.container}>
            <Input 
                containerStyle={styles.input}
                placeholder="Ingresa tu email.."
                value={formData.email}
                onChangeText={(e)=>onChange(e, 'email')}
                errorMessage={errorEmail}
                keyboardType='email-address'
            />
            <Input 
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña.."
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon 
                        type='material-community'
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.icon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
                value={formData.pass}
                onChangeText={(e)=>onChange(e, 'pass')}
                errorMessage={errorPass}
            />
            <Button 
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={()=>doLogin()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop: 30
    },
    input : {
        width: '100%'
    },
    btn : {
        backgroundColor : '#442484'
    },
    icon:{
        color:'#c1c1c1'
    }
})
