import React from 'react'
import useTasks from 'loose-components/src/screens/Dashboard/Tasks'
import { TextInput, View, Text, Picker, TouchableOpacity } from 'react-native'
import TaskCard from '../../../components/TaskCard'

const Tasks = () => {
  const {
    title,
    setTitle,
    estimated,
    setEstimated,
    description,
    setDescription,
    organization,
    setOrganization,
    orgs,
    onCreateTask,
    sortedTasks
  } = useTasks()
  return(
    <View>
      <View>
        <TextInput placeholder = 'title' value = {title} onChangeText = { setTitle }/>
        <TextInput placeholder = 'estimated' value = {estimated.toString()} onChangeText = { e => setEstimated(parseInt(e, 10)) }/>
        <TextInput placeholder = 'description' value = {description} onChangeText = { setDescription }/>
        <Picker onValueChange = {setOrganization} selectedValue = {organization}>
          <Picker.Item label = 'Personal' key = 'personal-task-select' value = {''}>Personal</Picker.Item>
          { orgs &&
            orgs.organizations &&
            orgs.organizations.map(o =>
              <Picker.Item label = {o.name} key = {o.id} value = {o.id}>{o.name}</Picker.Item>
          )}
        </Picker>
        <TouchableOpacity onPress = { onCreateTask }>
          <Text>Create Task</Text>
        </TouchableOpacity>
      </View>
      <View>
        {sortedTasks.map(task =>
          <TaskCard task = { task } />
        )}
      </View>
    </View>
  )
}

export default Tasks