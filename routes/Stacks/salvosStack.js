import React, { useEffect } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRefContext, useIsFocused, useNavigationState, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';


const Stack = createStackNavigator();

import { navigationRef  } from '../../App'
import { defaultStyles } from '../../utils';
import { Icon } from '@rneui/themed';


import Salvos from '../../pages/salvos';


const SalvosStack = ({ navigation }) => {
  const currentRouteName = navigationRef?.current?.getCurrentRoute().name;
  const route = useRoute()
  const fullScreens = [""]
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: fullScreens.includes(currentRouteName) ? 'none' : 'block' }
    })
  },[ route ])
  
  return ( 
  <Stack.Navigator >
      <Stack.Screen 
        name="Home" 
        component={Salvos} 
        options={{
          headerTitle: 'Salvos',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Avatar
              size={32}
              rounded
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
              containerStyle={{marginLeft: 12}}
            />
          ),
          headerShown: true, 
          // headerTransparent: true,
          headerStyle: defaultStyles.defaultHeaderStyles,
          headerTintColor: '#fff'      
        }}
      />

    </Stack.Navigator>
  )
}


export default SalvosStack;
