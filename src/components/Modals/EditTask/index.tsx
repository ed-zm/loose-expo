import React from "react";
import { View } from "react-native";
import TextArea from "../../TextArea";
import Input from "../../Input";
import Button from "../../Button";
import OrganizationSelect from "../../OrganizationSelect";
import useEditTask from "loose-components/src/components/Modals/EditTask";

const EditTask = ({ task, closeModal }) => {
  const {
    onUpdateTask,
    title,
    setTitle,
    estimated,
    setEstimated,
    description,
    setDescription,
    updatingTask,
    organization,
    setOrganization,
  } = useEditTask({ task, callback: closeModal });
  return (
    <View>
      <Input
        type="text"
        placeholder="title"
        value={title}
        onChangeText={setTitle}
      />
      <Input
        type="number"
        placeholder="estimated"
        value={estimated}
        onChangeText={(value) => setEstimated(parseInt(value, 10))}
      />
      <TextArea
        placeholder="description"
        value={description}
        onChangeText={setDescription}
      />
      <OrganizationSelect
        organization={organization}
        setOrganization={setOrganization}
      />
      <Button
        title="Update Task"
        onPress={onUpdateTask}
        disabled={updatingTask}
      />
      <Button title="Cancel" onPress={closeModal} />
    </View>
  );
};

export default EditTask;
