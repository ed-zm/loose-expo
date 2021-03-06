import React from 'react'
import { AsyncStorage, View, Text, TextInput, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import useSignIn from 'loose-components/src/screens/SignIn'

const SignIn = () => {
  const navigation = useNavigation()
  const {
    email,
    setEmail,
    password,
    setPassword,
    onSignIn,
    signingIn,
    error,
    onResendVerificationEmail,
    resendingVerificationEmail,
    resendVerificationEmailError,
    resendVerificationEmailSent,
  } = useSignIn({
    callback: () => navigation.navigate('Dashboard'),
    setToken: (token) => AsyncStorage.setItem('token', token)
  })
  return(
    <View style = {{ paddingTop: 100 }}>
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