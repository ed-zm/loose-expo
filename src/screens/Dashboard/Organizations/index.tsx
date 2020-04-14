import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import useOrganizations from 'loose-components/src/screens/Dashboard/Organizations'
import { useNavigation } from '@react-navigation/native'

const Organizations = () => {
  const navigation = useNavigation()
  const {
    onCreateOrganization,
    name,
    setName,
    data
  } = useOrganizations()
  return(
    <View>
      <View>
        <TextInput placeholder = 'organization name' value = {name} onChangeText = { setName }/>
        <TouchableOpacity onPress = { onCreateOrganization }><Text>Create Organization</Text></TouchableOpacity>
      </View>
      <View>
        {data && data.organizations && data.organizations.map(organization =>
          <View key = {organization.id}>
            <TouchableOpacity onPress = { () => navigation.navigate('Organization', { id: organization.id })}>
              <Text>{organization.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

export default Organizations