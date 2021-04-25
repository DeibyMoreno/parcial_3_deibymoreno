import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { deleteDocument, updateDocument } from '../../utils/actions'
import Modal from '../Modal'

export default function FormAction({toastRef, setLoading, navigation, task}) {
    const [nameTask, setNameTask] = useState('')
    const [errorNameTask, setErrorNameTask] = useState('')
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        (()=>{
            setNameTask(task.name);
        })()
    }, [])

    const onChange = (val)=>{
        setNameTask(val);
    }

    const updateTask = async()=>{
        setLoadingUpdate(true);
        if(!validateData()){
            return
        }
        const updateTask = {
            name : nameTask
        }
        const response = await updateDocument("tasks", task.id,updateTask);
        //setLoading(false)
        if(!response.statusResponse){
            toastRef.current.show("Error al actualizar la tarea, por favor intente mas tarde.", 3000);
            return
        }
        navigation.navigate("tasks")
    }
    const deleteTask = async()=>{
        setLoadingDelete(true);
        const response = await deleteDocument("tasks", task.id);
        if(!response.statusResponse){
            toastRef.current.show("Error al eliminar la tarea, por favor intente mas tarde.", 3000);
            return
        }
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
            <View style={styles.conteninerButtons}>
                <Button 
                    title="Editar Tarea"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={()=>updateTask()}
                    loading={loadingUpdate}
                />
                <Button 
                    title="Completar Tarea"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnDelete}
                    onPress={()=>setShowModal(true)}
                />
            </View>
            <Modal 
                isVisible={showModal}
                setIsVisible={setShowModal}
            >
                <View style={styles.containerText}>
                    <Text>Completar Tarea</Text>
                    <Text>¿Estas seguro de que quieres completar la tarea?</Text>
                </View>
                <View style={styles.conteninerButtonsRow}>
                    <Button 
                        title="Si"
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btnModal}
                        onPress={()=>deleteTask()}
                    />
                    <Button 
                        title="No"
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btnModal}
                        onPress={()=>setShowModal(false)}
                    />
                </View>
            </Modal>
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
    containerText : {
        display: 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },  
    conteninerButtons : {
        display : 'flex',
        flexDirection : 'column',
        width : '100%'
    },
    conteninerButtonsRow : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-around',
        width : '100%'
    },
    input : {
        width: '100%'
    },
    btn : {
        backgroundColor : '#442484'
    },
    btnDelete: {
        backgroundColor : 'red'
    },
    btnModal : {
        backgroundColor : 'transparent'
    },
    icon:{
        color:'#c1c1c1'
    },
    btnContainer : {
        margin : 10,
        width : '100%'
    }
})
