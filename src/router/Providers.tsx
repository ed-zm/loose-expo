import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Contexts from '../contexts'
import { View, Text } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'


const LOGGED_IN = gql`
query {
  loggedIn {
    id
    firstName
    lastName
    username
  }
}`

const RenderChildren = ({ children }) => {
  const { data, error, loading } = useQuery(LOGGED_IN)
  return(
    <Contexts user = { data ? data.loggedIn : null }>
      { loading && <Text>Loading...</Text>}
      { children({ initialRouteName: data && data.loggedIn ? 'Dashboard' : 'SignIn' }) }
    </Contexts>
  )
}

const Providers = ({ client, children }) => {
  return(
    <ApolloProvider client = { client }>
      <ApolloHooksProvider client = { client }>
        <RenderChildren>
          { children }
        </RenderChildren>
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

export default Providers