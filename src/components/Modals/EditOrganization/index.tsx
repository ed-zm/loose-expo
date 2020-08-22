import React from "react";
import { View } from "react-native";
import useEditOrganization from "loose-components/src/components/Modals/EditOrganization";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const EditOrganization = ({ organization, closeModal }) => {
  const { onUpdateOrganization, name, setName, loading } = useEditOrganization({
    organization,
  });
  return (
    <View>
      <Input
        type="text"
        placeholder="organization name"
        value={name}
        onChangeText={setName}
      />
      <View>
        <Button
          title="Update"
          onPress={async () => {
            await onUpdateOrganization();
            await closeModal();
          }}
          disabled={loading}
        />
        <Button title="Cancel" onPress={closeModal} />
      </View>
    </View>
  );
};

export default EditOrganization;
