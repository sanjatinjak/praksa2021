import { View , Text ,TouchableOpacity} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


export default function HeaderBar() {

    const navigation = useNavigation();

  return (

    <View>
        <View style={styles.containerForHeader}>
      
            <View style={styles.bars}> 
                <AntDesign name="bars" size={30} color="black" /> 
            </View>

            <View style={styles.searchCart}> 
                <AntDesign name="search1" size={30} color="black" />
                <AntDesign name="shoppingcart" size={30} color="black" />
            </View>
        </View>

        <View style={styles.secondRow}> 

            <TouchableOpacity onPress={() => { navigation.navigate('Home') }}> 
                <Text style={styles.title}>Home</Text> 
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('Categories') }}> 
                <Text style={styles.title}>Categories</Text>
            </TouchableOpacity>
            
        </View>

    </View>
  );
}

