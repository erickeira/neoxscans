import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SalvarScan, api, defaultColors, defaultStyles } from '../../utils';
import CardDetails from '../../components/cardDetails';
import { Avatar, Icon, ListItem } from '@rneui/base';
import { Skeleton } from '@rneui/themed';
import AutoHeightImage from 'react-native-auto-height-image';

export default function Detalhes({ navigation,  route }){
    const [ favoritado, setFavoritado ] = useState(route.params.isFavoritado)
    const [ carregando, setCarregando ] = useState(true)
    const { params } = route
    const manga = params?.manga

    async function handleFavoritar(){
      const salvo = await SalvarScan(manga)
      setFavoritado(salvo)
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

    const [ mangaDetalhes, setMangaDetalhes] = useState([])

    useEffect(() => {
      getManga()
    },[])

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
            data={mangaDetalhes?.capitulos}
            ListHeaderComponent={(
              <View >
               <CardDetails
                  manga={mangaDetalhes}
                  carregando={carregando}
                />
                <Text style={[defaultStyles.tituloCategoria]}>
                  Capitulos
                </Text>
              </View>
            )}
            renderItem={({item, index}) => {
              let capitulo =  parseInt(item.capitulo.replace) || (mangaDetalhes?.capitulos?.length - (index + 1));
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
                          <ListItem.Title style={styles.itemListTitulo}>Cap. {item.capitulo}</ListItem.Title>
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
                            style={styles.itemListData}
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
              <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
                  <Text allowFontScaling={ false } style={{ fontSize: 14, textAlign: 'center', color: '#fff' }}>
                      Mangá não encontrado!
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
    containerFavorite:{
        marginRight: 20
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