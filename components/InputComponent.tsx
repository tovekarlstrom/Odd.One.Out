import { Colors, Sizes } from "@/constants/Theme";
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
      placeholderTextColor={
        placeholder ? Colors.light.placeholder : Colors.light.text
      }
      onChangeText={onChangeText}
      value={value}
      returnKeyType="done" // Change the return key type to "done" on mobile keyboard
      onSubmitEditing={onSubmitEditing} // Call the addNewQusetion function when the user presses "done" on the keyboard
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.light.inputField,
    flex: 1,
    maxWidth: 285,
    height: 55,
    borderWidth: 0,
    paddingLeft: Sizes.Spacings.medium,
    paddingRight: Sizes.Spacings.medium,
    borderRadius: 30,
  },
});
