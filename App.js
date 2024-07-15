import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNav from "./Screens/MainNav";

export default function App() {
  return (
    <NavigationContainer>
      <MainNav />
    </NavigationContainer>
  );
}
