import React, { useEffect, useState } from 'react'
import { View, Text, Picker, TouchableOpacity } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { USERS, ASSIGN_TASK, UNASSIGN_TASK } from './index.graphql'

const Assign = ({ task }) => {
  const [ assignTo, setAssignTo ] = useState('')
  const variables: { assignedToId?: String } = {}
  if(task.assignedTo) variables.assignedToId = task.assignedTo.id
  const { data, refetch: refetchUsers } = useQuery(USERS, { variables })
  const [ assignTask, { loading: assigningTask }] = useMutation(ASSIGN_TASK)
  const [ unassignTask, { loading: unassigningTask }] = useMutation(UNASSIGN_TASK)
  useEffect(() => {
    if(data && !!data.users.length) setAssignTo(data.users[0].id)
  }, [data])
  return(
    <View>
      <View>
        <Picker onValueChange = {setAssignTo} selectedValue = {assignTo}>
          { data &&
            data.users &&
            data.users.map(m =>
              <Picker.Item label = {`${m.firstName} ${m.lastName}`}key = {m.id} value = {m.id} />
          )}
        </Picker>
        <TouchableOpacity
          onPress = {async () => {
            await assignTask({
              variables: {
                id: task.id,
                userId: assignTo
              }
            })
            await setAssignTo('')
            await refetchUsers({
              fetchPolicy: 'cache-and-network'
            })
          }}
          disabled = { assigningTask }
        >
          <Text>Assign</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Assign