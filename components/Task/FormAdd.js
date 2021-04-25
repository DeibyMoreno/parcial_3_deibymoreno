import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { addDocumentWithoutId, getCurrentUser } from '../../utils/actions'

export default function FormAddTask({toastRef, navigation}) {
    const [nameTask, setNameTask] = useState('')
    const [errorNameTask, setErrorNameTask] = useState(false)
    const [loading, setLoading] = useState(false)

    const onChange = (val)=>{
        setNameTask(val);
    }

    const addTask = async()=>{
        setLoading(true);
        if(!validateData()){
            setLoading(false);
            return 
        }
        const user = await getCurrentUser();
        const task = {
            name : nameTask,
            createAt : new Date().toLocaleDateString(),
            user : user.uid
        }
        const responseAddDocument = await addDocumentWithoutId("tasks", task);
        setLoading(false)
        if(responseAddDocument.statusResponse){
            toastRef.current.show("Error al grabar el restaurante, por favor intente mas tarde.", 3000);
            return
        }
        
        setLoading(false);
        navigation.navigate("tasks")
    }
    const validateData= ()=>{
        setErrorNameTask("");
        let isValid = true;
        if(isEmpty(nameTask)){
            setErrorNameTask("Debes de ingresar nombre de la tarea");
            isValid = false;
        }
        return isValid;
    }
    return (
        <View style={styles.container}>
            <Input 
                containerStyle={styles.input}
                placeholder="Ingresa nombre de la tarea.."
                value={nameTask}
                onChangeText={(e)=>onChange(e)}
                errorMessage={errorNameTask}
                keyboardType='email-address'
            />
            <Button 
                title="Adicionar Tarea"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={()=>addTask()}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop: 30,
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
