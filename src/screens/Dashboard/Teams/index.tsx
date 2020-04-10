import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, Picker, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { TEAMS, CREATE_TEAM, ORGANIZATIONS } from './index.graphql'
import { UserContext } from 'loose-components/src/contexts/User'

const Teams = () => {
  const user = useContext(UserContext)
  const { data } = useQuery(TEAMS)
  const navigation = useNavigation()
  const { data: orgs } = useQuery(ORGANIZATIONS)
  const [ createTeam, { loading: creatingTeam } ] = useMutation(CREATE_TEAM)
  const [ organization, setOrganization ] = useState('')
  const [ name, setName ] = useState('')
  useEffect(() => {
    if(orgs && !!orgs.organizations.length) {
      setOrganization(orgs.organizations[0].id)
    }
  }, [orgs])
  const onCreateTeam = async () => {
    createTeam({
      variables: {
        organizationId: organization,
        name
      },
      optimisticResponse: {
        __typename: "Mutation",
        createTeam: {
          __typename: "Team",
          id: "-1",
          name
        }
      },
      update: (proxy, { data: { createTeam }}) => {
        const data = proxy.readQuery({ query: TEAMS })
        //@ts-ignore
        const newTeams = data.teams.slice()
        newTeams.push(createTeam)
        proxy.writeQuery({ query: TEAMS, data: { teams: newTeams } })
      }
    })
  }
  return(
    <View>
      <TextInput placeholder = 'name' value = {name} onChangeText = { setName }/>
      <Picker onValueChange = {e => setOrganization} selectedValue = {organization}>
        <Picker.Item label = 'Personal' key = 'personal-task-select' value = {''}>Personal</Picker.Item>
        { orgs &&
          orgs.organizations &&
          orgs.organizations.map(o =>
            <Picker.Item label = {o.name} key = {o.id} value = {o.id}>{o.name}</Picker.Item>
        )}
      </Picker>
      <TouchableOpacity onPress = { onCreateTeam } disabled = { creatingTeam || !organization }><Text>Create Team</Text></TouchableOpacity>
      <View>
        { data && data.teams && data.teams.map(team =>
          <View>
            <TouchableWithoutFeedback onPress = { () => navigation.navigate('Team') }><Text>{team.name}</Text></TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  )
}

export default Teams