
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiUrl = ""

var api  = axios.create({
    baseURL: apiUrl,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

export {
    api
}