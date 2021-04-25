import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import ListTasks from '../../components/Task/ListTasks'

export default function Tasks() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ListTasks 
                navigation={navigation}
            />
            <Icon 
                type="material-community"
                name="plus"
                color="#442484"
                reverse
                containerStyle={styles.btnContainer}
                onPress={()=>navigation.navigate("addTask")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        position: "absolute",
        bottom : 10,
        right : 10,
        shadowColor : "black",
        shadowOffset : {width: 2, height : 2},
        shadowOpacity : 0.5
    }
})
