import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import moment from 'moment'
import useTaskComments from 'loose-components/src/screens/Dashboard/Task/components/Comments'

const Comments = ({ task }) => {
  const {
    data,
    comment,
    setComment,
    creatingComment,
    onCreateComment,
    setMentions
  } = useTaskComments({ task })
  return(
    <View>
      { data && data.comments && data.comments.map(({ id, user: { firstName, lastName }, text, createdAt }) => 
        <View key = {id}>
          <View><Text>{firstName} {lastName}</Text></View>
          <View><Text>{text}</Text></View>
          <View><Text>{moment(createdAt).format('DD MMM YYYY HH:mm:ss')}</Text></View>
        </View>
      )}
      <TextInput
        numberOfLines = { 5 }
        value = {comment}
        onChangeText = { async e => {
          const value = e
          const found = value.match(/([@][\w_-]+)/gi)
          if(found) {
            await setMentions(found)
          }
          await setComment(value)
        }}
      />
      <TouchableOpacity 
        onPress = {onCreateComment}
        disabled = { creatingComment }
      >
        <Text>comment</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Comments