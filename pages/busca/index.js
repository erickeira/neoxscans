import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CardMangaList from '../../components/cardMangaList';
import { defaultColors, defaultStyles } from '../../utils';
import { Searchbar } from 'react-native-paper';
import HeaderLeft from '../../components/headerLeft';

export default function Busca({ navigation , route }){
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [inputRef, setInputeRef] = useState(null)

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <View style={styles.headerStyle}>
                    <HeaderLeft voltar color={'#fff'}/>
                    <Searchbar
                        ref={ref => setInputeRef(ref)}
                        placeholder="Digite sua busca..."
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={styles.inputStyle}
                        clearIcon={true}
                        inputStyle={{color: '#fff'}}
                        theme={{ colors: { primary: '#fff', secondary: '#d1d1d1' } }} 
                    />
                </View>

            )
        })
        
    },[searchQuery])
    
    useEffect(() => {
        inputRef?.focus()
    },[inputRef])

    return (
        <SafeAreaView style={styles.view}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={defaultStyles.tituloCategoria}>
              (0) Resultados
            </Text>
            <CardMangaList
              manga={{
                image: 'https://neoxscans.net/wp-content/uploads/2022/12/CAPA_Pick_me_up_2-350x476.png',
                titulo: 'Pick Me Up!',
                categoria: 'MANHWA',
                rating: 4.8,
                ultimos_capitulos: [
                  { numero: 54, data: 'Atualizado' },
                  { numero: 53, data: '05/08/2023' },
                ]
              }}
            />
            <CardMangaList
              manga={{
                image: 'https://neoxscans.net/wp-content/uploads/2023/07/MartialGodRegressedToLevel2Capa-350x476.jpg',
                titulo: 'Martial god Regressed to level 2',
                categoria: 'MANHWA',
                rating: 4.9,
                ultimos_capitulos: [
                  { numero: 21, data: 'Atualizado' },
                  { numero: 20, data: 'Atualizado' },
                ]
              }}
            />
            <CardMangaList
              manga={{
                image: 'https://neoxscans.net/wp-content/uploads/2021/05/Skeleton-copiar-1-e1665796912654-175x238.jpg',
                titulo: 'Pick Me Up!',
                categoria: 'MANHWA',
                rating: 4.8,
                ultimos_capitulos: [
                  { numero: 54, data: 'Atualizado' },
                  { numero: 53, data: '05/08/2023' },
                ]
              }}
            />
            <CardMangaList
              manga={{
                image: 'https://neoxscans.net/wp-content/uploads/2022/05/The-Great-Mage-Returns-After-4000-Years-350x476.jpg',
                titulo: 'The Great Mage Returns After 4,000 Years!',
                categoria: 'MANHWA',
                rating: 4.7,
                ultimos_capitulos: [
                  { numero: 181, data: 'Atualizado' },
                  { numero: 180, data: '05/08/2023' },
                ]
              }}
            />
          </ScrollView>
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
        width: '100%'
    },
    inputStyle:{
        flex: 1,
        backgroundColor: defaultColors.primary,
        color: '#fff'
    }
});