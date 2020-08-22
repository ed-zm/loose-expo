import React from "react";
import { View } from "react-native";
import Button from "../../Button";
import Select, { Option } from "../../Select";
import Input from "../../Input";
import useCreateTeam from "loose-components/src/components/Modals/CreateTeam";

const CreateTeam = ({ variables, closeModal }) => {
  const {
    name,
    setName,
    organization,
    setOrganization,
    orgs,
    onCreateTeam,
    creatingTeam,
  } = useCreateTeam({
    variables,
  });
  return (
    <View>
      <Input
        type="text"
        placeholder="name"
        value={name}
        onChangeText={setName}
      />
      <Select onValueChange={setOrganization} selectedValue={organization}>
        {orgs &&
          orgs.map((o) => <Option key={o.id} value={o.id} label={o.name} />)}
      </Select>
      <Button
        title="Create Team"
        onPress={async () => {
          await onCreateTeam({ variables });
          await closeModal();
        }}
        disabled={creatingTeam || !organization}
      />
    </View>
  );
};

export default CreateTeam;
