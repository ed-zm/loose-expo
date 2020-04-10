import React, { useState, useEffect, useContext } from 'react'
import { AsyncStorage, View, Text, TextInput, TouchableOpacity } from "react-native"
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useNavigation } from '@react-navigation/native'
import { SIGN_IN, LOGGED_IN } from './index.graphql'
import { UserContext } from 'loose-components/src/contexts/User'

const SignIn = () => {
  const user = useContext(UserContext)
  const navigation = useNavigation()
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
  useEffect(() => {
    if(user) navigation.navigate('Dashboard')
  }, [user])
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
      navigation.navigate('Dashboard')
    } else {
      throw new Error('Invalid Credentials')
    }
  }
  return(
    <View>
      <TextInput onChangeText = { setEmail } value = {email } placeholder = 'email' />
      <TextInput value = {password} placeholder = 'password' secureTextEntry onChangeText = { setPassword } />
      <TouchableOpacity onPress = { onSignIn }>
        <Text>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn