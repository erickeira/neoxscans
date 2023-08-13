import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon, ListItem,  Chip } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Skeleton } from '@rneui/themed';


export default function CardMangaListSkeleton({ manga }){
    return (
        <View style={styles.view}>
            <View style={styles.image}>
                <Skeleton animation="pulse" width={120} height={170} />
            </View>
            <View style={styles.containerDetalhes}>
                <View style={styles.containerTituloFavorite}>
                    <View style={styles.titulo}>
                        <Skeleton animation="pulse" width={150} height={20} />
                    </View>
                </View>

                <View style={styles.containerRating}>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 1 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 2 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 3 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 4 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 5 ? "#B6A404" : "grey"} size={18}/>
                    <Text style={{marginLeft: 5, fontSize: 12,color: '#fff'}}>{manga?.rating}</Text>
                </View>

                <ListItem containerStyle={styles.itemList}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.itemListTitulo}>
                            <Skeleton animation="pulse" width={50} height={20} />
                        </ListItem.Title>
                    </ListItem.Content>

                        <ListItem.Subtitle 
                            right={true} 
                            style={styles.itemListData}
                        >
                        <Skeleton animation="pulse" width={150} height={20} />
                        </ListItem.Subtitle>

                </ListItem>
                <ListItem containerStyle={styles.itemList}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.itemListTitulo}>
                            <Skeleton animation="pulse" width={50} height={20} />
                        </ListItem.Title>
                    </ListItem.Content>

                        <ListItem.Subtitle 
                            right={true} 
                            style={styles.itemListData}
                        >
                        <Skeleton animation="pulse" width={60} height={20} />
                        </ListItem.Subtitle>

                </ListItem>

            </View>
        </View>
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
        backgroundColor: '#0492C2',
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