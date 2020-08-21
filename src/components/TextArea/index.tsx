import React from "react";
import { TextInput } from "react-native";

const TextArea = ({ numberOfLines = 4, ...props }) => {
  return <TextInput {...props} numberOfLines={numberOfLines} multiline />;
};

export default TextArea;
