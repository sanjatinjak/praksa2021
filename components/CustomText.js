import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const HeaderText = props => {
  return (
    <Text style={[styles.headerText, props.style]} numberOfLines={1}>
      {props.children}
    </Text>
  );
};

export const BodyText = props => {
  return <Text style={[styles.bodyText, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    textTransform: 'uppercase',
    color: 'black',
  },
  bodyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'black',
  },
});
