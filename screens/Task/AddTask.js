import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { addDocumentWithoutId } from '../../utils/actions'
import Loading from '../../components/Loading'
import Toast from 'react-native-easy-toast'
import FormAddTask from '../../components/Task/FormAdd'

export default function AddTask({navigation}) {
    const toastRef = useRef();
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    return (
        <>
            <FormAddTask 
                toastRef={toastRef}
                setLoading={setLoading}
                navigation={navigation}
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
