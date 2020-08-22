import React, { useEffect } from "react";
import { View } from "react-native";
import UserCard from "../../UserCard";
import List from "../../List";
import Select, { Option } from "../../Select";
import useUsersList from "loose-components/src/components/Lists/Users";
import Input from "../../Input";

const Users = ({ action, team, organization, type, typeId, invite }) => {
  const {
    users,
    pageInfo,
    onFetchMore,
    name,
    setName,
    refetch,
    loading,
    orderBy,
    setOrderBy,
  } = useUsersList({
    team,
    organization,
    type,
    typeId,
    invite,
  });
  useEffect(() => {}, []);
  return (
    <View>
      <View>
        <Input onChangeText={setName} value={name} placeholder="Name" />
        <Select onValueChange={setOrderBy} selectedValue={orderBy}>
          <Option value="firstName_ASC" label="A-Z" />
          <Option value="firstName_DESC" label="Z-A" />
        </Select>
      </View>
      <List
        pageInfo={pageInfo}
        onFetchMore={onFetchMore}
        items={users}
        loading={loading}
        renderItem={(user) => (
          <UserCard
            user={user}
            action={action ? () => action({ user, loading, refetch }) : null}
          />
        )}
      />
    </View>
  );
};

export default Users;
