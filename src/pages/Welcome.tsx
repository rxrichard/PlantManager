import React, {useState} from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions//pega o tamanho da tela
} from "react-native";
import {Entypo} from "@expo/vector-icons"

import colors from "../styles/colors";
import wateringImg from "../assets/watering.png";
import fonts from '../styles/fonts';
import { useNavigation } from "@react-navigation/core";



export function Welcome() {
  const navigation = useNavigation();
  
  function handleStart(){
    navigation.navigate('UserIdentification')

  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"}
          suas plantas de{"\n"}
          forma fácil
        </Text>

        <Image 
            source={wateringImg}
            style={styles.image} 
            resizeMode='contain'//irá manter o a imagem no tamanho da tela
            />
      

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>

        <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.7}
            onPress={handleStart}
          >
              <Entypo 
                name="chevron-right"
                style={styles.buttonIcon}
              />
          
      </TouchableOpacity>
    </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper:{
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
    fontFamily:fonts.heading,
    lineHeight:34
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily:fonts.text
  },
  image: {
    width: 292,
    height: Dimensions.get('window').width*0.7//pega o tamanho da tela e multiplica por 0.7
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height:56,
    width:56,
    
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 24,
  }
});
