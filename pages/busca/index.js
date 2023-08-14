import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import CardMangaList from '../../components/cardMangaList';
import { api, defaultColors, defaultStyles } from '../../utils';
import { Searchbar } from 'react-native-paper';
import HeaderLeft from '../../components/headerLeft';
import { useIsFocused } from '@react-navigation/native';
import CardMangaListSkeleton from '../../components/carMangaListSkeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardBuscaList from '../../components/cardBusca';

const { height, width }  = Dimensions.get('screen');

export default function Busca({ navigation , route }){
    const [searchQuery, setSearchQuery] = React.useState(null);
    const [inputRef, setInputeRef] = useState(null)
    const categoria = route.params?.categoria
    var tempoDigitacao = 0
    function verificaTempoDeDigitacao(texto){
      setSearchQuery(texto)
      clearTimeout(tempoDigitacao)
      // tempoDigitacao = setTimeout(() => {BuscaResp() }, 400); 
    }

    useEffect(() => {
      if(categoria) getMangas()
    },[categoria])
    
    useEffect(() => {
      if( searchQuery != null ) tempoDigitacao = setTimeout(() => {getMangas(searchQuery) }, 400); 
    },[searchQuery])

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => (
                <SafeAreaView style={[ styles.headerStyle, defaultStyles.defaultHeaderStyles ]}>
                    <HeaderLeft voltar color={'#fff'}/>
                    <Searchbar
                        ref={ref => { 
                          setInputeRef(ref)
                        }}
                        placeholder="Digite sua busca..."
                        placeholderTextColor={'#666'}
                        onChangeText={verificaTempoDeDigitacao}
                        value={searchQuery}
                        style={styles.inputStyle}
                        clearIcon={true}
                        inputStyle={{color: '#fff'}}
                        theme={{ colors: { primary: '#fff', secondary: '#d1d1d1' } }} 
                    />
                </SafeAreaView>

            )
        })
    },[searchQuery])
    
    const [ mangas, setMangas] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [salvos, setSalvos] = useState([])
    const isFocused = useIsFocused()

    useEffect(() =>{
      getSalvos()
    },[isFocused])

    async function getMangas(titulo =''){
      setCarregando(true)
      try{
        const response = await api.post(`busca`, { titulo : titulo, categoria: categoria })
        if(response.data.status == 'success'){
          setMangas(response.data.resultados)
        }
        setCarregando(false)
      }catch(error){
        console.log(error.response.data)
        setCarregando(false)
      }
    }
    async function getSalvos(){
      let salvos = await AsyncStorage.getItem('salvos')
      salvos = JSON.parse(salvos) ? JSON.parse(salvos) : [];
      setSalvos(salvos)
    }

    return (
      <SafeAreaView style={styles.view}>
        <FlatList
          data={mangas}
          ListHeaderComponent={
            mangas.length > 0 ?
              <Text style={defaultStyles.tituloCategoria}>
                ({mangas.length}) {mangas.length == 1 ? 'Resultado' : 'Resultados'}
              </Text> : null
          }
          renderItem={({item, index}) => {
            let isFavoritado = salvos.find(salvo => salvo.url == item.url)?.url?.length > 0
            return (<CardBuscaList isFavoritado={isFavoritado} manga={item}/>) 
          }}
          ListEmptyComponent={
            carregando ? 
            <ActivityIndicator size={40} color={defaultColors.activeColor} style={{ marginTop: 100 }}/>
            :
            <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
                <Text allowFontScaling={ false } style={{ fontSize: 14, textAlign: 'center', color: '#fff' }}>
                    {searchQuery == null ? '' :'Nenhuma scan encontrado!'} 
                </Text>
            </View>
            

          }
          keyExtractor={(item, index) => {  return `${item.numero}-${index}` }}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    view: {
      margin: 10,
    },
    headerStyle:{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        width: '100%',
    },
    inputStyle:{
        flex: 1,
        width: width,
        backgroundColor: 'transparent',
        color: '#fff',
        paddingVertical: 0,
        marginVertical: 0,
        marginTop: 0,
    }
});