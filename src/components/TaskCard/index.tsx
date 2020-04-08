import React, { useState } from 'react'
import { View, CheckBox, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { UPDATE_TASK } from './index.graphql'

const TaskCard = ({ task }) => {
  const [ showDescription, setShowDescription ] = useState(false)
  const [ updateTask ] = useMutation(UPDATE_TASK)
  const navigation = useNavigation()
  return(
    <View style = {{ backgroundColor: task.state === 0? 'transparent' : 'lightgray' }}>
      <CheckBox
        value = {task.state === 1 ? true : false }
        onValueChange = { () => {
          const state = task.state === 0 ? 1 : 0
          updateTask({
            variables: {
              id: task.id,
              state
            },
            optimisticResponse: {
              __typename: "Mutation",
              updateTask: {
                __typename: "Task",
                id: task.id,
                state
              }
            }
          })
        }}/>
      <TouchableOpacity onPress = { () => navigation.navigate('Task', { id: task.code })}>
        <Text>{task.code}</Text>
      </TouchableOpacity>
      <View>
        <TouchableWithoutFeedback onPress = { () => setShowDescription(!showDescription) }
        >
          <Text>{task.title}</Text>
        </TouchableWithoutFeedback>
      </View>
      { showDescription && <View><Text>{task.description}</Text></View>}
      <View><Text>{moment(task.createdAt).format('DD/MMM/YYYY HH:mm')}</Text></View>
    </View> 
  )
}

export default TaskCard