import { StyleSheet } from "react-native";

const styles = (task) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: task.state === 0 ? "transparent" : "lightgray",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    titleContainer: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
    },
    titleText: {
      fontWeight: "bold",
    },
  });

export default styles;
