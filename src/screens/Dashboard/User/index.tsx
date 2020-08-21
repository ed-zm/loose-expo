import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Button from "../../../components/Button";
import useUser from "loose-components/src/screens/Dashboard/User";
import TextArea from "../../../components/TextArea";
import TeamsList from "../../../components/Lists/Teams";
import TasksList from "../../../components/Lists/Tasks";
import OrganizationsList from "../../../components/Lists/Organizations";
import { UserContext } from "loose-components/src/contexts/User";

const User = ({ route: { params } }) => {
  const currentUser = useContext(UserContext);
  const {
    user,
    tab,
    setTab,
    isYou,
    edit,
    setEdit,
    bio,
    setBio,
    onUpdateProfile,
    updatingProfile,
  } = useUser({
    id: params && params.id ? params.id : currentUser.id,
  });

  return (
    <View>
      {user && (
        <View>
          <Image
            source={{ uri: user.avatar || "/default_profile.png" }}
            width={260}
            height={260}
          />
          <View>
            <Text>{`${user.firstName} ${user.lastName}`}</Text>
            <Text>{user.username}</Text>
          </View>
          {edit ? (
            <TextArea value={bio} onChange={setBio} />
          ) : (
            <Text>{user.biography}</Text>
          )}
          {isYou && (
            <React.Fragment>
              {edit && (
                <Button
                  title="Update"
                  onClick={onUpdateProfile}
                  disabled={updatingProfile}
                />
              )}
              <Button
                title={edit ? "Cancel" : "Edit Profile"}
                type="button"
                onClick={() => {
                  setEdit(!edit);
                }}
                disabled={updatingProfile}
              />
            </React.Fragment>
          )}
        </View>
      )}
      <View>
        <View>
          <View>
            <TouchableOpacity onPress={() => setTab("TASKS")}>
              <Text>Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTab("ORGANIZATIONS")}>
              <Text>Organizations</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTab("TEAMS")}>
              <Text> Teams</Text>
            </TouchableOpacity>
          </View>
        </View>
        {tab === "TASKS" && <TasksList />}
        {tab === "ORGANIZATIONS" && <OrganizationsList />}
        {tab === "TEAMS" && <TeamsList />}
      </View>
    </View>
  );
};

export default User;
