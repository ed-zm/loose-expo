import React from "react";
import { View } from "react-native";
import Button from "../../../components/Button";
import useTaskAssign from "loose-components/src/components/Modals/AssignTask";
import UsersList from "../../Lists/Users";

const AssignTask = ({ task, closeModal }) => {
  const { assigningTask, onAssignTask } = useTaskAssign({ task });
  return (
    <View>
      <UsersList
        action={({ user }) => (
          <Button
            title="Assign"
            onPress={async () => {
              await onAssignTask(user);
              closeModal();
            }}
            disabled={assigningTask}
            loading={assigningTask}
          />
        )}
      />
    </View>
  );
};

export default AssignTask;
