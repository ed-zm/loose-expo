import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
// import Markdown from "react-markdown";
import moment from "moment";
// import Labels from "./components/Labels";
import Comments from "./components/Comments";
import useTask from "loose-components/src/screens/Dashboard/Task";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import { UserContext } from "loose-components/src/contexts/User";
import Button from "../../../components/Button";

const Task = ({
  route: {
    params: { id },
  },
}) => {
  const modal = useContext(ModalContext);
  const user = useContext(UserContext);
  const { task, loading, error, onDeleteTask, isMember } = useTask({ id });
  return (
    <View>
      {task && (
        <React.Fragment>
          <View>
            <View>
              <TouchableOpacity
                onPress={async () => {
                  if (navigator && navigator.clipboard) {
                    await navigator.clipboard.writeText(task.code);
                    alert("copied to clipboard");
                  }
                }}
              >
                <Image source={{ uri: "/copy.png" }} />
              </TouchableOpacity>
              <Text>{task.title}</Text>
              <Text>{` #${task.code}`}</Text>
            </View>
            {user.id === task.createdBy.id && (
              <View>
                <Button
                  title="Edit"
                  onPress={() => {
                    modal.actions.openModal({
                      modal: "EditTask",
                      title: "Edit Task",
                      params: { task },
                    });
                  }}
                />
                <Button
                  title="Delete"
                  deleteButton
                  onPress={() => {
                    modal.actions.openModal({
                      modal: "Confirm",
                      title: "Delete Task",
                      params: {
                        onOKText: "Delete",
                        onOK: async () => {
                          await onDeleteTask();
                          await router.push("/dashboard");
                        },
                        description: "Are you sure to delete this task?",
                      },
                    });
                  }}
                />
              </View>
            )}
          </View>
          <View>
            <View>
              <Text>Open</Text>
            </View>
            <Text>{`${task.createdBy.firstName} ${task.createdBy.lastName} (@${task.createdBy.username})`}</Text>
            <Text>
              created this task on {moment(task.createdAt).format("MMM DD")}
            </Text>
          </View>
          {/* <Markdown className="" source={task.description} /> */}
          {isMember && (
            <View>
              {task.assignedTo ? (
                <Text>
                  Assigned To: {task.assignedTo.firstName}{" "}
                  {task.assignedTo.lastName} (@{task.assignedTo.username})
                </Text>
              ) : (
                <View>
                  UNASSIGNED
                  {isMember && (
                    <Button
                      title="Assign"
                      onPress={() => {
                        modal.actions.openModal({
                          modal: "AssignTask",
                          title: "Assign Task",
                          params: { task },
                        });
                      }}
                    />
                  )}
                </View>
              )}
            </View>
          )}
          {/* <Labels task={task} /> */}

          <View />
          <Comments task={task} />
        </React.Fragment>
      )}
    </View>
  );
};

export default Task;
