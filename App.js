import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TarefaScreen from './screens/tarefa/screen_tarefa';
import ListaTarefaScreen from './screens/lista_tarefa/screen_listaTarefa';
import CronogramaScreen from './screens/cronograma/cronograma';
import ListaSubTarefaScreen from './screens/lista_subtarefa/screen_listaSubTarefa';
import SubTarefaScreen from './screens/subtarefa/screen_subTarefa';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:'#9fc4f5',
        },
        headerTintColor: "#FF0043",
        headerTitleAlign:'center',
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 30,
        }
      }}
      >
        <Stack.Screen  name="ListaDeTarefas" component={ListaTarefaScreen} 
        options={{
          title: 'Lista de Tarefas',
        }}/>
        <Stack.Screen name="Tarefa" component={TarefaScreen} 
        options={{
          title: 'Tarefa',
        }}
        />
        <Stack.Screen name="Cronograma" component={CronogramaScreen} 
        options={{
          title: 'Cronograma',
        }}
        />
        <Stack.Screen name="ListaSubTarefas" component={ListaSubTarefaScreen} 
        options={{
          title: 'Lista de Sub Tarefas',
        }}
        />
        <Stack.Screen name="SubTarefa" component={SubTarefaScreen} 
        options={{
          title: 'Sub Tarefas',
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

