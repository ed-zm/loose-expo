import React, { useState } from "react";
import {
  View,
  CheckBox,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { UPDATE_TASK } from "./index.graphql";
import styles from "./styles";

const TaskCard = ({ task }) => {
  const [updateTask] = useMutation(UPDATE_TASK);
  const navigation = useNavigation();
  const style = styles(task);
  return (
    <View style={style.container}>
      <View></View>
      <View style={style.header}>
        <CheckBox
          value={task.state === 1 ? true : false}
          onValueChange={() => {
            const state = task.state === 0 ? 1 : 0;
            updateTask({
              variables: {
                id: task.id,
                state,
              },
              optimisticResponse: {
                __typename: "Mutation",
                updateTask: {
                  __typename: "Task",
                  id: task.id,
                  state,
                },
              },
            });
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Task", { id: task.code })}
        >
          <View style={style.titleContainer}>
            <Text style={style.titleText}>{task.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text>
        Created By{" "}
        {`${task.createdBy.firstName} ${task.createdBy.lastName} (@${task.createdBy.username})`}
      </Text>
      <Text>
        {!!task.assignedTo
          ? `Assigned To ${task.assignedTo.firstName} ${task.assignedTo.lastName} (@${task.assignedTo.username})`
          : `Unassigned`}
      </Text>
    </View>
  );
};

export default TaskCard;
