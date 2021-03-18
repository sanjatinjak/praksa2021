import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row-reverse'
    },
    title:{
        paddingHorizontal: 2,
        paddingVertical: 2,
        fontFamily: 'sans-serif',
        fontSize: 12,
    },
    row: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
        width: 200,
        height: 250,
        flex:1, 
        flexDirection:'column'
    },
    loading: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
  });
  
  export default styles;