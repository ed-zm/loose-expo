import React from 'react'
import { View, Text, Picker, TouchableOpacity } from 'react-native'
import useTaskAssign from 'loose-components/src/screens/Dashboard/Task/components/Assign'

const Assign = ({ task }) => {
  const {
    assignTo,
    setAssignTo,
    data,
    assigningTask,
    onAssignTask
  } = useTaskAssign({ task })
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
          onPress = {onAssignTask}
          disabled = { assigningTask }
        >
          <Text>Assign</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Assign