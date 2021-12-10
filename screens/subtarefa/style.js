import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9fc4f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: "#FF0043",
    fontSize: 40,
    fontWeight: "bold",
  },
  texto: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold"
  },
  entrada: {
    width: "90%",
    textAlign: "center",
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    height: 40,
    margin: 12,
    paddingLeft: 10,
    color: "black",
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'black'
  },
  formulario: {
    width: "100%",
    height: "80%",
    bottom: 0,
    backgroundColor: "#ede9e8",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  lista: {
    backgroundColor: '#dafacf',
    height: 80,
    margin: 5,
    width: 550,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'orange'
  },
  textoListaTitulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "black",
  },
  textoListaDescricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "black",
  },
  textoMensagem: {
    marginTop: 0,
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
  },
  textoBotao: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  botaoSubTarefas: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    backgroundColor: "#ff0043",
    marginLeft: 5,
    marginRight: 10,
    marginTop: 20,
    height: 60
  },
  conjuntoBotoes: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    height: "10%"
  },
  botaoGravar: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    backgroundColor: "#ff0043",
    marginLeft: 5,
    marginRight: 10,
    height: 60
  },
  botaoExcluir: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    backgroundColor: "#ff0043",
    marginRight: 15,
    height: 60
  },
  picker: {
    marginVertical: 10,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
  pickerItem: {
    fontSize: 20,
    color: "black",
    backgroundColor: "#f0f0f0",
  },
  botaoData: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 40,
  },
  textoData: {
    color: "blue",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  }
});

export default styles;