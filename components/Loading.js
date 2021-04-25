//import liraries
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import {Overlay} from 'react-native-elements';
// create a component
const Loading = ({isVisible, text}) =>{
    return (
       <Overlay 
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
       >
           <View>
                <ActivityIndicator size='large' color='#442484'/>
                <Text>{text}</Text>
           </View>
       </Overlay>
    );
};

// define your styles
const styles = StyleSheet.create({
    overlay : {
        backgroundColor : '#fff',
        borderColor : '#442484',
        borderWidth : 2,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Loading;
