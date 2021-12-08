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
    fontSize: 22,
  },
  entrada: {
    width: "90%",
    textAlign: "center",
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    height: 40,
    margin: 12,
    paddingLeft: 10,
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 3,
    borderColor: 'orange'
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
  conjuntoBotoes: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  botaoGravar: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    backgroundColor: "#ff0043",
    marginLeft: 5,
  },
  botaoGeraCronograma: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    backgroundColor: "#ff0043",
    marginLeft: 10,
    marginRight: 10,
  },
  botaoExcluir: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    backgroundColor: "#ff0043",
    marginRight: 5,
  },
});

export default styles;