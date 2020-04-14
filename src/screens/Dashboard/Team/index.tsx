import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Picker } from 'react-native'
import useTeam from 'loose-components/src/screens/Dashboard/Team'
import moment from 'moment'

const Team = () => {
  const { params: { id } } = useRoute()
  const {
		data,
		removingMember,
		addingMember,
		onRemoveMember,
		onAddMember,
		member,
		setMember,
		members
  } = useTeam({ id })
  return(
    <View>
      { data && data.team &&
        <View>
          <View><Text>{data.team.name}</Text></View>
          <View><Text>{moment(data.team.createdAt).format('DD/MMM/YYYY HH:mm')}</Text></View>
          <View><Text>Members</Text></View>
          <View>
            {data.team.users && data.team.users.map(member =>
              <View>
                <Text>{member.firstName} {member.lastName}</Text>
                <TouchableOpacity
                  onPress = {onRemoveMember}
                  disabled = { removingMember }
                >
                  <Text>remove</Text>
                </TouchableOpacity>
              </View>  
            )}
          </View>
          <View>
            <Picker onValueChange = {e => setMember(e.target.value)} selectedValue = {member}>
              { members &&
                members.users &&
                members.users.map(m =>
                  <Picker.Item label = {m.lastName} key = {m.id} value = {m.id}>{m.firstName} {m.lastName}</Picker.Item>
              )}
            </Picker>
            <TouchableOpacity
              onPress = {onAddMember}
              disabled = { addingMember }
            >
              <Text>Add Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  )
}

export default Team