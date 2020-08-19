import React from "react";
import { Button, StyleSheet } from "react-native";

const ButtonComponent = ({ deleteButton = false, ...props }) => {
  return <Button {...props} />;
};

export default ButtonComponent;
