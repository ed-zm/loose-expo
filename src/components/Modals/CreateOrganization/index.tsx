import React from "react";
import { View } from "react-native";
import useCreateOrganization from "loose-components/src/components/Modals/CreateOrganization";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const CreateOrganization = ({ variables, closeModal }) => {
  const { onCreateOrganization, name, setName } = useCreateOrganization({
    variables,
  });
  return (
    <View>
      <Input
        type="text"
        placeholder="organization name"
        value={name}
        onChangeText={setName}
      />
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
