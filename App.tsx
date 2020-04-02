import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { createStackNavigator } from '@react-navigation/stack'
import ConfirmEmail from './src/screens/ConfirmEmail'
import ConfirmResetPassword from './src/screens/ConfirmResetPassword'
import ResetPassword from './src/screens/ResetPassword'
import SignIn from './src/screens/SignIn'
import SignUp from './src/screens/SignUp'
import apollo from './src/config/apollo'

const Stack = createStackNavigator();

const Navigator = () => {
  const client = apollo()
  return(
    <ApolloProvider client = { client }>
    <ApolloHooksProvider client = { client }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          {/* <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
          <Stack.Screen name="ConfirmResetPassword" component={ConfirmResetPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
          <Stack.Screen name="SignIn" component={SignIn} />
          {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloHooksProvider>
    </ApolloProvider>
  )
}

export default Navigator