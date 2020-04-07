import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@apollo/react-hooks'
import { ORGANIZATION } from './index.graphql'
import { from } from 'apollo-link'

const Organization = ({ id }) => {
  const navigation = useNavigation()
  const { data } = useQuery(ORGANIZATION, { variables: { id } })
  return(
    <View>
      <View>
        {data && data.organization &&
          <View key = {data.organization.id}>{data.organization.name}</View> 
        }
      </View>
    </View>
  )
}

export default Organization