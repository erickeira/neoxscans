import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CardMangaList from '../../components/cardMangaList';
import { defaultStyles } from '../../utils';
import CardMangaContinue from '../../components/cardMangaContinue';
import Chip from '../../components/chip';

export default function Home(){

    return (
        <SafeAreaView style={styles.view}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={defaultStyles.tituloCategoria}>
              Continue lendo 
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <CardMangaContinue
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
              <CardMangaContinue
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
              <CardMangaContinue
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
              <CardMangaContinue
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
            <View style={styles.tags}>
              <Chip
                titulo={`Ação`}
                onPress={() => console.log('Pressed')}
              />
              <Chip
                titulo={`Aventura`}
                onPress={() => console.log('Pressed')}
              />
              <Chip
                titulo={`Suspense`}
                onPress={() => console.log('Pressed')}
              />
              <Chip
                titulo={`Isekai`}
                onPress={() => console.log('Pressed')}
              />
                  
            </View>

            <Text style={defaultStyles.tituloCategoria}>
              Últimas atualizações
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
    tags: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10
    },
    tag: {
      marginRight: 10,
    }
});