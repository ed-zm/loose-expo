import React, { useState, useContext } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useNavigation } from '@react-navigation/native'
import { ORGANIZATIONS, CREATE_ORGANIZATION } from './index.graphql'
import { UserContext } from 'loose-components/src/contexts/User'

const Organizations = () => {
  const navigation = useNavigation()
  const user = useContext(UserContext)
  const { data } = useQuery(ORGANIZATIONS)
  const [ createOrganization ] = useMutation(CREATE_ORGANIZATION)
  const [ name, setName ] = useState('')
  const onCreateOrganization = async () => {
    createOrganization({ variables: {
      name,
      userId: user.id
    },
    optimisticResponse: {
      __typename: 'Mutation',
      createOrganization: {
        __typename: "Organization",
        id: "-1",
        name,
        owner: {
          id: user.id,
          __typename: "User"
        }
      }
    },
    update: (proxy, { data: { createOrganization }}) => {
      const data = proxy.readQuery({ query: ORGANIZATIONS })
      // @ts-ignore
      const newOrganizations = data.organizations.slice()
      newOrganizations.push(createOrganization)
      proxy.writeQuery({ query: ORGANIZATIONS, data: { organizations: newOrganizations }})
    }
  })
  }
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