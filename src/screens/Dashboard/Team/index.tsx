import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Picker } from 'react-native'
import moment from 'moment'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { TEAM, ORGANIZATION_MEMBERS, ADD_MEMBER, REMOVE_MEMBER } from './index.graphql'

const Team = ({ id }) => {
  const navigation = useNavigation()
  const [ member, setMember ] = useState('')
  const { data } = useQuery(TEAM, { variables: { id }})
  const [ addMember, { loading: addingMember }] = useMutation(ADD_MEMBER)
  const [ removeMember, { loading: removingMember }] = useMutation(REMOVE_MEMBER)
  const [ organizationMembersQuery, { data: members, refetch: refetchOrganizationMembers }] = useLazyQuery(ORGANIZATION_MEMBERS)
  useEffect(() => {
    if(data && data.team) {
      organizationMembersQuery({ variables: {
        teamId: data.team.id,
        organizationId: data.team.organization.id
      }})
    }
  }, [data])
  useEffect(() => {
    if(members && !!members.users.length) setMember(members.users[0].id)
  }, [members])
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
                  onPress = {async () => {
                    await removeMember({ variables: {
                      teamId: data.team.id,
                      memberId: member.id
                    }})
                    await refetchOrganizationMembers({
                      fetchPolicy: 'cache-and-network'
                    })
                  }}
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
              onPress = {async () => {
                await addMember({
                  variables: {
                    teamId: data.team.id,
                    memberId: member
                  }
                })
                await setMember('')
                await refetchOrganizationMembers({
                  fetchPolicy: 'cache-and-network'
                })
              }}
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