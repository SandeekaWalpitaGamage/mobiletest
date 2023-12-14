// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import AddEmpScreen from '/components/AddNewEmployee';
import EmpDetails from './components/EmpDetails';
import UpdateEmpSceen from '/components/UpdateEmployee';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="AddEmployee" component={AddEmpScreen} />
        <Stack.Screen name="ViewEmployee" component={EmpDetails} />
        <Stack.Screen name="UpdateEmployee" component={UpdateEmpSceen}/>
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
