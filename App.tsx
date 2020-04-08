import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
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
import { UserContext } from './src/contexts/User'

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator()

const Dashboard = createStackNavigator()

const DashboardNavigator = () => {
  const user = useContext(UserContext)
  return(
    <Dashboard.Navigator initialRouteName = 'Drawer' screenOptions = {{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Drawer.Screen name="Organization" component={DashboardOrganization} />
      <Drawer.Screen name="Task" component={DashboardTask} />
      <Drawer.Screen name="Team" component={DashboardTeam} />
      <Drawer.Screen name="User" component={DashboardUser} initialParams = {{ id: user.id }}/>
    </Dashboard.Navigator>
  )
}

const DrawerNavigator = () => {
  return(
    <Drawer.Navigator initialRouteName="Tasks">
      <Drawer.Screen name="Organizations" component={DashboardOrganizations} />
      <Drawer.Screen name="Tasks" component={DashboardTasks} />
      <Drawer.Screen name="Teams" component={DashboardTeams} />
      <Drawer.Screen name="My Profile" component={DashboardUser} />
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
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
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