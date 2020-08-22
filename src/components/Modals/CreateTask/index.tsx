import React from "react";
import { View, Text } from "react-native";
import TextArea from "../../TextArea";
import Input from "../../Input";
import Button from "../../Button";
import Select, { Option } from "../../Select";
import UsersList from "../../Lists/Users";
import useCreateTask from "loose-components/src/components/Modals/CreateTask";
import OrganizationSelect from "../../OrganizationSelect";
import TeamSelect from "../../TeamSelect";

const CreateTask = ({ tasks, variables, closeModal }) => {
  const {
    team,
    setTeam,
    onCreateTask,
    title,
    setTitle,
    estimated,
    setEstimated,
    description,
    setDescription,
    teamTask,
    setTeamTask,
    organization,
    setOrganization,
    creatingTask,
    setAssignTo,
    assignTo,
  } = useCreateTask({ tasks, variables, callback: closeModal });
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
      {organization && (
        <React.Fragment>
          <View>
            <input
              type="checkbox"
              checked={teamTask}
              onChange={() => {
                setTeamTask(!teamTask);
              }}
            />
            <Text>Team Task</Text>
          </View>
          {false && teamTask && <TeamSelect team={team} setTeam={setTeam} />}
          {!!assignTo && !teamTask && (
            <View>
              <Text>
                Assigned To {`${assignTo.firstName} ${assignTo.lastName}`}
              </Text>
              <Button
                onPress={async () => {
                  await setAssignTo(null);
                }}
                title="Change"
              />
            </View>
          )}
          {!teamTask && !assignTo && (
            <View>
              <UsersList
                organization={organization}
                action={({ user }) => (
                  <Button
                    onPress={async () => {
                      await setAssignTo(user);
                    }}
                    title="Assign"
                  />
                )}
              />
            </View>
          )}
        </React.Fragment>
      )}
      <Button
        title="Create Task"
        onPress={onCreateTask}
        disabled={creatingTask}
      />
    </View>
  );
};

export default CreateTask;
