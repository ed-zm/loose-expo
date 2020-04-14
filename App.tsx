import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Providers from './src/router/Providers'
import ConfirmResetPassword from './src/screens/ConfirmResetPassword'
import Organization from './src/screens/Dashboard/Organization'
import Organizations from './src/screens/Dashboard/Organizations'
import Task from './src/screens/Dashboard/Task'
import Tasks from './src/screens/Dashboard/Tasks'
import Team from './src/screens/Dashboard/Team'
import Teams from './src/screens/Dashboard/Teams'
import User from './src/screens/Dashboard/User'
import ResetPassword from './src/screens/ResetPassword'
import SignIn from './src/screens/SignIn'
import SignUp from './src/screens/SignUp'
import apollo from './src/config/apollo'
import { UserContext } from 'loose-components/src/contexts/User'

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator()

const Dashboard = createStackNavigator()

const DashboardNavigator = () => {
  // const user = useContext(UserContext)
  return(
    <Dashboard.Navigator initialRouteName = 'Drawer' screenOptions = {{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Drawer.Screen name="Organization" component={Organization} />
      <Drawer.Screen name="Task" component={Task} />
      <Drawer.Screen name="Team" component={Team} />
      <Drawer.Screen name="User" component={User} />
    </Dashboard.Navigator>
  )
}

const DrawerNavigator = () => {
  return(
    <Drawer.Navigator initialRouteName="Tasks">
      <Drawer.Screen name="Organizations" component={Organizations} />
      <Drawer.Screen name="Tasks" component={Tasks} />
      <Drawer.Screen name="Teams" component={Teams} />
      <Drawer.Screen name="My Profile" component={User} />
    </Drawer.Navigator>
  )
}

const Navigator = () => {
  const client = apollo()
  return(
    <Providers client = { client }>
      { ({ initialRouteName }) =>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRouteName} screenOptions = {{ headerShown: false }}>
            <Stack.Screen name="ConfirmResetPassword" component={ConfirmResetPassword} />
            <Stack.Screen name="Dashboard" component={DashboardNavigator} />
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