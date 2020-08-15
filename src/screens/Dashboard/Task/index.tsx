import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'
import useTask from 'loose-components/src/screens/Dashboard/Task'
import { useRoute } from '@react-navigation/native'
import Labels from './components/Labels'
import Comments from './components/Comments'

const Task = () => {
  const { params: { id } } = useRoute()
  const {
    task,
    loading,
    error
  } = useTask({ id })
  return(
    <View>
      { task &&
        <View>
          <View><Text>{task.title}</Text></View>
          <View><Text>{task.description}</Text></View>
          <View>
            {task.assignedTo ?
              <View>
                <Text>Assigned To: {task.assignedTo.firstName} {task.assignedTo.lastName}</Text>
              </View> :
              <View><Text>UNASSIGNED</Text></View>
            }
          </View>
          <View><Text>{moment(task.createdAt).format('DD/MMM/YYYY HH:mm')}</Text></View>
          <Labels task = { task } />
          <Comments task = { task } />
        </View>
      }
    </View>
  )
}

export default Task