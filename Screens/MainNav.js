import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import React from "react";
import TransacScreens from "./Transact/TransacScreens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomButton } from "../component/CustomButton";

const Stack = createNativeStackNavigator();

export default function MainNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="TransacScreen" component={TransacScreens} />
    </Stack.Navigator>
  );
}

function MainScreen({ navigation }) {
  const HandleTransac = () => {
    navigation.navigate("TransacScreen");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(255,255,255,.0)" translucent />
      <View style={styles.ItemContainer}>
        <View style={styles.ContainerTitle}>
          <Text style={styles.TextTitle}>Matrix</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.ButtonContainer}>
            <CustomButton OnPress={HandleTransac} title={"TransacScreen"} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a4164",
  },
  ItemContainer: {
    width: 300,
    height: 500,
    elevation: 5,
    backgroundColor: "#476683",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 20,
  },
  ContainerTitle: {
    // borderWidth: 1,
    width: 250,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  TextTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 25,
  },
  ButtonContainer: {
    paddingVertical: 10,
    // borderWidth: 1,
    width: 250,
    // height: 330,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
