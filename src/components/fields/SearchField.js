import React, {
  useState,
  useEffect,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import Colors from '../../assets/colors';

const styles = StyleSheet.create({
  containerInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: 0,
    marginRight: 15,
    marginBottom: 0,
    backgroundColor: Colors.darkWhite,
    borderRadius: 4,
  },
});

export default function SearchField({
  value,
  placeholder,
  onChangeText,
}) {
  const [input, setInput] = useState(value || '');

  useEffect(() => {
    setInput(value || '');
    }, [value]);

  return (
    <View style={[styles.containerInner, {
      backgroundColor: Colors.lightenGray,
      height: 50,
      top: 10,
      margin: 10,
      borderRadius: 25,
    }]}
    >
      <TextInput
        keyboardType="default"
        style={styles.textInput}
        placeholder={placeholder}
        value={input}
        underlineColorAndroid="transparent"
        editable
        onChangeText={(t) => {
          onChangeText(t);
          setInput(t);
        }}
      />
    </View>
  );
}
