
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet } from 'react-native';

const apiUrl = "https://neoxscans.vercel.app/api/"

var api  = axios.create({
    baseURL: apiUrl,
    headers: { 'Content-Type': 'application/json' },
});
const defaultColors = {
    primary : '#262626',
    secundary: '#181818',
    activeColor: '#AD1313'
}
const defaultStyles = StyleSheet.create({
    defaultHeaderStyles: {
        backgroundColor: defaultColors.primary,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 6
    },
    tituloCategoria:{
        fontWeight: '700',
        color: '#666',
        marginVertical: 10,
        fontFamily: 'Roboto'
    }
})


async function SalvarScan(scan){
    let salvo = false
    let salvos = await AsyncStorage.getItem('salvos')
     salvos = JSON.parse(salvos) ? JSON.parse(salvos) : [];
     let isSalvo = salvos.find(item => item.url == scan.url)
     if(isSalvo){
         salvos = salvos.filter(item => item.url != scan.url)
     }else{
         salvos.push(scan)
         salvo = true
     }
     await AsyncStorage.setItem('salvos', JSON.stringify(salvos))
     return salvo
 }

 async function SalvarLeitura(scan, capitulo){
    let salvo = false
    let lendo = await AsyncStorage.getItem('lendo')
     lendo = JSON.parse(lendo) ? JSON.parse(lendo) : [];
     let isSalvo = lendo.find(item => item.url == scan.url)
     if(isSalvo) lendo = lendo.filter(item => item.url != scan.url)
        lendo.push({
            ...scan,
            ...{ capitulo }
        })
        salvo = true
     

     await AsyncStorage.setItem('lendo', JSON.stringify(lendo))
     return salvo
 }

 async function RemoverLeitura(scan){
    let removido = false
    let lendo = await AsyncStorage.getItem('lendo')
     lendo = JSON.parse(lendo) ? JSON.parse(lendo) : [];
     let isSalvo = lendo.find(item => item.url == scan.url)
     if(isSalvo) {
        lendo = lendo.filter(item => item.url != scan.url)
        removido = true
    }
     await AsyncStorage.setItem('lendo', JSON.stringify(lendo))
     return removido
 }
 
 async function GetLeitura(manga){
    let lendo = await AsyncStorage.getItem('lendo')
    lendo = JSON.parse(lendo) ? JSON.parse(lendo) : [];
    let continueManga = lendo.find(item => item.url == manga.url);
    return continueManga
 }
 
 async function GetLeituras(manga){
    let lendo = await AsyncStorage.getItem('lendo')
    lendo = JSON.parse(lendo) ? JSON.parse(lendo) : [];
    return lendo.reverse()
 }
 
async function MarcarCapituloLido(manga, capitulo){
    let salvo = false
    let lido = await AsyncStorage.getItem('lido')
    lido = JSON.parse(lido) ? JSON.parse(lido) : [];
    let isSalvo = lido.find(item => item.url == manga.url)
    if(!isSalvo) {
        lido.push({
            ...manga,
            ...{ lido : [ capitulo ] }
        })
    }else{
        if(!isSalvo?.lido?.includes(capitulo)){
            isSalvo?.lido.push(capitulo)
            lido = lido.filter(item => item.url != manga.url)
            lido.push(isSalvo)
            salvo = true
        }
    }
    
    await AsyncStorage.setItem('lido', JSON.stringify(lido))
    return salvo
} 

async function GetLidos(manga){
    let lido = await AsyncStorage.getItem('lido')
    lido = JSON.parse(lido) ? JSON.parse(lido) : [];
    let mangaLido = lido.find(item => item.url == manga.url);
    return mangaLido
}

export {
    api,
    defaultStyles,
    defaultColors,
    SalvarScan,
    SalvarLeitura,
    RemoverLeitura,
    GetLeitura,
    GetLeituras,
    MarcarCapituloLido,
    GetLidos
}