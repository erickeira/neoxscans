import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, ListItem,  Chip } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { SalvarScan, defaultColors } from '../../utils';
import AutoHeightImage from 'react-native-auto-height-image';

const { height, width }  = Dimensions.get('screen');

export default function CardMangaList({ manga, isFavoritado, callbackremove, grid }){
    const [ favoritado, setFavoritado ] = useState(isFavoritado)
    const navigation = useNavigation()

    async function handleFavoritar(){
      const salvo = await SalvarScan(manga)
      setFavoritado(salvo)
      if(callbackremove) callbackremove()
    }

    useEffect(() => {
      setFavoritado(isFavoritado)
    },[isFavoritado])

    function handleClick(){
      navigation.navigate('Detalhes', { manga, isFavoritado })
    }

    if(grid) return(
      <TouchableOpacity onPress={handleClick} style={[styles.view,{ marginHorizontal:  width * 0.010, flexDirection: 'column',  width: width * 0.45}]}>
          <View style={[styles.image, { minHeight: 200}]}>
            {
              manga?.tipo ?
              <Text style={styles.tagCategoria}>
                  {manga?.tipo?.toUpperCase()}
              </Text>
              : null
            }
            <TouchableOpacity hitSlop={{ left: 20, bottom: 20}} onPress={handleFavoritar} style={[styles.containerFavorite, { position: 'absolute', right: 5, zIndex: 10, top: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingVertical: 5, borderRadius: 5}]}>
                {
                    favoritado ?
                    <Icon name="bookmark" type="Ionicons" color={defaultColors.activeColor} size={30}/> 
                    :
                    <Icon name="bookmark-outline" type="Ionicons" color="#fff" size={30}/>
                }
            </TouchableOpacity>

              {
                manga?.image ?
                <AutoHeightImage 
                    source={ {
                        uri : manga?.image
                    }} 
                    width={width * 0.45} 
                />
                :
                <View style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name='image' size={40} />
                  <Text style={{color: '#666'}}>Sem imagem</Text>
                </View>
              }
          </View>
          
          <View style={[styles.containerDetalhes, { paddingHorizontal: 0, width: '100%'}]}>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#fff', fontWeight: '700' }}>
                {manga?.titulo || manga?.name}
              </Text>
          </View>
      </TouchableOpacity>
    )
    return (
        <TouchableOpacity onPress={handleClick} style={styles.view}>
            <View style={styles.image}>
              {
                manga?.tipo ?
                <Text style={styles.tagCategoria}>
                    {manga?.tipo?.toUpperCase()}
                </Text>
                : null
              }

                {
                  manga?.image ?
                  <Image  
                      source={ {
                          uri : manga?.image
                      }} 
                      width={120} 
                      height={170}
                  />
                  :
                  <View style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='image' size={40} />
                    <Text style={{color: '#666'}}>Sem imagem</Text>
                  </View>
                }
            </View>
            
            <View style={styles.containerDetalhes}>
                <View style={styles.containerTituloFavorite}>
                    <Text style={styles.titulo}>{manga?.titulo || manga?.name}</Text>
                    <TouchableOpacity hitSlop={{ left: 20, bottom: 20}} onPress={handleFavoritar} style={styles.containerFavorite}>
                        {
                            favoritado ?
                            <Icon name="bookmark" type="Ionicons" color={defaultColors.activeColor} size={30}/> 
                            :
                            <Icon name="bookmark-outline" type="Ionicons" color="#fff" size={30}/>
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.containerRating}>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating || (manga?.score / 2)) >= 1 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating || (manga?.score / 2)) >= 2 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating || (manga?.score / 2)) >= 3 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating || (manga?.score / 2)) >= 4 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating || (manga?.score / 2)) >= 5 ? "#B6A404" : "grey"} size={18}/>
                    <Text style={{marginLeft: 5, fontSize: 12,color: '#fff'}}>{manga?.rating || manga?.score }</Text>
                </View>

                { manga?.chapters_count ? <Text style={{color: '#fff', marginBottom: 10}}>({manga?.chapters_count}) { manga?.chapters_count == '1' ? 'Capitulo' : 'Capitulos'}</Text> : null }
                { manga?.categories ? <Text >{manga?.categories?.join(', ')}</Text> : null }

                  {
                    manga?.capitulos?.map((cap, index) => (
                      <ListItem key={index} containerStyle={styles.itemList}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.itemListTitulo}>{cap.numero}</ListItem.Title>
                        </ListItem.Content>
                        {
                          cap.data == 'up'? 
                          <ListItem.Subtitle 
                            right={true} 
                            style={[styles.itemListData]}
                          >
                            UP
                          </ListItem.Subtitle>
                          // <Image 
                          //   source={{ uri: 'https://neoxscans.net/wp-content/uploads/2022/08/Botao-copiaa.png'}} 
                          //   width={18}
                          //   height={18}
                          // />
                          :
                          <ListItem.Subtitle 
                            right={true} 
                            style={styles.itemListData}
                          >
                            {cap.data}
                          </ListItem.Subtitle>
                        }
      
                    </ListItem>
                    
                    ))
                  }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view: {
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        // width: '100%'
      },
      containerDetalhes:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#fff',
        width: '68%', 
      },
      titulo: {
          color: '#fff',
          fontWeight: '700',
          flexWrap: 'wrap',
          fontSize: 18,
          width: '85%'
      },
      itemList: {
        backgroundColor: 'transparent',
        paddingVertical: 8,
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
        fontSize: 13
      },
      itemListData: {
        color: '#d1d1d1',
        fontSize: 12,
      },
      image :{
        backgroundColor: '#000',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10
      },
      chevronContainer:{
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
      },
      containerRating:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      },
      tagCategoria:{
        position: 'absolute',
        zIndex: 10,
        backgroundColor: '#8D1C1C',
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontSize: 10,
        fontWeight: '600',
        color: '#fff'
      },
      containerTituloFavorite:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      containerFavorite:{
        paddingHorizontal: 5,
      }

});