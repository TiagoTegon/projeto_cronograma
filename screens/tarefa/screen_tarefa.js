import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';

function TarefaScreen({ route, navigation }) {

  const [tarefaId, setTarefaId] = useState(route.params.id);
  const [titulo, setTitulo] = useState(route.params.titulo);
  const [prazo, setPrazo] = useState(route.params.prazo);
  const [descricao, setDescricao] = useState(route.params.descricao);
  const [status, setStatus] = useState(route.params.status);
  const [dataFazer, setDataFazer] = useState(null);
  const [tempoTotal, setTempoTotal] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  async function gravaTarefa() {
    if(titulo == null || prazo == null) {
      setMensagem("Preencha todos os campos");
    } else {
      setMensagem(null);
      let response = await fetch(input="http://192.168.100.21:3000/tarefa/grava",
      init={
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value={
          id: tarefaId,
          titulo: titulo,
          prazo: prazo,
          descricao: descricao,
          status: status,
          dataFazer: new Date(),
          tempoTotal: null
        })
      });

      let json = await response.json();
      if(json === 'Inclusao ok') {
        setMensagem("Tarefa inserida com sucesso!");
        setTarefaId(null);
        setTitulo(null);
        setPrazo(null);
        setDescricao(null);
      } else if(json === 'Alteracao ok') {
        setMensagem("Tarefa alterada com sucesso!");
        setTarefaId(null);
        setTitulo(null);
        setPrazo(null);
        setDescricao(null);
      } else if (json === 'Alteracao erro') {
        setMensagem("Erro na alteração da tarefa!");
      } else {
        setMensagem("Erro na inclusão da tarefa!");
      }
    }
  }

  async function excluiTarefa() {
    if(id == null || titulo == null || prazo == null || descricao == null) {
      setMensagem("Faltam dados para exclusão");
    } else {
      setMensagem(null);
      let response = await fetch(input= "http://192.168.100.21:3000/tarefa/exclui",
      init={
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value={
          id: tarefaId
        })
      });

      let json = await response.json();
      if(json === 'Exclusao ok') {
        setMensagem("Tarefa excluida com sucesso");
        setTarefaId(null);
        setTitulo(null);
        setPrazo(null);
        setDescricao(null);
      }
      else {
        setMensagem("Erro na exclusão da Tarefa");
        setTarefaId(null);
        setTitulo(null);
        setPrazo(null);
        setDescricao(null);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tarefa</Text>
      <View style={styles.formulario}>
        <Text style={styles.texto}>Título:</Text>
        <TextInput
          style={styles.entrada}
          onChangeText={setTitulo}
          value={titulo}
        />
        <Text style={styles.texto}>Prazo:</Text>
        <TextInput
          style={styles.entrada}
          onChangeText={setPrazo}
          value={prazo}
        />
        <Text style={styles.texto}>Descricao:</Text>
        <TextInput
          style={styles.entrada}
          onChangeText={setDescricao}
          value={descricao}
        />
        <Text style={styles.texto}>Status:</Text>
        <TextInput
          style={styles.entrada}
          onChangeText={setStatus}
          value={status}
        />
        <Text style={styles.textoMensagem}>{mensagem}</Text>
      </View>
      <View style={styles.conjuntoBotoes}>
        <TouchableOpacity
          style={styles.botaoGravar}
          onPress={() => {
            gravaTarefa();
          }}
        >
          <Text  style={styles.textoBotao}>Gravar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => {
            excluiTarefa();
          }}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
          
      </View>

    </View>
  );
}

export default TarefaScreen;