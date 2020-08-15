import React, { useContext } from "react";
import { View } from 'react-native'
import TaskCard from "../../TaskCard";
import List from "../../List";
import Select, { Option } from "../../Select";
import Button from "../../Button";
import useTasksList from "loose-components/src/components/Lists/Tasks";
import { ModalContext } from "loose-components/src/contexts/UI/Modal";
import Input from "../../Input";

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
  return (
    <View className="task-list">
      <View className="tasks-list-header">
        <Input placeholder="Title" selectedValue={titleFilter} onValueChange={(value) => setTitleFilter(value.toLowerCase())} />
        <Select onValueChange={(value) => setState(parseInt(value, 10))} value={state}>
          <Option label = 'All' value={2} key = 'task-filter-state-all'/>
          <Option label = 'Open' value={0} key = 'task-filter-state-open'/>
          <Option label = 'Closed' value={1} key = 'task-filter-state-closed' />
        </Select>
        <Select onValueChange={(value) => setCreatedOrAssigned(value)} selectedValue={createdOrAssigned}>
          <Option label = 'All'value={null} key = 'task-filter-created-or-assigned-all' />
          <Option label = 'Created By Me' value="CREATED" key = 'task-filter-created-or-assigned-created' />
          <Option label = 'Assigned To Me' value="ASSIGNED" key = 'task-filter-created-or-assigned-assigned' />
        </Select>
        <Select onValueChange={(value) => setOrganizationOrPersonal(value)} selectedValue={organizationOrPersonal}>
          <Option label = 'All' value={null} key = 'task-filter-organization-or-personal-all' />
          <Option label = 'Personal' value="PERSONAL" key = 'task-filter-organization-or-personal-personal' />
        </Select>
        <Select onValueChange={(value) => setOrderBy(value)} selectedValue={orderBy}>
          <Option label = 'Newest' value="createdAt_DESC" key = 'task-filter-order-by-newest' />
          <Option label = 'Oldest' value="createdAt_ASC" key = 'task-filter-order-by-oldest'/>
        </Select>
        <Button
          onPress={() => {
            modal.actions.openModal({ modal: "CreateTask", title: "Add Task", params: { tasks, variables } });
          }}
          title = 'Add Task'
        />
      </View>
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