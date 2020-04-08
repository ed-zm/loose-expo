import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@apollo/react-hooks'
import { ORGANIZATION } from './index.graphql'
import { from } from 'apollo-link'

const Organization = () => {
  const { params: { id }} = useRoute()
  const { data } = useQuery(ORGANIZATION, { variables: { id } })
  return(
    <View>
      <View>
        {data && data.organization &&
          <View key = {data.organization.id}><Text>{data.organization.name}</Text></View> 
        }
      </View>
    </View>
  )
}

export default Organization