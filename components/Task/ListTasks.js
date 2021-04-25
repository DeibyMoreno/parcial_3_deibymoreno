import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getCurrentUser, getDocuments } from '../../utils/actions'
import {map, size} from 'lodash';
import { TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import Loading from '../Loading';

export default function ListTasks({navigation}) {
    const [tasks, setTasks] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            (async()=>{
                setLoading(true);
                const userDb = await getCurrentUser();
                setUser(userDb);
                const listTasks = await getDocuments("tasks", userDb.uid);
                setTasks(listTasks.documents);
                setLoading(false);
            })()
       }, [])
   )

    const goTask = (task)=>{
        navigation.navigate("actionTask", {task})
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>
                    Bienvenido: {user && user.email}
                </Text>
            </View>
            {
                size(tasks) ? (
                    <>
                    {
                        map(tasks, (task, index)=>(
                            <TouchableOpacity onPress={()=>goTask(task)}  key={index}>
                                <Text>{task.name}</Text>
                            </TouchableOpacity >
                        ))
                    }
                    </>
                ) : (
                    <View style={styles.containerCenter}>
                        <Text>No hay tareas registradas</Text>
                    </View>
                )
            }
            <Loading isVisible={loading} text="Cargando tareas"></Loading>
        </View>
      
    )
}

const styles = StyleSheet.create({
    containerCenter : {
        display : 'flex',
        flexDirection : 'row',
        height : '100%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    container : {
        display : 'flex',
        flexDirection : 'column',
        padding : 15
    },
    title: {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center'
    }
})
