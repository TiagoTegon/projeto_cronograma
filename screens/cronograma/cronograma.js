import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import styles from './style';

function CronogramaScreen({  navigation }) {

    const [cronograma, setCronograma] = useState([]);
    const [iniciado, setIniciado] = useState(false);

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
            setCronograma(json);
        } catch (error) {
            console.log("Erro");
        }
    }

    useEffect(() => {
        if(iniciado === false) {
          console.log('Carregando lista de Tarefas com useEffect');
          geraCronograma();
          setIniciado(true);
        }
      });

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Cronograma</Text>
        <View style={styles.formulario}>
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
              <Text style={styles.textoListaTitulo}>{item.titulo}</Text>
              <Text style={styles.textoListaDescricao}>{item.descricao}</Text>
              <Text style={styles.textoListaDescricao}>{item.prazo}</Text>
          </TouchableOpacity>
          }
        />
      
      </View>
    </View>
  );
}

export default CronogramaScreen;