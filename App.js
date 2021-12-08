import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TarefaScreen from './screens/tarefa/screen_tarefa';
import ListaTarefaScreen from './screens/lista_tarefa/screen_listaTarefa';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListaDeTarefas" component={ListaTarefaScreen} />
        <Stack.Screen name="Tarefa" component={TarefaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}