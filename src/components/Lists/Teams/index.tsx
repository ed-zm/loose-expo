import React, { useContext } from "react";
import { View } from "react-native";
import List from "../../List";
import useTeamsList from "loose-components/src/components/Lists/Teams";
import TeamCard from "../../../components/TeamCard";
import Button from "../../../components/Button";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import Input from "../../../components/Input";
import Select, { Option } from "../../../components/Select";

const Teams = ({ organization }) => {
  const {
    teams,
    loading,
    setNameFilter,
    nameFilter,
    onFetchMore,
    pageInfo,
    variables,
    orderBy,
    setOrderBy,
  } = useTeamsList({ organization });
  const modal = useContext(ModalContext);
  return (
    <View>
      <View>
        <Input
          placeholder="Find a Team"
          value={nameFilter}
          onChangeText={setNameFilter}
        />
        <Select onValueChange={setOrderBy} selectedValue={orderBy}>
          <Option
            label="Newest"
            value="createdAt_DESC"
            key="teams-filter-order-by-newest"
          />
          <Option
            label="Oldest"
            value="createdAt_ASC"
            key="teams-filter-order-by-oldest"
          />
        </Select>
        <Button
          title="Create Team"
          onPress={() => {
            modal.actions.openModal({
              modal: "CreateTeam",
              title: "Create Team",
              params: { variables },
            });
          }}
        />
      </View>
      <List
        loading={loading}
        pageInfo={pageInfo}
        onFetchMore={onFetchMore}
        items={teams}
        renderItem={(team) => <TeamCard team={team} />}
      />
    </View>
  );
};

export default Teams;
