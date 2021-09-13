import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default TouchableCmp = props => (
    Platform.OS === 'android' ? <TouchableNativeFeedback {...props}>{props.children}</TouchableNativeFeedback> : <TouchableOpacity>{props.children}</TouchableOpacity>
);
