import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import { Header } from "../components/Header";

import colors from "../styles/colors";
import waterdrop from "../assets/waterdrop.png";
import { PlantsProps, loadPlants } from "../libs/storage";
import { formatDistance } from "date-fns";
import pt from "date-fns/esm/locale/pt/index.js";
import fonts from "../styles/fonts";
import { PlantCardSecondary } from "../components/PlantCardSecondary";
import { Load } from "../components/Load";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterdrop, setNextWaterdrop] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlants();
      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWaterdrop(
        ` Não esqueça de regar a ${plantsStorage[0].name} à ${nextTime} horas.`
      );

      setMyPlants(plantsStorage);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  if(loading)
    return<Load/>
    
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotLightImage} />
        <Text style={styles.spotlightText}>{nextWaterdrop}</Text>
      </View>

      <View style={styles.myPlants}>
        <Text style={styles.myPlantsTitle}>Próximas regadas</Text>

        <FlatList 
          data={myPlants} 
          keyExtractor ={(item) => String(item.id)}
          renderItem={({item})=>(
            <PlantCardSecondary data={item}/>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex:1}}

        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius:20,
    height:110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  spotLightImage: {
    width: 60,
    height:60
  },
  spotlightText: {
    flex:1,
    color: colors.blue,
    paddingHorizontal:20
  },
  myPlants: {
    flex:1,
    width: "100%",
  },
  myPlantsTitle: {
    fontSize:24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical:20
  }
});
