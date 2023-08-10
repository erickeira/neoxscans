import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

import HomeStack from './Stacks/homeStack';


const Tab = createBottomTabNavigator()

const TabNavigation = ({ navigation }) =>{
    return(
      <Tab.Navigator 
        screenOptions={{
          tabBarActiveTintColor:  'blue' , 
          labelStyle: { fontSize: 12 }, 
          tabBarHideOnKeyboard: 'true',
        }} 
      >
        <Tab.Screen 
          name="HomeTab"  
          component={ HomeStack }   
          options={{ 
            headerTitleStyle: { opacity: 0 }, 
            headerShown: false,
            tabBarLabel: 'Início',
            tabBarIcon: ({size, color}) => ( <Icon name="home" size={24}  color={color}/>)
          }}  
        />
      </Tab.Navigator>  
    )
  } 

export default TabNavigation;


