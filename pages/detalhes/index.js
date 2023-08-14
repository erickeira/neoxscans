import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { GetLidos, SalvarScan, api, defaultColors, defaultStyles } from '../../utils';
import CardDetails from '../../components/cardDetails';
import { Avatar, Icon, ListItem } from '@rneui/base';
import { Skeleton } from '@rneui/themed';
import AutoHeightImage from 'react-native-auto-height-image';
import { useIsFocused } from '@react-navigation/native';

export default function Detalhes({ navigation,  route }){
    const [ favoritado, setFavoritado ] = useState(route.params?.isFavoritado)
    const [capitulosLidos, setCapituloLidos] = useState([])
    const [ carregando, setCarregando ] = useState(true)
    const [ mudandoOrdem, setMudandoOrdem ] = useState(false)
    const { params } = route
    const manga = params?.manga
    const [ mangaDetalhes, setMangaDetalhes] = useState({})
    const isFocused = useIsFocused()
    const [ capitulosRef, setCapitulosRef ] = useState(null)
    const capitulo = route.params?.capitulo

    async function handleFavoritar(){
      const salvo = await SalvarScan(manga)
      setFavoritado(salvo)
    }

    function mudarOrdem(){
      setMudandoOrdem(true)
      let auxMangaDetalhes = mangaDetalhes
      auxMangaDetalhes.capitulos = auxMangaDetalhes.capitulos.reverse()
      setMangaDetalhes(auxMangaDetalhes)
      setTimeout(() => {
        setMudandoOrdem(false)
      }, 10);
    }

    async function handleGetLidos(){
      let lidos = await GetLidos(route.params?.manga)
      lidos = lidos?.lido
      setCapituloLidos(lidos)
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: manga?.titulo,
            headerRight: () => (
                <TouchableOpacity hitSlop={{ left: 20, bottom: 20}}  onPress={() => handleFavoritar()} style={styles.containerFavorite}>
                    {
                        favoritado ?
                        <Icon name="bookmark" type="Ionicons" color={defaultColors.activeColor} size={30}/> 
                        :
                        <Icon name="bookmark-outline" type="Ionicons" color="#fff" size={30}/>
                    }
                </TouchableOpacity>
            )
        })
    },[favoritado, manga])


    useEffect(() => {
      getManga()
    },[])

    useEffect(() => {
      handleGetLidos()
    },[isFocused])

    async function getManga(){
      try{
        const response = await api.post(`detalhes`, {
          url : manga.url
        })
        if(response.data.status == 'success'){
          setMangaDetalhes(response.data.resultado)
        }
        setCarregando(false)
      }catch(error){
        setCarregando(false)
      }

    }

    return (
        <SafeAreaView style={styles.view}>
          <FlatList
            data={mudandoOrdem ? mangaDetalhes?.capitulos.slice(0, -1) : mangaDetalhes?.capitulos} // só existe esse ternário pra forçar atualização
            ref={ref => setCapitulosRef(ref)}
            ListHeaderComponent={(
              <View >
               <CardDetails
                  manga={mangaDetalhes}
                  carregando={carregando}
                />
                <View style={styles.containerTopoCapitulos}>
                  <Text style={[defaultStyles.tituloCategoria]}>
                    Capitulos
                  </Text>
                  <TouchableOpacity onPress={() => mudarOrdem()} style={styles.botaoOrdenar} hitSlop={{left: 20, right: 20, bottom: 5, top: 10}}>
                    <Icon name="swap-vert" type="MaterialIcons" color={'#fff'}/>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            renderItem={({item, index}) => {
              let capitulo =  parseInt(item.capitulo.replace('Cap. ', '')) || (mangaDetalhes?.capitulos?.length - (index + 1));
              let capituloLido = capitulosLidos?.includes(parseInt(item.capitulo.replace('Cap. ', '')))
              return (
                <TouchableOpacity onPress={() => navigation.navigate(`Visualizacao`, { capitulo : capitulo, url : manga?.url, manga: manga})}>
                  <ListItem containerStyle={styles.itemList}>
                      {/* <Avatar 
                        size={45}
                        rounded
                        source={{ uri: item.image ||  "https://neoxscans.net/wp-content/uploads/2022/05/Logo_Site_PSD_Branco_copiar_copy-2.png" }}
                      /> */}
                      <AutoHeightImage
                            width={40}
                            source={{uri: item.image ||  "https://neoxscans.net/wp-content/uploads/2022/05/Logo_Site_PSD_Branco_copiar_copy-2.png"}}
                            style={{borderRadius: 5}}
                      />
                      <ListItem.Content>
                          <ListItem.Title style={[styles.itemListTitulo,{ color : capituloLido ? '#666' : '#fff'}]}>
                            Cap. {item.capitulo}
                          </ListItem.Title>
                      </ListItem.Content>
                      {
                        item.data == 'up' ?
                        <Image 
                            source={{ uri: 'https://neoxscans.net/wp-content/uploads/2022/08/Botao-copiaa.png'}} 
                            width={20}
                            height={20}
                          />
                        :
                        <ListItem.Subtitle 
                            right={true} 
                            style={[styles.itemListData,{ color : capituloLido ? '#666' : '#fff'}]}
                        >
                            {item.data}
                        </ListItem.Subtitle>
                      }
                     
                      <ListItem.Chevron />
                  </ListItem>
                </TouchableOpacity>
               
              )
            }}
            ListEmptyComponent={
              carregando ?
              <>
                <ListItem containerStyle={styles.itemList}>
                    <Skeleton animation="pulse" width={40} height={50} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.itemListTitulo}>
                          <Skeleton animation="pulse" width={60} height={20} />
                        </ListItem.Title>
                    </ListItem.Content>

                      <ListItem.Subtitle 
                          right={true} 
                          style={styles.itemListData}
                      >
                          <Skeleton animation="pulse" width={100} height={20} />
                      </ListItem.Subtitle> 
                    <ListItem.Chevron />
                </ListItem>
                <ListItem containerStyle={styles.itemList}>
                    <Skeleton animation="pulse" width={40} height={50} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.itemListTitulo}>
                          <Skeleton animation="pulse" width={60} height={20} />
                        </ListItem.Title>
                    </ListItem.Content>

                      <ListItem.Subtitle 
                          right={true} 
                          style={styles.itemListData}
                      >
                          <Skeleton animation="pulse" width={100} height={20} />
                      </ListItem.Subtitle> 
                    <ListItem.Chevron />
                </ListItem>
              </>
              :
              (
                mudandoOrdem ? 
                <ActivityIndicator color={defaultColors.activeColor} size={40} style={{flex : 1, marginTop: 100}}/>
                :
                <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
                    <Text allowFontScaling={ false } style={{ fontSize: 14, textAlign: 'center', color: '#fff' }}>
                        Mangá não encontrado!
                    </Text>
                </View>
              )

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
    containerFavorite:{
        marginRight: 20
    },
    containerTopoCapitulos:{
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginHorizontal: 10,
      marginTop: 10,
      alignItems: 'center'
    },
    botaoOrdenar: {
      borderWidth: 0.3,
      borderColor: '#fff',
      paddingHorizontal: 23,
      paddingVertical: 4,
      borderRadius: 4
    },
    itemList: {
        backgroundColor: 'transparent',
        paddingVertical: 15,
        paddingHorizontal: 0
    },
    itemListContent:{
      flexDirection: 'row', 
      justifyContent: 'flex-start',
      alignItems: 'center', 
      gap: 10,
    },
    itemListTitulo: {
      color: '#fff',
      padding: 0,
      margin: 0,
      fontSize: 18
    },
    itemListData: {
      color: '#d1d1d1',
      fontSize: 14,
    },
});