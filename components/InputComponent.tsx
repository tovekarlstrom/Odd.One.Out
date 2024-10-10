import { Colors, Sizes } from "@/constants/Theme";
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
      placeholderTextColor={
        placeholder ? Colors.light.placeholder : Colors.light.text
      }
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.light.inputField,
    width: "100%",
    maxWidth: 285,
    height: 55,
    margin: 12,
    borderWidth: 0,
    paddingLeft: Sizes.Spacings.medium,
    paddingRight: Sizes.Spacings.medium,
    borderRadius: 30,
  },
});
