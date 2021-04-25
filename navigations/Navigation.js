import React from 'react'
import { View, Text } from 'react-native'
import Login from '../screens/Account/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tasks from '../screens/Task/Tasks';
import AddTask from '../screens/Task/AddTask';
import ActionTask from '../screens/Task/ActionTask';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="login" component={Login} option={{title: 'Inicio de Sesión'}}/>
            <Stack.Screen name="tasks" component={Tasks} option={{title: 'Tareas'}}/>
            <Stack.Screen name="addTask" component={AddTask} option={{title: 'Agregar Tarea'}}/>
            <Stack.Screen name="actionTask" component={ActionTask} option={{title: 'Editar Tarea'}}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}