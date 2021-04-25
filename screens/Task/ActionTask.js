import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import FormAction from '../../components/Task/FormAction';

export default function ActionTask({navigation, route}) {
    const toastRef = useRef();
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const {task} = route.params;
    return (
        <>
            <FormAction
                task={task}
                navigation={navigation}
                toastRef={toastRef}
                setLoading={setLoading}
            />
            <Toast 
                ref={toastRef} position="center" opacity={0.5}
            />
            <Loading 
                isVisible={loading} text={loadingText}
            />
        </>
        
        
    )
}

const styles = StyleSheet.create({})
