import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { SearchBar } from '@rneui/themed';
import CardMangaList from '../../components/cardMangaList';

export default function Home(){
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
    setSearch(search);
    };
    return (
        <SafeAreaView style={styles.view}>
          <SearchBar
            placeholder="Encontre sua leitura..."
            onChangeText={updateSearch}
            value={search}
          />
          <CardMangaList/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
      margin: 10,
    },
});