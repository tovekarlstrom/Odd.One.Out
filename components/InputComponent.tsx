import { TextInput, StyleSheet } from "react-native";

interface InputComponentProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  onSubmitEditing: () => void;
}

export function InputComponent({
  placeholder,
  onChangeText,
  value,
  onSubmitEditing,
}: InputComponentProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder ? placeholder : ""}
      placeholderTextColor={placeholder ? "#747272" : "#231F20"}
      onChangeText={onChangeText}
      value={value}
      returnKeyType="done" // Change the return key type to "done" on mobile keyboard
      onSubmitEditing={onSubmitEditing} // Call the addNewQusetion function when the user presses "done" on the keyboard
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#D9CCC4",
    width: "100%",
    maxWidth: 285,
    height: 55,
    borderWidth: 0,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
  },
});
