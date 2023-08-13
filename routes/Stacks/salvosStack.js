import React, { useEffect } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRefContext, useIsFocused, useNavigationState, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import User from '../../assets/images/user.png'

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
          // headerLeft: () => (
          //   <TouchableOpacity
          //     // onPress={() => navigation.openDrawer()}
          //     hitSlop={{ right: 20, bottom: 20}}
          //   >
          //     <Avatar
          //       size={32}
          //       rounded
          //       source={User}
          //       containerStyle={{marginLeft: 12}}
          //     />
          //   </TouchableOpacity>
          // ),
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
