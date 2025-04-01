import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    detailContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
    title:{
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 24,
    },
    input: {
      borderWidth:2, borderColor:'black', borderRadius:10, padding:5,
    },
    label: {
      marginBottom: 5,
      fontSize: 20,
      marginTop: 10,
    },
    loginLabel: {
      marginBottom: 5,
      fontSize: 12,
      marginTop: 10,
    },
    centerGroup:{
      alignSelf: 'center',
      width: "90%",
    },
    buttonText:{
      color: 'white', fontWeight: 'bold'
    },
    button:{
      alignSelf: 'center', alignItems: 'center', width: '100%',  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 0, backgroundColor: 'black'
    },
    loginButton:{
        alignSelf: 'center', alignItems: 'center', width: '100%',marginTop: 20, borderRadius:10,  paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'
    },
    wrongInput:{
      borderWidth:2, borderColor:'red', borderRadius:10, padding:5,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      padding: 12,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3, 
    },
    indexContainer: {
      backgroundColor: 'black',
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    indexText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    contentContainer: {
      flex: 1,
    },
    subject: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    time: {
      fontSize: 14,
      color: '#666',
      marginLeft: 5,
    },
    centerBottomDockedGroup: {
      position: 'absolute',
      bottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
    },
    deleteButton: {
      alignSelf: 'center', alignItems: 'center', marginTop: 10, width: '100%',  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, backgroundColor: 'red'
    },
    staticText: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
        color: '#333',
        marginBottom: 10,
      },
      
  });