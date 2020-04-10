import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Contexts from 'loose-components/src/contexts'
import { ActivityIndicator } from 'react-native'
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
  if(loading) return(<ActivityIndicator />)
  return(
    <Contexts user = { data ? data.loggedIn : null }>
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