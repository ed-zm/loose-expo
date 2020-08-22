import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "../../../components/Button";
import useManageTeamMembers from "loose-components/src/components/Modals/ManageTeamMembers";
import UsersList from "../../Lists/Users";

const ManageTeamMembers = ({ team }) => {
  const {
    removingMember,
    addingMember,
    onRemoveMember,
    onAddMember,
    member,
    setMember,
    tab,
    setTab,
  } = useManageTeamMembers({
    team,
  });
  return (
    <View>
      <nav>
        <View>
          <TouchableOpacity onPress={() => setTab("ADD")}>
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTab("REMOVE")}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      </nav>
      {tab === "ADD" && (
        <UsersList
          key="add-user-to-team"
          organization={team.organization}
          action={({ user, refetch, loading }) => (
            <Button
              title="Add"
              onPress={async () => {
                await onAddMember(user.id);
                await refetch();
              }}
              disabled={addingMember}
            />
          )}
        />
      )}
      {tab === "REMOVE" && (
        <UsersList
          key="remove-user-from-team"
          team={team}
          action={({ user, refetch, loading }) => (
            <Button
              title="Remove"
              onPress={async () => {
                await onRemoveMember(user.id);
                await refetch();
              }}
              disabled={removingMember}
            />
          )}
        />
      )}
      <View>
        {/* <OrganizationMemberSelect organizationId={"d"} where={where} member={member} setMember={setMember} /> */}
        {/* <Select onChange={(e) => setMember(e.target.value)} value={member}>
          {members &&
            members.users &&
            members.users.map((m) => (
              <option key={m.id} value={m.id}>
                {m.firstName} {m.lastName}
              </option>
            ))}
        </Select>
        <Button onPress={onAddMember} disabled={addingMember}>
          Add Member
        </Button> */}
      </View>
    </View>
  );
};

export default ManageTeamMembers;
