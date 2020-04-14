import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, Picker, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import useTeams from 'loose-components/src/screens/Dashboard/Teams'

const Teams = () => {
  const {
    name,
    setName,
    organization,
    setOrganization,
    orgs,
    onCreateTeam,
    creatingTeam,
    data
  } = useTeams()
  const navigation = useNavigation()
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