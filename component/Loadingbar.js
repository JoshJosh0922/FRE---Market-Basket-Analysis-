import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export const Loadingbar = ({ isShow }) => {
  return (
    <Modal animationType="none" visible={isShow} transparent>
      <View style={styles.LoadingContainer}>
        <View style={styles.hamsLoader}>
          <LottieView
            source={require("../assets/loading hams.json")}
            autoPlay
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
          }}
        >
          <LottieView
            source={require("../assets/loadin.json")}
            autoPlay
            style={styles.loader}
          />
          <Text style={{ color: "#5E91FF", fontSize: 16, fontWeight: "600" }}>
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,.5)",
    // backgroundColor: "red",
  },
  hamsLoader: {
    // borderWidth: 1,
    width: 300,
    height: 150,
    alignItems: "center",
    justifyContent: "flex-end",
    resizeMode: "stretch",
  },
  loader: {
    // borderWidth: 1,
    width: 150,
    height: 40,
    resizeMode: "cover",
  },
});
