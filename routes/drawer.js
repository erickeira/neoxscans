import React,{useContext, useEffect, useState} from "react";
import { View, Image,Text, Dimensions,Alert, TouchableWithoutFeedback,Linking,  Platform, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    useDrawerStatus
  } from '@react-navigation/drawer';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { Badge, Icon } from '@rneui/themed'
import { changeLibrary, configureAPI, defaultColors, defaultStyles, existsOrError } from "../utils";
import { navigationRef } from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from '@rneui/themed';
import User from '../assets/images/user.png'
import { AuthContext } from "../context";

const windowHeight = Dimensions.get('window').height; 

export default function DrawerContent(props){
    const navigation = useNavigation();
    const [appCenterVersion, setAppCenterVersion] = useState('')
    const isDrawerOpen = useDrawerStatus() === 'open';
    const currentRouteName = navigationRef?.current?.getCurrentRoute().name;
    const { handleCheckLibrary } = useContext(AuthContext)

    useEffect(() => {
        StatusBar.setBarStyle( isDrawerOpen  || currentRouteName == 'Home' ? 'light-content' : 'dark-content', true);
    },[isDrawerOpen])


    return(
        <DrawerContentScrollView 
            {...props}
        >
            <DrawerItemList {...props} />

            <DrawerItem
                label="Neox Scans"
                style={styles.drawerItem}
                onPress={async() => {
                    await changeLibrary('neox')
                    await handleCheckLibrary()
                    navigation.navigate('HomeTab')
                    navigation.navigate('Home')
                }}
                labelStyle={styles.labelStyle}
            />
            <DrawerItem
                label="Mangá Livre"
                style={styles.drawerItem}
                onPress={async() => {
                    await changeLibrary('mangalivre')
                    await handleCheckLibrary()
                    navigation.navigate('HomeTab')
                    navigation.navigate('Home')

                }}
                labelStyle={styles.labelStyle}
            />
            <View style={{display: 'flex', flexDirection : 'row', alignItems: 'center', gap: 10, marginVertical:15, marginLeft: 15}}>
                <Text
                    style={{
                        fontSize: 10,
                        color: '#666'
                    }}
                >
                    Selecione o servidor desejado
                </Text>
            </View>
        </DrawerContentScrollView>
    )
}
export const styles = StyleSheet.create({
    drawerItem:{
        paddingVertical: 5,
        marginVertical: 0,
    },
    labelStyle: { 
        color: '#fff'
    }
})