import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import styles from './style';
import { DataTable } from 'react-native-paper';

function CronogramaScreen({  navigation }) {

    const [cronograma, setCronograma] = useState([]);
    const [iniciado, setIniciado] = useState(false);
    const [data, setData] = useState(new Date());

   
    async function verificaPrazo() {
      console.log("Verifica Prazo");

      let response = await fetch(input='http://192.168.100.21:3000/cronograma_prazo', init= {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
      });
    }   

    async function geraCronograma() {
        console.log("Gera Cronograma");
        try {
            let response = await fetch(input='http://192.168.100.21:3000/cronograma', init= {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            let json = await response.json();

            let hoje = new Date();
            let amanha = new Date(hoje);
            let incremento = 0;

            let prazo;

            for(var i = 0; i < json.length; i++){
              amanha.setDate(amanha.getDate() + incremento);
              json[i].dataFazer = amanha.toISOString().slice(0, 19).replace('T', ' ');

              prazo = new Date(json[i].prazo);
              if(prazo >= amanha){
                incremento = incremento+1;
              } else if(prazo < amanha) {
                incremento = incremento-1;
              }
            }

            setCronograma(json);
        } catch (error) {
            console.log("Erro");
        }
    }

    useEffect(() => {
        if(iniciado === false) {
          console.log('Carregando lista de Tarefas com useEffect');
          verificaPrazo();
          geraCronograma();
          setIniciado(true);
        }
      });

  return (
    <View style={styles.container}>
        <View style={styles.formulario}>
        <DataTable style={styles.tabela}>
          <DataTable.Header style={styles.tabelacabecalho}>
            <DataTable.Title style={styles.textoListaTitulo}><Text style={{fontSize: 25, fontWeight: 'bold', color: "black"}}>Data Marcada</Text></DataTable.Title> 
            <DataTable.Title style={styles.textoListaTitulo}><Text style={{fontSize: 25, fontWeight: 'bold', color: "black"}}>T??tulo</Text></DataTable.Title> 
            <DataTable.Title style={styles.textoListaTitulo}><Text style={{fontSize: 25, fontWeight: 'bold', color: "black"}}>Prazo</Text></DataTable.Title> 
          </DataTable.Header>
        <FlatList
          data={cronograma}
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
              <DataTable>
                <DataTable.Row style={{height: 10}}>
                <DataTable.Cell style = {styles.textoListaDestaque}><Text style={{fontSize: 22, color: "black", fontWeight: "bold"}}>{item.dataFazer.slice(8, 10)}/{item.dataFazer.slice(5, 7)}</Text></DataTable.Cell> 
                <DataTable.Cell style = {styles.textoListaTitulo}><Text style={{fontSize: 22}}>{item.titulo}</Text></DataTable.Cell> 
                <DataTable.Cell style = {styles.textoListaTitulo}><Text style={{fontSize: 22}}>{item.prazo.slice(8, -14)}/{item.prazo.slice(5, -17)}</Text></DataTable.Cell> 
                </DataTable.Row>
                </DataTable>
          </TouchableOpacity>
          }
        > 
        </FlatList>
      </DataTable>
      </View>
    </View>
  );
}

export default CronogramaScreen;


//new Date
//prazo
//n??o concluidas
//prazo < new Date
// atrasada
//----------------
// comparador = new Date()
// x lista: prazo
//prazo > comparador
// x lista: data fazer = comparador 
//comparador+1

//prazo < comparador
//comparador - 1

