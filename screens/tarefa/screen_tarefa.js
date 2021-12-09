import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './style';
import DateTimePicker from '@react-native-community/datetimepicker';


function TarefaScreen({ route, navigation }) {

  const [tarefaId, setTarefaId] = useState(route.params.id);
  const [titulo, setTitulo] = useState(route.params.titulo);
  const [prazo, setPrazo] = useState(route.params.prazo);
  const [descricao, setDescricao] = useState(route.params.descricao);
  const [status, setStatus] = useState(route.params.status);
  const [dataFazer, setDataFazer] = useState(null);
  const [tempoTotal, setTempoTotal] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setPrazo(date.toLocaleDateString());
    setDate(currentDate);
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


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
          dataFazer: null,
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
    if(tarefaId == null) {
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
        <TouchableOpacity
          style={styles.entrada}
          onPress={() => {
            showDatepicker();
          }}
        >
          <Text  style={styles.textoData}>Selecionar Data</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.botaoData}
          onPress={() => {
            showTimepicker();
          }}
        >
          <Text  style={styles.entrada}>Hora</Text>
        </TouchableOpacity> */}

        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

        {/* <TextInput
          style={styles.entrada}
          onChangeText={setPrazo}
          value={prazo}
        /> */}
        <Text style={styles.entrada}>{prazo.slice(8,10)}-{prazo.slice(5,7)}-{prazo.slice(0,4)}</Text>
        <Text style={styles.texto}>Descricao:</Text>
        <TextInput
          style={styles.entrada}
          onChangeText={setDescricao}
          value={descricao}
        />
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

        <TouchableOpacity
          style={styles.botaoSubTarefas}
          onPress={() => {
            navigation.navigate('ListaSubTarefas',{
              id: tarefaId
            })
          }}
        >
          <Text  style={styles.textoBotao}>Sub Tarefas</Text>
        </TouchableOpacity>
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