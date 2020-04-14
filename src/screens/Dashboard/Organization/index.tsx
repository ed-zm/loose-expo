import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import useOrganization from 'loose-components/src/screens/Dashboard/Organization'

const Organization = () => {
  const { params: { id }} = useRoute()
  const {
    data
  } = useOrganization({ id })
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