import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import useTeam from "loose-components/src/screens/Dashboard/Team";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
// import UsersList from "../../../components/Lists/Users";
import TasksList from "../../../components/Lists/Tasks";

const Team = ({
  route: {
    params: { id },
  },
}) => {
  const navigation = useNavigation();
  const { actions } = useContext(ModalContext);
  const { team, onDeleteTeam, tab, setTab } = useTeam({
    id,
  });
  return (
    <View>
      {team && (
        <React.Fragment>
          <View>
            <Image
              source={{ uri: "/default_profile.png" }}
              width={260}
              height={260}
            />
            <Text>{team.name}</Text>
            <Text>{moment(team.createdAt).format("DD/MMM/YYYY HH:mm")}</Text>
          </View>
          <View>
            <View>
              <Button
                title="Edit"
                onPress={() => {
                  actions.openModal({
                    modal: "EditTeam",
                    title: "Edit Team",
                    params: { team },
                  });
                }}
              />
              <Button
                title="Delete"
                deleteButton
                onPress={() => {
                  actions.openModal({
                    modal: "Confirm",
                    title: "Delete Team",
                    params: {
                      onOKText: "Delete",
                      onOK: async () => {
                        await onDeleteTeam();
                        await navigation.navigate("Team", { id: team.id });
                      },
                      description: "Are you sure to delete this team?",
                    },
                  });
                }}
              />
            </View>
            <View>
              <View>
                <TouchableOpacity onPress={() => setTab("TASKS")}>
                  <Text>Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab("USERS")}>
                  <Text>Members</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {tab === "TASKS" && (
                <View>
                  <TasksList team={team} />
                </View>
              )}
              {/* {tab === "USERS" && (
                <View>
                  <UsersList team={team} key="team-members-list" />
                  <Button
                  title = 'Manage Members'
                    onPress={() => {
                      actions.openModal({
                        modal: "ManageTeamMembers",
                        title: "Manage Team Members",
                        params: { team },
                      });
                    }}
                  />
                </View>
              )} */}
            </View>
          </View>
        </React.Fragment>
      )}
    </View>
  );
};

export default Team;
