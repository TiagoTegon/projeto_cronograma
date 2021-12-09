import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './style';


function SubTarefaScreen({ route, navigation }) {

  const [subTarefaId, setSubTarefaId] = useState(route.params.id);
  const [tarefaId, setTarefaId] = useState(route.params.tarefaId);
  const [titulo, setTitulo] = useState(route.params.titulo);
  const [duracao, setDuracao] = useState(route.params.duracao);
  const [status, setStatus] = useState(route.params.status);
  const [mensagem, setMensagem] = useState(null);

  async function gravaSubTarefa() {
    if(titulo == null) {
      setMensagem("Preencha todos os campos");
    } else {
      setMensagem(null);
      let response = await fetch(input="http://192.168.100.21:3000/subtarefa/grava",
      init={
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value={
            titulo: titulo,
            duracao: duracao,
            status: status,
            tarefaId: tarefaId
        })
      });

      let json = await response.json();
      if(json === 'Inclusao ok') {
        setMensagem("Sub Tarefa inserida com sucesso!");
        setSubTarefaId(null);
        setTitulo(null);
      } else if(json === 'Alteracao ok') {
        setMensagem("Sub Tarefa alterada com sucesso!");
        setSubTarefaId(null);
        setTitulo(null);
      } else if (json === 'Alteracao erro') {
        setMensagem("Erro na alteração da sub tarefa!");
      } else {
        setMensagem("Erro na inclusão da sub tarefa!");
      }
    }
  }

  async function excluiSubTarefa() {
    if(subTarefaId == null) {
      setMensagem("Faltam dados para exclusão");
    } else {
      setMensagem(null);
      let response = await fetch(input= "http://192.168.100.21:3000/subtarefa/exclui",
      init={
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value={
          id: subTarefaId
        })
      });

      let json = await response.json();
      if(json === 'Exclusao ok') {
        setMensagem("Sub Tarefa excluida com sucesso");
        setSubTarefaId(null);
        setTitulo(null);
      }
      else {
        setMensagem("Erro na exclusão da Sub Tarefa");
        setSubTarefaId(null);
        setTitulo(null);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sub Tarefa</Text>
      <View style={styles.formulario}>
        <Text style={styles.texto}>Título:</Text>
        <TextInput
          style={styles.entrada}
          onChangeText={setTitulo}
          value={titulo}
        />

        <Text style={styles.texto}>Duração:</Text>
        <Picker
          selectedValue={status}
          onValueChange={(value, index) =>
          setDuracao(value)}
          mode = "dropdown"
          style={styles.picker}
        >
          <Picker.Item style={styles.pickerItem} label="900" value="900" />
          <Picker.Item style={styles.pickerItem} label="1800" value="1800" />
          <Picker.Item style={styles.pickerItem} label="2700" value="2700" />
          <Picker.Item style={styles.pickerItem} label="3600" value="3600" />
          <Picker.Item style={styles.pickerItem} label="5400" value="5400" />
          <Picker.Item style={styles.pickerItem} label="7200" value="7200" />
        </Picker>

        <Text style={styles.texto}>Status:</Text>

        <Picker
          selectedValue={status}
          onValueChange={(value, index) =>
          setStatus(value)}
          mode = "dropdown"
          style={styles.picker}
        >
          <Picker.Item style={styles.pickerItem} label="Não Concluído" value="Não Concluído" />
          <Picker.Item style={styles.pickerItem} label="Concluído" value="Concluído" />
        </Picker>

        <Text style={styles.textoMensagem}>{mensagem}</Text>
      </View>
      <View style={styles.conjuntoBotoes}>
        <TouchableOpacity
          style={styles.botaoGravar}
          onPress={() => {
            gravaSubTarefa();
          }}
        >
          <Text  style={styles.textoBotao}>Gravar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => {
            excluiSubTarefa();
          }}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SubTarefaScreen;