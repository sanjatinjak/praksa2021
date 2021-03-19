import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image } from 'react-native';
import styles from './styles';
import { getItems } from '../../containers/getItems';
import { BarIndicator } from 'react-native-indicators';

export default ListOfItems = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]); 
   
    useEffect( () => {
      getItems()
      .then(data => setData(data.items))
      .finally(() => setLoading(false));
    }, []);

    return(
      isLoading ? <BarIndicator count={5} size={80} color= '#306b3f' style={styles.loading}></BarIndicator>

                :
          
      <View>

          <FlatList
          data={data}
          keyExtractor={ (item) => (item.id).toString() }  
          renderItem={({ item }) => (

            <View style={styles.row}> 
               <Image source={{uri: `data:image/jpg;base64,${item.image}`}} style={{width: 150, height: 200}} />
               <Text style={styles.title}>{item.price}€ </Text>    
               <Text style={styles.title}>{item.name} </Text>   
            </View>
          )}
          numColumns={2} 
          showsVerticalScrollIndicator={false}
          snapToAlignment={'start'}
          decelerationRate={'fast'}            
          />  

      </View>
        
    );
}
