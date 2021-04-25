import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import LoginForm from '../../components/Account/LoginForm'

export default function Login() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <LoginForm />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal : 40
    }
})
