import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
//import ProgressBar from '../../util/progress-bar.component';
import ProgressBar from "@ramonak/react-progress-bar";
function ListaTarefaScreen({ navigation }) {

  const [listaTarefa, setListaTarefa] = useState([]);

  async function listaTarefas() {
      console.log("Lista Tarefas");
      try {
          let response = await fetch(input='http://192.168.100.21:3000/tarefa/consulta', init= {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
          });
          let json = await response.json();
          setListaTarefa(json);
      } catch (error) {
          console.log("Erro");
      }
  }

  return (
    <View style={styles.container}>
      <Text>Lista de Tarefas:</Text>

      <FlatList
        data={listaTarefa}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) =>
        <View>
            <Text>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
        </View>
        }
      />

      <TouchableOpacity
        onPress={() => {
            listaTarefas();
        }}
      >
          <Text>Listar tarefas</Text>
      </TouchableOpacity>
      
      {/* <ProgressBar completed={30}/>  */}
      
    </View>
  );
}

export default ListaTarefaScreen;