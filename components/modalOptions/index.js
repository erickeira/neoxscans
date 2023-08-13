import { Icon } from '@rneui/base';
import React, { Children, useEffect, useState } from 'react';
import { 
    View,
    Modal,
    StyleSheet,
    Animated,    
    Easing,
    Text,
    TouchableWithoutFeedback,
    SafeAreaView,
    KeyboardAvoidingView,
    Dimensions,
    StatusBar,
    ScrollView
} from 'react-native';
import { defaultColors } from '../../utils';

const { height, width } = Dimensions.get('window');

export default function ModalOptions({ visible, callbackclose, children}) { 

    const [ animationOpacity, setAnimationOpacity ] = useState(new Animated.Value(0))
    const [ animation, setAnimation ] = useState(new Animated.Value(height));

    useEffect(() => {
        StatusBar.setBackgroundColor(defaultColors.primary, true);
    },[visible])


    function initAnimations() {
        Animated.parallel([
            Animated.spring( 
                animation,
                { 
                    bounciness: 1,
                    toValue: 0,
                    easing: Easing.in, 
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing( 
                animationOpacity,
                { 
                    toValue: 1,
                    easing: Easing.in, 
                    duration: 200,
                    useNativeDriver: true
                }
            )
        ]).start();
    }

    function resetAnimationsAndClose() {

        Animated.parallel([
            Animated.timing( 
                animationOpacity,
                { 
                    toValue: 0,
                    easing: Easing.in, 
                    duration: 100,
                    useNativeDriver: true
                }
            ),
            Animated.spring( 
                animation,
                { 
                    bounciness: 1,
                    toValue: height,
                    easing: Easing.in, 
                    duration: 100,
                    useNativeDriver: true
                }
            )
        ]).start();
        setTimeout(() => {
            callbackclose();
          }, 150);
    }
    function clearAnimation() {
        setAnimationOpacity(new Animated.Value(0));
        setAnimation(new Animated.Value(height));
    }
 
    return (
        <Modal
            animationType="none" 
            transparent={true}
            visible={ visible }
            presentationStyle="overFullScreen"
            onShow={() => initAnimations()}     
            onDismiss={() => clearAnimation()}     
            > 

            <Animated.View style={[ styles.modalContent, { opacity: animationOpacity } ]}>                 
                <StatusBar backgroundColor={`#CACACA`}/>
                <Animated.View style={[styles.modalContentInner, { transform: [{translateY: animation }] } ]}>                
                    <SafeAreaView style={{ flex: 1 }}>
                         
                        <TouchableWithoutFeedback onPress={() => resetAnimationsAndClose()}>
                            <View style={{ flexGrow: 1 }}></View> 
                        </TouchableWithoutFeedback>

                        <View style={[ styles.modalContainer, { position: 'relative', zIndex: 10 } ]}>

                            <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} style={ styles.modalOptionsTitleWrapper }>
                                    { children }

                            </ScrollView>
                            
                            <TouchableWithoutFeedback onPress={() => resetAnimationsAndClose()}>
                                <View style={ styles.modalCloseBtn }>
                                    <Text allowFontScaling={ false } style={ styles.modalCloseBtnText }>Cancelar</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>

                    </SafeAreaView>

                </Animated.View>

            </Animated.View>
            
        </Modal>
    );
}

const styles = StyleSheet.create({

    modalContent: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },  
    
    modalContentInner: {
        flex: 1,
        justifyContent: 'flex-end', 
        padding: 15,
    },

    modalContainer: {       
        justifyContent: 'center', 
        borderRadius: 12,        
        overflow: 'hidden'        
    },

    modalOptionsTitleWrapper: {
        maxHeight: height * 0.8,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: defaultColors.primary
    },

    modalTitleContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        // borderBottomColor: defaultStyles.base.defaultColor2
    },

    modalTitleText: {
        fontSize: 12,
        fontWeight: 'bold',
        // color: defaultStyles.base.defaultColor6
    },
    
    modalCloseBtn: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultColors.primary,
        overflow: 'hidden',
        marginBottom: 5
    },

    modalCloseBtnText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666'
    },
    modalItemContainer: {
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        position: 'relative',
        paddingVertical: 15,
        paddingHorizontal: 20,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: '#adadad'
    },
    textoItem:{
        fontWeight: '600',
        marginLeft: 5,
        color: '#666'
    },

});