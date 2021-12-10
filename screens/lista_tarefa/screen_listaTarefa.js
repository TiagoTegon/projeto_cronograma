import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import ProgressBar from '../../util/progress-bar.component';
import Ionicons from 'react-native-vector-icons/Ionicons';


function ListaTarefaScreen({ navigation }) {

  const [listaTarefa, setListaTarefa] = useState([]);
  const [iniciado, setIniciado] = useState(false);
  const [progresso, setProgresso] = useState(0);

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

  async function calculaProgresso() {
    console.log(listaTarefa.length);
    let total = listaTarefa.length;
    
    let response = await fetch(input='http://192.168.100.21:3000/tarefa/progresso', init= {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
    });

    let concluidos = await response.json();

    console.log(concluidos);
    if(total != 0){
      setProgresso(Number((concluidos/total)*100).toFixed(2));
    }
    console.log(progresso);
  }

  useEffect(() => {
    if(iniciado === false) {
      console.log('Carregando lista de Tarefas com useEffect');
      listaTarefas();
      calculaProgresso();
      setIniciado(true);
    }
  });


  return (
    <View style={styles.container}>
      <ProgressBar completed = {progresso}/> 
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
      </View>
      <View style={styles.conjuntoBotoes}>
        <TouchableOpacity
            style={styles.botaoListaTarefas}
            onPress={() => {
                listaTarefas();
                calculaProgresso();
            }}
          >
              <Ionicons name="ios-refresh" size={40} color='white'/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoInsereTarefa}
            onPress={() => {
                navigation.navigate('Cronograma');
            }}
          >
              <Ionicons name="md-calendar" size={40} color='white'/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoInsereTarefa}
            onPress={() => {
              navigation.navigate('Tarefa',{
                id: null,
                titulo: null,
                prazo: new Date().toISOString(),
                descricao: null,
                status: "Não Concluído"
              });
            }}
          >
              <Ionicons name="ios-add" size={40} color='white'/>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default ListaTarefaScreen;