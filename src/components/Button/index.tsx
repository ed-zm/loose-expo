import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ButtonComponent = ({ deleteButton = false, title, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#28a745",
  },
  text: {
    color: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ButtonComponent;
