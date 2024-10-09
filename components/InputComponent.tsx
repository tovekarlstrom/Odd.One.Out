import { TextInput, StyleSheet } from "react-native";

interface InputComponentProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

export function InputComponent({
  placeholder,
  onChangeText,
}: InputComponentProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder ? placeholder : ""}
      placeholderTextColor={placeholder ? "#7e7d7d" : "#231F20"}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#D9CCC4",
    width: "100%",
    maxWidth: 285,
    height: 55,
    margin: 12,
    borderWidth: 0,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
  },
});
