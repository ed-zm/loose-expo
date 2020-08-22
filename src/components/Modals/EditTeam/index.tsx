import React from "react";
import { View } from "react-native";
import useEditTeam from "loose-components/src/components/Modals/EditTeam";
import Input from "../../Input";
import Button from "../../Button";

const EditTeam = ({ team, closeModal }) => {
  const { onUpdateTeam, name, setName, loading } = useEditTeam({ team });
  return (
    <View>
      <Input
        type="text"
        placeholder="team name"
        value={name}
        onChangeText={setName}
      />
      <View>
        <Button
          title="Update"
          onPress={async () => {
            await onUpdateTeam();
            await closeModal();
          }}
          disabled={loading}
        />
        <Button title="Cancel" onPress={closeModal} />
      </View>
    </View>
  );
};

export default EditTeam;
