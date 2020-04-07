import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { LABELS, ADD_LABEL } from './index.graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'

const Labels = ({ task }) => {
  const [ label, setLabel ] = useState('')
  const organizationId = task.organization ? task.organization.id : null
  const { data } = useQuery(LABELS, { variables: { taskId: task.id, organizationId }, skip: !organizationId})
  const [ addLabel, { loading: creatingLabel }] = useMutation(ADD_LABEL)
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
        onPress = { async () => {
          await addLabel({
            variables: { taskId: task.id, text: `${label}-${organizationId.id}`, organizationId },
            optimisticResponse: {
              __typename: "Mutation",
              createLabel: {
                __typename: "Label",
                id: -1,
                color: "green",
                text: `${label}-${organizationId}`,
                organization: {
                  __typename: "Organization",
                  id: organizationId
                }
              }
            },
            update: (proxy, { data: { createLabel } }) => {
              const proxyData: any = proxy.readQuery({ query: LABELS, variables: { taskId: task.id, organizationId } })
              const newLabels = proxyData.labels.slice()
              const labelExists = newLabels.find(label => label.text === createLabel.text )
              if(!labelExists) {
                newLabels.push(createLabel)
                proxy.writeQuery({ query: LABELS, variables: { taskId: task.id, organizationId }, data: { labels: newLabels } })
              }
            }
          })
          await setLabel('')
        }}
        disabled = { creatingLabel }
      >
        <Text>add label</Text>
      </TouchableOpacity>}
    </View>
  )
}

export default Labels