import React, { useEffect } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRefContext, useIsFocused, useNavigationState, useRoute } from '@react-navigation/native';

import Home from '../../pages/home'; 

const Stack = createStackNavigator();

import { navigationRef  } from '../../App'

const HomeStack = ({ navigation }) => {
  const currentRouteName = navigationRef?.current?.getCurrentRoute().name;
  const route = useRoute()
  const fullScreens = [ ""]
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: fullScreens.includes(currentRouteName) ? 'none' : 'block' }
    })
  },[ route ])

  return ( 
  <Stack.Navigator >
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: null,
          headerShown: true, 
          headerTransparent: true,
        }}
      />
     
    </Stack.Navigator>
  )
}


export default HomeStack;
