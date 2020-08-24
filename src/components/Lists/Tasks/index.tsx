import React, { useContext, useState } from "react";
import { View } from "react-native";
import TaskCard from "../../TaskCard";
import List from "../../List";
import Select, { Option } from "../../Select";
import Button from "../../Button";
import useTasksList from "loose-components/src/components/Lists/Tasks";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import Input from "../../Input";
import styles from "./styles";

const Tasks = ({ team, organization }) => {
  const {
    tasks,
    state,
    variables,
    setState,
    createdOrAssigned,
    setCreatedOrAssigned,
    organizationOrPersonal,
    setOrganizationOrPersonal,
    setTitleFilter,
    titleFilter,
    orderBy,
    setOrderBy,
    onFetchMore,
    pageInfo,
    loading,
  } = useTasksList({ team, organization });
  const modal = useContext(ModalContext);
  const [showFilters, setShowFilters] = useState(false);
  const style = styles();
  return (
    <View>
      {showFilters && (
        <View>
          <Input
            placeholder="Title"
            selectedValue={titleFilter}
            onChangeText={(value) => setTitleFilter(value.toLowerCase())}
          />
          <Select
            onValueChange={(value) => setState(parseInt(value, 10))}
            selectedValue={state}
          >
            <Option label="All" value={2} key="tasks-filter-state-all" />
            <Option label="Open" value={0} key="tasks-filter-state-open" />
            <Option label="Closed" value={1} key="tasks-filter-state-closed" />
          </Select>
          <Select
            onValueChange={(value) => setCreatedOrAssigned(value)}
            selectedValue={createdOrAssigned}
          >
            <Option
              label="All"
              value={null}
              key="tasks-filter-created-or-assigned-all"
            />
            <Option
              label="Created By Me"
              value="CREATED"
              key="tasks-filter-created-or-assigned-created"
            />
            <Option
              label="Assigned To Me"
              value="ASSIGNED"
              key="tasks-filter-created-or-assigned-assigned"
            />
          </Select>
          <Select
            onValueChange={(value) => setOrganizationOrPersonal(value)}
            selectedValue={organizationOrPersonal}
          >
            <Option
              label="All"
              value={null}
              key="tasks-filter-organization-or-personal-all"
            />
            <Option
              label="Personal"
              value="PERSONAL"
              key="tasks-filter-organization-or-personal-personal"
            />
          </Select>
          <Select
            onValueChange={(value) => setOrderBy(value)}
            selectedValue={orderBy}
          >
            <Option
              label="Newest"
              value="createdAt_DESC"
              key="tasks-filter-order-by-newest"
            />
            <Option
              label="Oldest"
              value="createdAt_ASC"
              key="tasks-filter-order-by-oldest"
            />
          </Select>
        </View>
      )}
      <Button
        title="Filters"
        onPress={() => {
          setShowFilters(!showFilters);
        }}
      />
      <Button
        style={style.createButton}
        onPress={() => {
          modal.actions.openModal({
            modal: "CreateTask",
            title: "Add Task",
            params: { tasks, variables },
          });
        }}
        title="Add Task"
      />
      <List
        loading={loading}
        pageInfo={pageInfo}
        onFetchMore={onFetchMore}
        items={tasks}
        renderItem={(task) => <TaskCard task={task} />}
      />
    </View>
  );
};

export default Tasks;
