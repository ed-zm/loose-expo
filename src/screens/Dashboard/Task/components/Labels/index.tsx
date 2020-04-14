import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { LABELS, ADD_LABEL } from './index.graphql'
import useTaskLabels from 'loose-components/src/screens/Dashboard/Task/components/Labels'

const Labels = ({ task }) => {
  const {
    onAddLabel,
    data,
    label,
    setLabel,
    creatingLabel,
    organizationId
  } = useTaskLabels({ task })
  return(
    <View>
      <View>
        { data && data.labels && data.labels.map(label =>
          // Label Name is conformed by ${label}-${organizationId} to make it unique per organization and keep the index in DB
          <View key = {label.id}><Text>{ label.text.split('-')[0] }</Text></View>
        )}
      </View>
      <TextInput value = {label} onChangeText = { setLabel } />
      { organizationId && <TouchableOpacity
        onPress = {onAddLabel}
        disabled = { creatingLabel }
      >
        <Text>add label</Text>
      </TouchableOpacity>}
    </View>
  )
}

export default Labels