import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Modal,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { AlertMessage } from "./PopUpMessage";

export const CustomClickInput = ({ handleAdd, GivenItem, title, getValue }) => {
  //Modal
  const [ShowModal, setShowModal] = useState(false);

  //Button Animate
  const [scaleValue] = useState(new Animated.Value(1));

  const AnimateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const getValues = (data) => {
    getValue(data, title);
  };

  const handleInsert = (data) => {
    setShowModal(true);
  };
  const handleHide = (data) => {
    setShowModal(false);
  };

  return (
    <>
      {ShowModal && (
        <PopUpInsert
          handleOpen={ShowModal}
          getInsert={getValues}
          handleHide={() => handleHide()}
          title={title}
        />
      )}
      <TouchableWithoutFeedback
        onPress={() => [AnimateButton(), handleInsert()]}
      >
        <Animated.View
          style={{
            ...styles.container,
            height: GivenItem[0][title].length >= 19 ? "auto" : 35,
            transform: [{ scale: scaleValue }],
          }}
        >
          {GivenItem.length ? (
            <>
              {GivenItem[0][title].length > 0 ? (
                <Text>
                  {Array.from(GivenItem[0][title]).map((data) =>
                    data.toString()
                  )}
                </Text>
              ) : (
                <Text>Type here...</Text>
              )}
            </>
          ) : (
            <>
              <Text>Type here...</Text>
            </>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    // borderWidth: 1,
    borderRadius: 5,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

const PopUpInsert = ({ getInsert, handleHide, handleOpen, title, submit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      values: "",
    },
  });
  const [AlertShow, setAlertShow] = useState(false);

  const GetText = (text) => {
    const Array = text["values"].split(",").map((data) => data);

    if (Array.length <= 6) {
      getInsert(text);
      handleHide();
      reset();
    } else {
      setAlertShow(true);
    }
  };

  const hideAlert = () => {
    setAlertShow(false);
  };

  //Button Animate
  const [scaleValue] = useState(new Animated.Value(1));

  const AnimateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Modal
      transparent
      animationType={"fade"}
      style={PopStyle.container}
      visible={handleOpen}
      onRequestClose={() => handleHide()}
    >
      <TouchableOpacity
        style={PopStyle.BackgroundClick}
        onPress={() => handleHide()}
        activeOpacity={0.9}
      />
      {AlertShow && (
        <AlertMessage
          doShow={AlertShow}
          dohide={() => hideAlert()}
          Title={"⚠ Oh snap! You got a warning"}
          Message={"The item should have exactly 6 items!"}
        />
      )}

      <View style={PopStyle.PopUpInput}>
        <View style={PopStyle.HeaderContainer}>
          <Text style={PopStyle.textTitle}>{title}</Text>
        </View>
        <View style={PopStyle.direction}>
          <Text style={PopStyle.Notes}>
            Note: To input items, you should insert a comma between each item to
            identify them individually.
          </Text>
        </View>
        <View style={PopStyle.inputContainer}>
          <CustomInput
            control={control}
            name="values"
            rules={{ required: true }}
            placeholder="Type here..."
            OnMeSize={true}
            HeighSize={50}
            WidhtSize={220}
            getContent={GetText}
            keyboardType={"default"}
            Focus={true}
            disab={false}
          />
        </View>
        <View>
          <TouchableWithoutFeedback
            onPressIn={AnimateButton}
            onPress={handleSubmit(GetText)}
          >
            <Animated.View
              style={{
                ...PopStyle.SubmitButton,
                transform: [{ scale: scaleValue }],
              }}
            >
              <Text style={PopStyle.textButton}>Submit</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
};

const PopStyle = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  BackgroundClick: {
    backgroundColor: "rgba(0,0,0,.5)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  PopUpInput: {
    position: "absolute",
    marginTop: 200,
    marginHorizontal: 50,
    paddingHorizontal: 10,

    zIndex: 1,
    width: 285,
    height: 250,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 2.1,
  },
  HeaderContainer: {
    // borderWidth: 1,
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#4c67ff",
  },
  direction: {
    // borderWidth: 1,
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  Notes: {
    color: "firebrick",
    fontSize: 12,
    textAlign: "justify",
  },
  SubmitButton: {
    // borderWidth: 1,
    borderRadius: 10,
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "#444eff",
  },
  textButton: {
    color: "white",
  },
});

// !data ? (
//   <>
//     <Text>Type here...</Text>
//   </>
// ) : (
//   <>
//     <Text>
//       {index === array.length - 1
//         ? data.toString()
//         : data.toString() + ","}
//     </Text>
//   </>
// )

// {Array.from(GivenItem[0][title]).map((data, index, array) =>
//   index === array.length - 1
//     ? data.toString()
//     : data.toString() + ","
// )}
