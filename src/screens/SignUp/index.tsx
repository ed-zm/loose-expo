import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_UP } from './index.graphql'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [signUpMutation, { data }] = useMutation(SIGN_UP)
  const onSignUp = async () => {
    const signedUp = await signUpMutation({
      variables: {
        email,
        password,
        firstName,
        lastName,
        username
      }
    })
    if(signedUp) {
    //   router.push('/sign-in')
    }
  }
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