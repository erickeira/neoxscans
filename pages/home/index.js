import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Image, ActivityIndicator,Dimensions,Animated } from 'react-native';
import CardMangaList from '../../components/cardMangaList';
import { GetLeituras, api, defaultColors, defaultStyles } from '../../utils';
import CardMangaContinue from '../../components/cardMangaContinue';
import Chip from '../../components/chip';
import axios from 'axios';
import CardMangaListSkeleton from '../../components/carMangaListSkeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../context';

const { height, width }  = Dimensions.get('screen');

export default function Home(){
    const { library } = useContext(AuthContext)
    const [ mangas, setMangas] = useState([])
    const [lendo, setLendo] = useState([])
    const [pagina, setPagina] = useState(0)
    const [carregando, setCarregando] = useState(true)
    const [carregandoMais, setCarregandoMais] = useState(false)
    const [ enReached , setEnReached ] = useState(false)
    const [ showGrid, setShowGrid] = useState(false)
    const [salvos, setSalvos] = useState([])
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const [ showIrTopo, setShowIrTopo] = useState(false)
    const [ posicaoNaTela, setPosicaoNaTela ] = useState(0)
    const [listRef, setListRef] = useState(null)


    const upButtonHandler = () => {
      listRef?.scrollToOffset({ 
        offset: 0, 
        animated: true 
      });
      setShowIrTopo(false)
    };

    useEffect(() =>{
      getSalvos()
      if(isFocused) {
        handleGetLeituras()
      }
    },[isFocused])

    async function handleGetMangas(){
      setCarregando(true)
      if(library == 'neox')  getMangas(0)
      if(library == 'mangalivre') getMangasLivre(0)
    }

    useEffect(() => {
      handleGetMangas()
    },[library])


    async function handleGetLeituras(){
      let auxLendo = await GetLeituras()
      setLendo(auxLendo)
    }
    async function getMangas(pag = pagina){
      try{
        console.log('getneox')
        const response = await api.get(`https://neoxscans.vercel.app/api/page/${pag + 1}`)
        if(response.data.status == 'success' && response.data?.resultados?.length > 0 ){
          setMangas([...mangas, ...response.data.resultados] )
          setPagina(pag + 1)
        }else{
          setEnReached(true)
        }
        setCarregandoMais(false)
        setCarregando(false)
      }catch(error){
        setEnReached(true)
        setCarregando(false)
        setCarregandoMais(false)
      }
    }
    async function getMangasLivre(pag = pagina){
      try{
        console.log('getmangalivre')
        const response = await api.get(`http://192.168.1.30:8080/recents/${pag + 1}`)
        if(response.data?.mangas?.length > 0 ){
          let auxMangas = pag == 0 ? [] : mangas
          setMangas([...auxMangas, ...response.data.mangas] )
          setPagina(pagina + 1)
        }else{
          setEnReached(true)
        }
        setCarregandoMais(false)
        setCarregando(false)
      }catch(error){
        console.log(error)
        setEnReached(true)
        setCarregando(false)
        setCarregandoMais(false)
      }
    }

    async function getSalvos(){
      let salvos = await AsyncStorage.getItem('salvos')
      salvos = JSON.parse(salvos) ? JSON.parse(salvos) : [];
      setSalvos(salvos)
    }

    const scrollHandler = event => {
      const offsetY = parseInt(event.nativeEvent.contentOffset.y);
      if (offsetY > posicaoNaTela && showIrTopo) {
        setShowIrTopo(false);
      } else if (offsetY < posicaoNaTela && !showIrTopo && (posicaoNaTela > height)) {
        setShowIrTopo(true);
      }
      setPosicaoNaTela(offsetY)
    };

    return (
        <SafeAreaView style={styles.view}>
          <FlatList
            data={mangas}
            ref={(ref) => {setListRef(ref)}}
            onScroll={scrollHandler}
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
                <View style={styles.containerTopoCapitulos}>
                  <Text style={[defaultStyles.tituloCategoria]}>
                    Últimas atualizações
                  </Text>
                  <TouchableOpacity onPress={() => setShowGrid(!showGrid)} style={styles.botaoOrdenar} hitSlop={{left: 20, right: 20, bottom: 5, top: 10}}>
                    {
                      showGrid ?
                      <Icon name="view-list" type="MaterialIcons" color={'#fff'}/>
                      :
                      <Icon name="grid-view" type="MaterialIcons" color={'#fff'}/>
                    }
                  </TouchableOpacity>
                </View>
              </View>
            )}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              let isFavoritado = salvos.find(salvo => salvo.url == item.url)?.url?.length > 0
              return (<CardMangaList isFavoritado={isFavoritado} grid={showGrid}  manga={item}/>) 
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
            onEndReached={() => {
              if(!carregandoMais && !enReached){
                setCarregandoMais(true)
                getMangas()
              }
            }}
            ListFooterComponent={() => {
              if(!enReached) return (
                  <ActivityIndicator color={defaultColors.activeColor} size={30} style={{flex: 1, marginVertical: 15}}/>
              )
              return null
            }}
          />
          {
            showIrTopo ? 
            <Animated.View>
                <Chip
                  style={{
                    paddingVertical: 10,
                    position: 'absolute',
                    zIndex: 10,
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                  }}
                  icon={<Icon name="arrow-upward" type="MaterialIcons" color={"#fff"}/>}
                  titulo={`Ir para o topo`}
                  onPress={upButtonHandler}
                />
            </Animated.View>
            : null

          }
        
               
              
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
    },
    containerTopoCapitulos:{
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginHorizontal: 8,
      marginVertical: 10,
      alignItems: 'center'
    },
    botaoOrdenar: {
      borderWidth: 0.3,
      borderColor: '#fff',
      paddingHorizontal: 23,
      paddingVertical: 4,
      borderRadius: 4
    },
});