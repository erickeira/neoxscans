import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import CardMangaList from '../../components/cardMangaList';
import { GetLeituras, api, defaultStyles } from '../../utils';
import CardMangaContinue from '../../components/cardMangaContinue';
import Chip from '../../components/chip';
import axios from 'axios';
import CardMangaListSkeleton from '../../components/carMangaListSkeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function Home(){
    const [ mangas, setMangas] = useState([])
    const [lendo, setLendo] = useState([])
    const [pagina, setPagina] = useState(0)
    const [carregando, setCarregando] = useState(true)
    const [salvos, setSalvos] = useState([])
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    useEffect(() =>{
      getSalvos()
      if(isFocused) handleGetLeituras()
    },[isFocused])

    useEffect(() => {
      getMangas()
    },[])

    async function handleGetLeituras(){
      let auxLendo = await GetLeituras()
      setLendo(auxLendo)
    }

    async function getMangas(){
      try{
        const response = await api.get(`page/${pagina + 1}`)
        if(response.data.status == 'success'){
          setMangas(response.data.resultados)
          setPagina(pagina + 1)
        }
        setCarregando(false)
      }catch(error){
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
            ListHeaderComponent={(
              <View >
                {
                  lendo.length > 0 ?
                  <Text style={defaultStyles.tituloCategoria}>
                    Continue lendo 
                  </Text>
                  : null
                }
                <FlatList
                  data={lendo}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <CardMangaContinue
                        manga={item}
                        callbackrefresh={() => handleGetLeituras()}
                      />
                    ) 
                  }}
                />
                <Text style={defaultStyles.tituloCategoria}>
                  Categorias
                </Text>
                 <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tags}>
                  <Chip
                    titulo={`Ação`}
                    onPress={() => navigation.navigate('Busca',{ categoria: 'cao' })}
                  />
                  <Chip
                    titulo={`Artes Marcias`}
                    onPress={() => navigation.navigate('Busca',{ categoria: 'artes-marciais' })}
                  />
                  <Chip
                    titulo={`Aventura`}
                    onPress={() => navigation.navigate('Busca',{ categoria: 'aventura' })}
                  />
                  <Chip
                    titulo={`Isekai`}
                    onPress={() => navigation.navigate('Busca',{ categoria: 'isekai' })}
                  />
                  <Chip
                    titulo={`Regressão`}
                    onPress={() => navigation.navigate('Busca',{ categoria: 'regressao' })}
                  />
                  <Chip
                    titulo={`Torre`}
                    onPress={() => navigation.navigate('Busca',{ categoria: 'torre' })}
                  />
                      
                </ScrollView> 

                <Text style={defaultStyles.tituloCategoria}>
                  Últimas atualizações
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              let isFavoritado = salvos.find(salvo => salvo.url == item.url)?.url?.length > 0
              return (<CardMangaList isFavoritado={isFavoritado} manga={item}/>) 
            }}
            ListEmptyComponent={
              carregando ? 
              <>
                <CardMangaListSkeleton/>
                <CardMangaListSkeleton/>
                <CardMangaListSkeleton/>
              </>

              :
              <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
                  <Text allowFontScaling={ false } style={{ fontSize: 14, textAlign: 'center', color: '#fff' }}>
                      Nenhum manga publicado!
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
    tags: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10
    },
    tag: {
      marginRight: 10,
    }
});