import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'
import { /*split, */ ApolloLink } from 'apollo-link'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'
let link

const create = () => {
  const httpLink = new BatchHttpLink({
    uri: 'http://134.122.82.158:8001',
    // uri: 'http://localhost:8001',
    credentials: 'same-origin'
  })
  link = httpLink
  const authLink = setContext(async () => {
    const tkn = await AsyncStorage.getItem("token")
    return {
      headers: {
        Authorization: tkn ? tkn : ''
      }
    }
  })
  // if(process.browser) {
  //   const wsLink = new WebSocketLink({
  //     uri: 'http://localhost:8001',
  //     options: {
  //       reconnect: true,
  //       timeout: 60000
  //     }
  //   })

  //   link = split(({ query}) => {
  //       //ts-ignore
  //       const { kind, operation } = getMainDefinition(query)
  //       return kind === 'OperationDefinition' && operation === 'subscription'
  //     },
  //     wsLink,
  //     httpLink
  //   )
  // }
  return new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if(graphQLErrors) {
          graphQLErrors.map(({ message }) => {
            if(true) console.log(message)
            else console.log('An Unexpected Error has occured')
          })
        }
        if(networkError) console.log('There are problems with your Internet', networkError)
      }),
      authLink.concat(link)
    ]),
    cache: new InMemoryCache({
      dataIdFromObject: o => o.id
    })
  })
}

export default () => {
  return create()
} 