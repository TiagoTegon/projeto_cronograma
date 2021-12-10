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
    formulario: {
      width: "100%",
      height: "90%",
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
      backgroundColor: '#fca4a7',
      height: 80,
      margin: 5,
      width: "98%",
      borderRadius: 20,
      borderWidth: 0,
      borderColor: 'black',
    },
    textoListaTitulo: {
      // fontSize: 40,
      // fontWeight: 'bold',
      // color: "black",
      justifyContent: 'center',
      height: 75,
    },
    textoListaDestaque: {
      justifyContent: 'center',
      height: 75,
      backgroundColor: '#ff4f4f',
      borderWidth: 0,
      borderRadius: 50,
      borderColor: 'black'
    },
    textoListaDescricao: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "black",
    },
    textoBotaoListaTarefas: {
      color: "white",
      fontSize: 22,
      fontWeight: "bold",
    },
    conjuntoBotoes: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center'
    },
    botaoListaTarefas: {
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
    botaoInsereTarefa: {
      flex: 1,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      width: "60%",
      backgroundColor: "#ff0043",
      marginRight: 5,
    },
    tabela: {
      width: "90%",
      paddingTop: 20,
      marginTop: 10,
    },
    tabelacabecalho:{
      //flex: 1/3,
      fontWeight: 'bold',
      //fontSize: '12px',
      height: 70,
      alignItems: 'center',
      
    }
});

export default styles;