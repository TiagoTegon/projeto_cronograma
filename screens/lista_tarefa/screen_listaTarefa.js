import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
//import ProgressBar from '../../util/progress-bar.component';
import ProgressBar from "@ramonak/react-progress-bar";
import Ionicons from 'react-native-vector-icons/Ionicons';


function ListaTarefaScreen({ navigation }) {

  const [listaTarefa, setListaTarefa] = useState([]);
  const [iniciado, setIniciado] = useState(false);

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

  useEffect(() => {
    if(iniciado === false) {
      console.log('Carregando lista de Tarefas com useEffect');
      listaTarefas();
      setIniciado(true);
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>
      <View style={styles.formulario}>
        <FlatList
          data={listaTarefa}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
          <TouchableOpacity
            style={styles.lista}
            onPress={() => {
              navigation.navigate('Tarefa',{
                id: item.id.toString(),
                titulo: item.titulo,
                prazo: item.prazo,
                descricao: item.descricao,
                status: item.status
              });
            }}
          >
              <Text style={styles.textoListaTitulo}>{item.titulo}</Text>
              <Text style={styles.textoListaDescricao}>{item.descricao}</Text>
          </TouchableOpacity>
          }
        />
        
        {/* <ProgressBar completed={30}/>  */}
      
      </View>
      <View style={styles.conjuntoBotoes}>
        <TouchableOpacity
            style={styles.botaoListaTarefas}
            onPress={() => {
                listaTarefas();
            }}
          >
              <Ionicons name="ios-refresh" size={40} color='white'/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoInsereTarefa}
            onPress={() => {
                consonle.log("Gera cronograma");
            }}
          >
              <Ionicons name="md-calendar" size={40} color='white'/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoInsereTarefa}
            onPress={() => {
              navigation.navigate('Tarefa');
            }}
          >
              <Ionicons name="ios-add" size={40} color='white'/>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default ListaTarefaScreen;