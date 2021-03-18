import { View,StyleSheet } from 'react-native';
import ListOfItems from "./presentation/Items/listOfItems";
import React from 'react';


export default function App() {
  return (

    <View style={styles.container}>
      <ListOfItems />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
});
