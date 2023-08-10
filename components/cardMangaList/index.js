import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Icon, ListItem } from '@rneui/themed';


export default function CardMangaList(){

    return (
        <View style={styles.view}>
            <Image source={ {uri : "https://neoxscans.net/wp-content/uploads/2022/05/The-Great-Mage-Returns-After-4000-Years-e1653052958881.jpg"}} width={120} height={160}/>
            <View style={styles.containerDetalhes}>
                <Text style={styles.titulo}>The Great Mage Returns After 4,000 Years</Text>
                <>
                    <ListItem containerStyle={styles.itemList}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.itemListTitulo}>Cap. 181</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle right={true} style={styles.itemListData}>23/07/2023</ListItem.Subtitle>
                        {/* <Icon name="inbox" type="material-community" color="grey" /> */}
                        <ListItem.Chevron />
                    </ListItem>
                </>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#393D40',
        marginVertical: 10,
        borderRadius: 5,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      },
      containerDetalhes:{
          padding: 10,
          color: '#fff',
          width: '70%', 
      },
      titulo: {
          color: '#fff',
          fontWeight: '700',
          flexWrap: 'wrap', 
      },
      itemList: {
        backgroundColor: '#393D40',
      },
      itemListContent:{
        flexDirection: 'row', 
        justifyContent: 'flex-start',
         alignItems: 'center', 
         gap: 10
        },
      itemListTitulo: {
        color: '#fff'
      },
      itemListData: {
        color: '#d1d1d1',
        fontSize: 12

      }

});