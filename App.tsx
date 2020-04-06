import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Providers from './src/router/Providers'
import ConfirmEmail from './src/screens/ConfirmEmail'
import ConfirmResetPassword from './src/screens/ConfirmResetPassword'
import DashboardOrganization from './src/screens/Dashboard/Organization'
import DashboardOrganizations from './src/screens/Dashboard/Organizations'
import DashboardTask from './src/screens/Dashboard/Task'
import DashboardTasks from './src/screens/Dashboard/Tasks'
import DashboardTeam from './src/screens/Dashboard/Team'
import DashboardTeams from './src/screens/Dashboard/Teams'
import DashboardUser from './src/screens/Dashboard/User'
import ResetPassword from './src/screens/ResetPassword'
import SignIn from './src/screens/SignIn'
import SignUp from './src/screens/SignUp'
import apollo from './src/config/apollo'

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return(
    <Drawer.Navigator initialRouteName="Tasks">
      <Drawer.Screen name="DashboardOrganization" component={DashboardOrganization} />
      <Drawer.Screen name="DashboardOrganizations" component={DashboardOrganizations} />
      <Drawer.Screen name="DashboardTask" component={DashboardTask} />
      <Drawer.Screen name="DashboardTasks" component={DashboardTasks} />
      <Drawer.Screen name="DashboardTeam" component={DashboardTeam} />
      <Drawer.Screen name="DashboardTeams" component={DashboardTeams} />
      <Drawer.Screen name="DashboardUser" component={DashboardUser} />
    </Drawer.Navigator>
  )
}

const Navigator = () => {
  const client = apollo()
  return(
    <Providers client = { client }>
      { ({ initialRouteName }) =>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
            <Stack.Screen name="ConfirmResetPassword" component={ConfirmResetPassword} />
            <Stack.Screen name="Dashboard" component={DrawerNavigator} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      }
    </Providers>
  )
}

export default Navigator