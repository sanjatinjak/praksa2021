import React from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

import { HeaderText } from './CustomText';

import Colors from '../constants/Colors';
export default ProductGridItem = props => {

    let imageUri = `data:image/png;base64,${props.item.image}`;

    return (
        <View>

            <Image source={{ uri: imageUri }} style={styles.image} resizeMode='center' />
            <HeaderText style={{color:'black'}}>${props.item.price}</HeaderText>
            <HeaderText style={{ fontSize: 14, width: 100, color:'black' }}>{props.item.name}</HeaderText>

        </View>


    );
}

const styles = StyleSheet.create({
    product: {
        width: (Dimensions.get('window').width / 2.5),
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: (Dimensions.get('window').height / 3),
        borderWidth: 2,
        borderColor: Colors.primary,
        
    }
});