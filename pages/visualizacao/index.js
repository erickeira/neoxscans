import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView,ImageBackground, FlatList,Image, Dimensions, ActivityIndicator, Animated, Modal} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { SalvarLeitura, api, defaultColors, GetLeitura, defaultStyles, MarcarCapituloLido, GetLidos } from '../../utils';
import { WebView } from 'react-native-webview';
import ViewOptions from '../../components/viewOptions';

const { height, width } = Dimensions.get('screen');

export default function Visualizacao({navigation, route }){
    const [ capitulo, setCapitulo] = useState([])
    const [ numeroCapitulo, setNumeroCapitulo] = useState(route.params?.capitulo)
    const [carregando, setCarregando] = useState(false)
    const [ showTabOptions, setShowTabOptions ] = useState(true)
    const [ posicaoNaTela, setPosicaoNaTela ] = useState(0)
    const [scrollInfinito, setScrollInfinito] = useState(false)

    useEffect(() => {
      navigation.setOptions({
        headerTitle: `Cap.${numeroCapitulo}: ${route.params?.manga?.titulo}` || 'Visualização',
        headerTitleStyle: {
          fontSize: 16
        },   
      })
    }, [capitulo, numeroCapitulo])

    async function handleMarcacoes(capitulo = numeroCapitulo){
      await SalvarLeitura(route.params?.manga, capitulo)
      await MarcarCapituloLido(route.params?.manga, capitulo)
      setTimeout(() => {
        setCarregando(false)
      }, 2000);
    }

    useEffect(() => {
      setCarregando(true)
      // getCapitulo()
      handleMarcacoes()
    },[numeroCapitulo])

    const scrollHandler = event => {
      const offsetY = parseInt(event.nativeEvent.contentOffset.y);
      if (offsetY > posicaoNaTela && showTabOptions) {
        setShowTabOptions(false);
      } else if (offsetY < posicaoNaTela && !showTabOptions) {
        setShowTabOptions(true);
      }
      setPosicaoNaTela(offsetY)
    };

    const INJECTED_JAVASCRIPT = `(function() {
      window.postMessage = function(data){
        window.ReactNativeWebView.postMessage(data);
      }
    })();`;

    const handleWebViewMessage = (event) => {
      // Analisa a mensagem recebida do WebView
      const message = JSON.parse(event.nativeEvent?.data) ? JSON.parse(event.nativeEvent?.data) : {};
      if (message.capitulo) {
        handleMarcacoes(message.capitulo)
        navigation.setOptions({
          headerTitle: `Cap.${message.capitulo}: ${route.params?.manga?.titulo}` || 'Visualização',
          headerTitleStyle: {
            fontSize: 16
          },   
        })
      }
    };
  
  
    // if(carregando) return <ActivityIndicator size={40} color={defaultColors.activeColor} style={{flex: 1}}/>
    return(
      <>
        <Modal
          transparent={true}
          visible={carregando}
        >
          <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.41)'}}>
            <ActivityIndicator size={40} color={defaultColors.activeColor} style={{flex: 1}}/>
          </View>
        </Modal>
        <WebView 
            useWebKit={true}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            originWhitelist={['*']}
            nestedScrollEnabled             
            javaScriptEnabled={true}
            scrollEnabled={false}
            onMessage={handleWebViewMessage}
            onScroll={scrollHandler}
            source={{ uri: 
              scrollInfinito ?
              `http://192.168.10.115:3000/capituloscrollinfinito?url=${route.params?.url}&capitulo=${numeroCapitulo}`:
              `http://192.168.10.115:3000/capitulo?url=${route.params?.url}&capitulo=${numeroCapitulo}` 
            }}                   
        />
        
        <ViewOptions
          show={showTabOptions}
          begin={numeroCapitulo == 1 || numeroCapitulo == 0}
          last={ numeroCapitulo == route.params?.manga.capitulos[0].numero.replace('Cap. ', '').replace('Cap. ', '') }
          onPressBack={() => setNumeroCapitulo(numeroCapitulo - 1)}
          onPressNext={() => setNumeroCapitulo(numeroCapitulo + 1)}
          scrollinfinito={scrollInfinito}
          changeModo={() => setScrollInfinito(!scrollInfinito)}
        />
      </>
    )
}

const styles = StyleSheet.create({
    list: {
      width: '100%',
      backgroundColor: '#000',
    },
    image: {
      aspectRatio: 1,
      width: '100%',
      height: '100%',
    //   flex: 1,
      resizeMode: 'contain'
    }
});