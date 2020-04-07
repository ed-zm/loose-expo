import React, { useState, useContext } from 'react'
import { TextInput, View, Text, Picker, TouchableOpacity } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { TASKS, CREATE_TASK, ORGANIZATIONS } from './index.graphql'
import { UserContext } from '../../../contexts/User'
import TaskCard from '../../../components/TaskCard'

interface CreateTaskVariables {
  title: string
  description: string
  state: Number
  estimated: Number
  createdBy: any
  organization?: any
}

const Tasks = () => {
  const user = useContext(UserContext)
  const { data } = useQuery(TASKS)
  console.log("--------------------DATA", data, user)
  const { data: orgs } = useQuery(ORGANIZATIONS)
  const [ createTask ] = useMutation(CREATE_TASK)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ organization, setOrganization ] = useState('')
  const [ estimated, setEstimated ] = useState(0)
  const sortedTasks = data && data.tasks ? data.tasks.sort((a, b) => a.state - b.state) : []
  const onCreateTask = async () => {
    const variables: CreateTaskVariables = {
      title,
      description,
      state: 0,
      estimated,
      createdBy: { connect: { id: user.id } },
    }
    if(organization) variables.organization = { connect: { id: organization }}
    createTask({
      variables: { data: variables },
      optimisticResponse: {
        __typename: "Mutation",
        createTask: {
          __typename: "Task",
          id: "-1",
          title,
          state: 0,
          estimated,
          code: 'AAAA',
          description,
          createdBy: {
            __typename: "User",
            id: user.id
          },
          organization: !organization ? null : {
            __typename: "Organization",
            id: organization
          },
          createdAt: new Date().toISOString()
        }
      },
      update: (proxy, { data: { createTask }}) => {
        const data = proxy.readQuery({ query: TASKS })
        //@ts-ignore
        const newTasks = sortedTasks.slice()
        newTasks.push(createTask)
        proxy.writeQuery({ query: TASKS, data: { tasks: newTasks } })
      }
    })
  }
  return(
    <View>
      <View>
        <TextInput placeholder = 'title' value = {title} onChangeText = { setTitle }/>
        <TextInput placeholder = 'estimated' value = {estimated.toString()} onChangeText = { e => setEstimated(parseInt(e, 10)) }/>
        <TextInput placeholder = 'description' value = {description} onChangeText = { setDescription }/>
        <Picker onValueChange = {e => setOrganization} selectedValue = {organization}>
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