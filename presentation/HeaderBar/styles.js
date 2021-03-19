import { StyleSheet, Dimensions  } from 'react-native';


export default styles= StyleSheet.create({
    containerForHeader: {
        backgroundColor: 'white',
        flexDirection:"row",
        justifyContent: "space-between"
    },
    bars:{ 
        flexDirection:"row", 
        marginTop:35,
        marginLeft: 10,
        marginBottom: 10 
    },
    searchCart: { 
        flexDirection:"row", 
        marginTop:35,
        marginRight: 10, 
        justifyContent: "space-around", 
        width:100,
        marginBottom: 10 
    },
    secondRow: { 
        flexDirection:"row", 
        justifyContent: "space-around", 
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        height: 45,
        marginBottom: 10,
        paddingBottom: 5,
        paddingTop: 15,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 12 },
        shadowOpacity: 1.5,
        shadowRadius: 2,
        elevation: 4,
    },
    title:{
        fontSize: 15,
        fontFamily: "notoserif",
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        
    }
});