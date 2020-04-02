import React, { useState, useEffect, useContext } from 'react'
import { AsyncStorage, View, Text, TextInput, TouchableOpacity } from "react-native"
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { SIGN_IN, LOGGED_IN } from './index.graphql'
// import { UserContext } from '../../contexts/User'

const SignIn = () => {
//   const user = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInMutation] = useMutation(SIGN_IN)
  const [loggedIn, { data }] = useLazyQuery(LOGGED_IN)
  useEffect(() => {
    const redirect = async () => {
    //   await user.actions.setUser({ ...data.loggedIn })
    //   await router.push('/dashboard')
    }
    if(data && data.loggedIn) {
      redirect()
    }
  }, [data])
  const onSignIn = async () => {
    const response = await signInMutation({
      variables: {
        email,
        password
      }
    })
    if(response && response.data && response.data.signIn) {
      AsyncStorage.setItem('token', response.data.signIn)
      await loggedIn()
    } else {
      throw new Error('Invalid Credentials')
    }
  }
  return(
    <View>
      <TextInput onChange = {(e: any) => setEmail(e.target.value) } value = {email } placeholder = 'email' />
      <TextInput value = {password} placeholder = 'password' secureTextEntry onChange = {(e: any) => setPassword(e.target.value) } />
      <TouchableOpacity onPress = { onSignIn }>
        <Text>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn