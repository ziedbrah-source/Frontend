import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        autoCapitalize="none"
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginVertical: 5,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
