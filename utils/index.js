
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet } from 'react-native';

const apiUrl = ""

var api  = axios.create({
    baseURL: apiUrl,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});
const defaultColors = {
    primary : '#181818',
    secundary: '#000'
}
const defaultStyles = StyleSheet.create({
    defaultHeaderStyles: {
        backgroundColor: defaultColors.primary,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 0
    },
    tituloCategoria:{
        fontWeight: '700',
        marginVertical: 10,
        fontFamily: 'Roboto'
    }
})

export {
    api,
    defaultStyles,
    defaultColors
}