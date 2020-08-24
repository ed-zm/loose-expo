import React from "react";
import { View, Text } from "react-native";
import useCreateOrganization from "loose-components/src/components/Modals/CreateOrganization";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import styles from "./styles";

const CreateOrganization = ({ variables, closeModal }) => {
  const { onCreateOrganization, name, setName } = useCreateOrganization({
    variables,
  });
  const style = styles();
  return (
    <View style={style.container}>
      <View>
        <Text style={style.inputNameText}>Organization Name</Text>
        <Input
          type="text"
          placeholder="organization name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button
        title="Create Organization"
        onPress={async () => {
          await onCreateOrganization();
          await closeModal();
        }}
      />
    </View>
  );
};

export default CreateOrganization;
