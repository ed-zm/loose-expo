import React from "react";
import { View, Text } from "react-native";
import Button from "../../Button";

const Confirm = ({
  onOK,
  onOKText = "Ok",
  onCancel,
  description = "",
  onCancelText = "Cancel",
  closeModal,
}) => {
  return (
    <View>
      <Text>{description}</Text>
      <View>
        <Button onPress={onOK} title={onOKText} />
        <Button onPress={closeModal} title={onCancelText} />
      </View>
    </View>
  );
};

export default Confirm;
