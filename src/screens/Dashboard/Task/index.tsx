import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@apollo/react-hooks'
import Assign from './components/Assign'
import Labels from './components/Labels'
import Comments from './components/Comments'
import { TASK } from './index.graphql'

const Task = () => {
  const { params: { id } } = useRoute()
  const where = id.length > 6 ? { id } : { code: id } 
  const { data } = useQuery(TASK, { variables: { where } })
  return(
    <View>
      { data && data.task &&
        <View>
          <View><Text>{data.task.title}</Text></View>
          <View><Text>{data.task.description}</Text></View>
          <View>
            {data.task.assignedTo ?
              <View>
                <Text>Assigned To: {data.task.assignedTo.firstName} {data.task.assignedTo.lastName}</Text>
              </View> :
              <View><Text>UNASSIGNED</Text></View>
            }
          </View>
          <View><Text>{moment(data.task.createdAt).format('DD/MMM/YYYY HH:mm')}</Text></View>
          <Assign task = { data.task } />
          <Labels task = { data.task } />
          <Comments task = { data.task } />
        </View>
      }
    </View>
  )
}

export default Task