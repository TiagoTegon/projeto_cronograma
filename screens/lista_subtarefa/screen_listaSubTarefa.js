import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import ProgressBar from '../../util/progress-bar.component';
import Ionicons from 'react-native-vector-icons/Ionicons';


function ListaSubTarefaScreen({ route, navigation }) {

  const [listaSubTarefa, setListaSubTarefa] = useState([]);
  const [tarefaId, setTarefaId] = useState(route.params.id);
  const [iniciado, setIniciado] = useState(false);
  const [progresso, setProgresso] = useState(0);

  async function listaSubTarefas() {
      console.log("Lista Sub Tarefas");
      try {
          let response = await fetch(input='http://192.168.100.21:3000/tarefa/consulta_subtarefas', init= {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(value={
                  tarefaId: tarefaId
              })
          });

          let json = await response.json();
          setListaSubTarefa(json);
      } catch (error) {
          console.log("Erro Carrega"+error);
      }
  }

  async function calculaProgresso() {

    let total = listaSubTarefa.length;
    
    let response = await fetch(input='http://192.168.100.21:3000/subtarefa/progresso', init= {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(value={
          tarefaId: tarefaId
      })
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
      listaSubTarefas();
      calculaProgresso();
      setIniciado(true);
    }
  });


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Sub Tarefas</Text>
      <ProgressBar completed = {progresso}/> 
      <View style={styles.formulario}>
        <FlatList
          data={listaSubTarefa}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
          <TouchableOpacity
            style={styles.lista}
            onPress={() => {
              navigation.navigate('SubTarefa',{
                id: item.id.toString(),
                tarefaId: item.tarefaId,
                titulo: item.titulo,
                duracao: item.duracao,
                status: item.status
              });
            }}
          >
              <Text style={styles.textoListaTitulo}>{item.titulo}</Text>
              <Text style={styles.textoListaDuracao}>{item.duracao}</Text>
          </TouchableOpacity>
          }
        />     
      </View>
      <View style={styles.conjuntoBotoes}>
        <TouchableOpacity
            style={styles.botaoListaTarefas}
            onPress={() => {
                listaSubTarefas();
                calculaProgresso();
            }}
          >
              <Ionicons name="ios-refresh" size={40} color='white'/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoInsereTarefa}
            onPress={() => {
              navigation.navigate('SubTarefa',{
                id: null,
                tarefaId: tarefaId,
                titulo: null,
                duracao: null,
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

export default ListaSubTarefaScreen;