import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useSignUp from 'loose-components/src/screens/SignUp'

const SignUp = () => {
  const navigation = useNavigation()
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    onSignUp
  } = useSignUp({
    callback: navigation.navigate('SignIn')
  })
  return(
    <View>
      <TextInput value = {firstName} placeholder = 'firstName' onChange = {(e: any) => setFirstName(e.target.value) } />
      <TextInput value = {lastName} placeholder = 'lastName' onChange = {(e: any) => setLastName(e.target.value) } />
      <TextInput value = {username} placeholder = 'username' onChange = {(e: any) => setUsername(e.target.value) } />
      <TextInput value = {email} placeholder = 'email' onChange = {(e: any) => setEmail(e.target.value) } />
      <TextInput value = {password} placeholder = 'password' secureTextEntry onChange = {(e: any) => setPassword(e.target.value) } />
      <TouchableOpacity onPress = {onSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp