import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomInput from "../../component/CustomInput";
import { useForm } from "react-hook-form";
import { CustomClickInput } from "../../component/CustomClickInput";
import { Loadingbar } from "../../component/Loadingbar";

export default function TransacScreens() {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      support: "",
      confidence: "",
    },
  });
  // const [itemsHolder, setItemsHolder] = useState([
  //   {
  //     T1: "",
  //     T2: "",
  //     T3: "",
  //     T4: "",
  //     T5: "",
  //     T6: "",
  //     T7: "",
  //     T8: "",
  //     T9: "",
  //   },
  // ]);
  const [itemsHolder, setItemsHolder] = useState([
    {
      T1: "1,2,3,4,5,6",
      T2: "2,3,4",
      T3: "1,2,4,5",
      T4: "1,2,4",
      T5: "1,2,3,5",
      T6: "1,2,3,4",
      T7: "2,3,4,5,6",
      T8: "1,2,3,4,5",
      T9: "1,2,5,6",
    },
  ]);

  // const [itemsHolder, setItemsHolder] = useState([
  //   {
  //     T1: "laptop,mouse,keyboard",
  //     T2: "tv,monitor",
  //     T3: "cellphone,laptop,mouse",
  //     T4: "keyboard,mouse",
  //     T5: "cellphone,keyboard,monitor",
  //     T6: "mouse,laptop",
  //     T7: "tv,monitor",
  //     T8: "monitor,laptop,tv",
  //     T9: "cellphone,monitor",
  //   },
  // ]);

  const [ShowLoading, setShowLoading] = useState(false);

  const Message = "None";
  const [OneDigItems, setOneDigItems] = useState([]);
  var [OneDigValues, setOneDigValues] = useState([]);
  var [DobDigItems, setDobDigItems] = useState([]);
  var [DobDigValues, setDobDigValues] = useState([]);
  var [ThreeDigItems, setThreeDigItems] = useState([]);
  var [ThreeDigValues, setThreeDigValues] = useState([]);
  var [FourDigItems, setFourDigItems] = useState([]);
  var [FourDigValues, setFourDigValues] = useState([]);
  var [FiveDigItems, setFiveDigItems] = useState([]);
  var [FiveDigValues, setFiveDigValues] = useState([]);
  var [SixDigItems, setSixDigItems] = useState([]);
  var [SixDigValues, setSixDigValues] = useState([]);
  var [getSupp, setGetSupp] = useState(0);
  var [getConfi, setGetConfi] = useState(0);
  var [itemCount, setItemCount] = useState(6);
  const [ShowAns, setShowAns] = useState(false);
  const [ShowOneMess, SetShowOneMess] = useState([]);
  const [fiveCompe, setfiveCompe] = useState([]);
  const [fourCompe, setfourCompe] = useState([]);
  const [TBCompe, setTBCompe] = useState([]);
  const [dobleCompe, setdobleCompe] = useState([]);
  const [OnceCompe, setOnce] = useState([]);

  const NoTransact = [
    { id: 0, Name: "T1" },
    { id: 1, Name: "T2" },
    { id: 2, Name: "T3" },
    { id: 3, Name: "T4" },
    { id: 4, Name: "T5" },
    { id: 5, Name: "T6" },
    { id: 6, Name: "T7" },
    { id: 7, Name: "T8" },
    { id: 8, Name: "T9" },
  ];

  //Button Actions

  const Shows = () => {
    setShowLoading(true);
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 5000);
  };

  const handleSubmited = async (data) => {
    Shows();
    SetShowOneMess([]);
    setfiveCompe([]);
    setfourCompe([]);
    setTBCompe([]);
    setdobleCompe([]);
    setOnce([]);
    SetShowOneMess([]);
    console.log("Dat ", itemsHolder);
    console.log("Dat ", data.support);
    setGetSupp(data.support);
    setGetConfi(data.confidence);

    setTimeout(() => {
      // One Digit
      const oneDigit = CreateListOne(NoTransact, itemsHolder);
      const countDigitOne = getOneDigit(oneDigit, itemsHolder);

      console.log("item ", oneDigit);
      console.log("Value ", countDigitOne);
      setOneDigItems(oneDigit);
      setOneDigValues(countDigitOne);

      //Two Digit
      const DoubleList = CreateList(oneDigit, 2);
      const countDouble = getCombination(DoubleList, itemsHolder, 2);
      setDobDigItems(DoubleList);
      setDobDigValues(countDouble);
      let DoubleCombo = countDouble.filter((dat) => dat >= data.support);

      //Three Digit
      const ThreeList = CreateList(oneDigit, 3);
      const countThree = getCombination(ThreeList, itemsHolder, 3);
      setThreeDigItems(ThreeList);
      setThreeDigValues(countThree);
      let ThreeCombo = countThree.filter((dat) => dat >= data.support);

      //Four Digit
      const FourList = CreateList(oneDigit, 4);
      const countFour = getCombination(FourList, itemsHolder, 4);
      setFourDigItems(FourList);
      setFourDigValues(countFour);
      let FourCombo = countFour.filter((dat) => dat >= data.support);

      console.log("ssssix ", FourCombo);
      //Five Digit
      const FiveList = CreateList(oneDigit, 5);
      const countFive = getCombination(FiveList, itemsHolder, 5);
      setFiveDigItems(FiveList);
      setFiveDigValues(countFive);
      let FiveCombo = countFive.filter((dat) => dat >= data.support);

      //Six Digit
      const SixList = CreateList(oneDigit, 6);
      const countSix = getCombination(SixList, itemsHolder, 6);
      setSixDigItems(SixList);
      setSixDigValues(countSix);
      let SixCombo = countSix.filter((dat) => dat >= data.support);

      //getList Count of Double and values
      let countListdouble = getCountItem(countDouble, data.support, "Two");
      let getlistofdouble = getItemHolder(countListdouble, DoubleList);

      //getList Count of Three and values
      let countListthree = getCountItem(countThree, data.support, "Three");
      let getlistofthree = getItemHolder(countListthree, ThreeList);

      //getList Count of Four and values
      let countListfour = getCountItem(countFour, data.support, "Four");
      let getlistoffour = getItemHolder(countListfour, FourList);

      //getList Count of Five and values
      let countListfive = getCountItem(countFive, data.support, "Five");
      let getlistoffive = getItemHolder(countListfive, FiveList);

      //getList Count of Five and values
      let countListsix = getCountItem(countSix, data.support, "Six");
      let getlistofsix = getItemHolder(countListsix, SixList);

      // console.log("chel ", getlistofthree);

      if (
        DoubleCombo.length > 0 &&
        ThreeCombo.length === 0 &&
        FourCombo.length === 0 &&
        FiveCombo.length === 0 &&
        SixCombo.length === 0
      ) {
        setOnce(
          onceCompute(getlistofdouble, oneDigit, countDigitOne, data.support)
        );
      } else if (
        DoubleCombo.length > 0 &&
        ThreeCombo.length > 0 &&
        FourCombo.length === 0 &&
        FiveCombo.length === 0 &&
        SixCombo.length === 0
      ) {
        setTBCompe(compute(getlistofthree, getlistofdouble, 3));
        setOnce(
          onceCompute(getlistofthree, oneDigit, countDigitOne, data.support)
        );
      } else if (
        DoubleCombo.length > 0 &&
        ThreeCombo.length > 0 &&
        FourCombo.length > 0 &&
        FiveCombo.length === 0 &&
        SixCombo.length === 0
      ) {
        setTBCompe(compute(getlistoffour, getlistofthree, 4));
        setOnce(
          onceCompute(getlistoffour, oneDigit, countDigitOne, data.support)
        );
        setdobleCompe(
          doblesCompute(getlistoffour, DoubleList, countDouble, data.support, 1)
        );
      } else if (
        DoubleCombo.length > 0 &&
        ThreeCombo.length > 0 &&
        FourCombo.length > 0 &&
        FiveCombo.length > 0 &&
        SixCombo.length === 0
      ) {
        setTBCompe(compute(getlistoffive, getlistofthree, 4));
        setOnce(
          onceCompute(getlistoffive, oneDigit, countDigitOne, data.support)
        );
        setdobleCompe(
          doblesCompute(getlistoffive, DoubleList, countDouble, data.support, 2)
        );
        setfourCompe(
          forrCompute(getlistoffive, FourList, countFour, data.support)
        );
      } else if (
        DoubleCombo.length > 0 &&
        ThreeCombo.length > 0 &&
        FourCombo.length > 0 &&
        FiveCombo.length > 0 &&
        SixCombo.length > 0
      ) {
        setTBCompe(compute(getlistofsix, getlistofthree, 4));
        setOnce(
          onceCompute(getlistofsix, oneDigit, countDigitOne, data.support)
        );
        setdobleCompe(
          doblesCompute(getlistofsix, DoubleList, countDouble, data.support, 3)
        );
        setfiveCompe(
          fiveCompute(getlistofsix, FiveList, countFive, data.support)
        );
      }
      setShowAns(true);
    }, 1000);
  };

  const check = (item, confi, id) => {
    let checked = true;
    for (let a = 0; a < item.length; a++) {
      if (item > confi) {
        console.log("a ", item);
        checked = false;
      }
    }
    return checked;
  };

  const getAllItem = (data, title) => {
    console.log("datas ", data.values, "_", title);
    console.log("-> ", itemsHolder[0][title].size);

    const Update = [...itemsHolder];

    Update[0][title] = data.values;
    setItemsHolder(Update);

    console.log(Update);
  };

  const CreateListOne = (data1, data2) => {
    const WholeSet = [];

    data1.map((data) => {
      let NewItem = data2[0][data.Name].split(",");

      console.log("NewItem ", NewItem);
      WholeSet.push(...NewItem);
    });

    const uniqueWholeSet = [...new Set(WholeSet)];

    console.log(
      "Lists ",
      uniqueWholeSet.filter((data) => data)
    );

    return uniqueWholeSet.filter((data) => data);
  };

  const getOneDigit = (list, trans) => {
    const OneDigList = [];

    list.forEach((item) => {
      let count = 0;

      NoTransact.forEach((data) => {
        const NewCount = trans[0][data.Name].split(",");
        count += NewCount.filter((res) => res === item).length;
      });

      OneDigList.push(count);
    });

    console.log("counts ", OneDigList);
    return OneDigList;
  };

  const getCombination = (list, datas, vals) => {
    const itemsHolder = datas;
    const compute = [];

    console.log("haba ", list.length);
    console.log("list ", itemsHolder);

    list.forEach((items) => {
      const comb = items.split(",");
      let count = 0;

      NoTransact.forEach((transac) => {
        const setArray = itemsHolder[0][transac.Name].split(",");
        let have = false;
        let have2 = false;
        let have3 = false;
        let have4 = false;
        let have5 = false;

        setArray.forEach((setItem) => {
          switch (vals) {
            case 2:
              if (!have && comb.includes(setItem)) {
                have = true;
              } else if (have && comb.includes(setItem)) {
                count++;
              }
              break;
            case 3:
              if (!have && comb.includes(setItem)) {
                have = true;
              } else if (have && !have2 && comb.includes(setItem)) {
                have2 = true;
              } else if (have && have2 && comb.includes(setItem)) {
                count++;
              }
              break;
            case 4:
              if (!have && comb.includes(setItem)) {
                have = true;
              } else if (have && !have2 && comb.includes(setItem)) {
                have2 = true;
              } else if (have && have2 && !have3 && comb.includes(setItem)) {
                have3 = true;
              } else if (have && have2 && have3 && comb.includes(setItem)) {
                count++;
              }
              break;
            case 5:
              if (!have && comb.includes(setItem)) {
                have = true;
              } else if (have && !have2 && comb.includes(setItem)) {
                have2 = true;
              } else if (have && have2 && !have3 && comb.includes(setItem)) {
                have3 = true;
              } else if (
                have &&
                have2 &&
                have3 &&
                !have4 &&
                comb.includes(setItem)
              ) {
                have4 = true;
              } else if (
                have &&
                have2 &&
                have3 &&
                have4 &&
                comb.includes(setItem)
              ) {
                count++;
              }
              break;
            case 6:
              if (!have && comb.includes(setItem)) {
                have = true;
              } else if (have && !have2 && comb.includes(setItem)) {
                have2 = true;
              } else if (have && have2 && !have3 && comb.includes(setItem)) {
                have3 = true;
              } else if (
                have &&
                have2 &&
                have3 &&
                !have4 &&
                comb.includes(setItem)
              ) {
                have4 = true;
              } else if (
                have &&
                have2 &&
                have3 &&
                have4 &&
                !have5 &&
                comb.includes(setItem)
              ) {
                have5 = true;
              } else if (
                have &&
                have2 &&
                have3 &&
                have4 &&
                have5 &&
                comb.includes(setItem)
              ) {
                count++;
              }
              break;
          }
        });
      });

      compute.push(count);
    });

    console.log("comp ", compute);
    console.log("comp ", compute.length);
    return compute;
  };

  const CreateList = (list, TBnum) => {
    const NewCombination = [];
    const itemCount = list.length;

    switch (TBnum) {
      case 2:
        for (let a = 0; a < itemCount - 1; a++) {
          for (let b = a + 1; b < itemCount; b++) {
            let combi = `${list[a]},${list[b]}`;
            NewCombination.push(combi);
          }
        }
        break;
      case 3:
        for (let a = 0; a < itemCount - 2; a++) {
          for (let b = a + 1; b < itemCount - 1; b++) {
            for (let c = b + 1; c < itemCount; c++) {
              let combi = `${list[a]},${list[b]},${list[c]}`;
              NewCombination.push(combi);
            }
          }
        }
        break;
      case 4:
        for (let a = 0; a < itemCount - 3; a++) {
          for (let b = a + 1; b < itemCount - 2; b++) {
            for (let c = b + 1; c < itemCount - 1; c++) {
              for (let d = c + 1; d < itemCount; d++) {
                let combi = `${list[a]},${list[b]},${list[c]},${list[d]}`;
                NewCombination.push(combi);
              }
            }
          }
        }

        break;
      case 5:
        for (let a = 0; a < itemCount - 4; a++) {
          for (let b = a + 1; b < itemCount - 3; b++) {
            for (let c = b + 1; c < itemCount - 2; c++) {
              for (let d = c + 1; d < itemCount - 1; d++) {
                for (let e = d + 1; e < itemCount; e++) {
                  let combi = `${list[a]},${list[b]},${list[c]},${list[d]},${list[e]}`;
                  NewCombination.push(combi);
                }
              }
            }
          }
        }
        break;
      case 6:
        for (let a = 0; a < itemCount - 5; a++) {
          for (let b = a + 1; b < itemCount - 4; b++) {
            for (let c = b + 1; c < itemCount - 3; c++) {
              for (let d = c + 1; d < itemCount - 2; d++) {
                for (let e = d + 1; e < itemCount - 1; e++) {
                  for (let f = e + 1; f < itemCount; f++) {
                    let combi = `${list[a]},${list[b]},${list[c]},${list[d]},${list[e]},${list[f]}`;
                    NewCombination.push(combi);
                  }
                }
              }
            }
          }
        }

        break;
    }

    console.log("CombiList ", NewCombination);

    return NewCombination;
  };

  const getCountItem = (countList, confi, fors) => {
    let list = countList;
    let newList = [];
    for (let a = 0; a < list.length; a++) {
      if (list[a] >= confi) {
        console.log("values ", list[a], " ", confi);
        let NewData = {
          values: list[a],
          index: a,
        };
        newList.push(NewData);
      }
    }

    console.log("Count List ", newList);
    if (fors === "Two") {
      SetShowOneMess((prev) => [...prev, check(newList, confi, 2)]);
    } else if (fors === "Three") {
      SetShowOneMess((prev) => [...prev, check(newList, confi, 3)]);
    } else if (fors === "Four") {
      SetShowOneMess((prev) => [...prev, check(newList, confi, 4)]);
    } else if (fors === "Five") {
      SetShowOneMess((prev) => [...prev, check(newList, confi, 5)]);
    } else if (fors === "Six") {
      SetShowOneMess((prev) => [...prev, check(newList, confi, 6)]);
    }
    return newList;
  };

  const getItemHolder = (list, items) => {
    let getVal = [];
    let itemHolder = items;
    let countsList = list;

    console.log("value ", countsList);
    for (let a = 0; a < countsList.length; a++) {
      for (let b = 0; b < itemHolder.length; b++) {
        if (b === countsList[a]["index"]) {
          console.log("value ", itemHolder[b], "===", countsList[a]["values"]);
          let newData = {
            values: itemHolder[b],
            index: a,
            counts: countsList[a]["values"],
          };
          getVal.push(newData);
        }
      }
    }

    console.log("value ", getVal);
    return getVal;
  };

  const compute = (lastTB, LastTB2nd, id) => {
    let sets1 = lastTB;
    let sets2 = LastTB2nd;
    let compe = [];
    sets1.map((items) => {
      console.log("maps1 ", items.counts);
      let values1 = items.values.split(",");
      let counts1 = items.counts;
      sets2.map((items2) => {
        let values2 = items2.values;
        let counts2 = items2.counts;

        console.log("meronsa ", items2);
        let NewData = {
          setValue1: items.values,
          counts1: items.counts,
          setValue2: items2.values,
          counts2: items2.counts,
        };
        switch (id) {
          case 3:
            if (values2 === values1[0] + "," + values1[1]) {
              NewData.compute = (counts1 * 100) / counts2;
              NewData.getDouble = values1[0] + "," + values1[1];
              compe.push(NewData);
            } else if (values2 === values1[0] + "," + values1[2]) {
              NewData.getDouble = values1[0] + "," + values1[2];
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            } else if (values2 === values1[1] + "," + values1[2]) {
              NewData.getDouble = values1[1] + "," + values1[2];
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            }
            break;
          case 4:
            if (values2 === values1[0] + "," + values1[1] + "," + values1[2]) {
              NewData.compute = (counts1 * 100) / counts2;
              NewData.getDouble =
                values1[0] + "," + values1[1] + "," + values1[2];
              compe.push(NewData);
            } else if (
              values2 ===
              values1[0] + "," + values1[2] + "," + values1[3]
            ) {
              NewData.getDouble =
                values1[0] + "," + values1[2] + "," + values1[3];
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            } else if (
              values2 ===
              values1[1] + "," + values1[2] + "," + values1[3]
            ) {
              NewData.getDouble =
                values1[1] + "," + values1[2] + "," + values1[3];
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            }
            break;
          case 5:
            if (
              values2 ===
              values1[0] +
                "," +
                values1[1] +
                "," +
                values1[2] +
                "," +
                values1[4]
            ) {
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            } else if (
              values2 ===
              values1[0] +
                "," +
                values1[2] +
                "," +
                values1[3] +
                "," +
                values1[4]
            ) {
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            } else if (
              values2 ===
              values1[1] +
                "," +
                values1[2] +
                "," +
                values1[3] +
                "," +
                values1[4]
            ) {
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            }
            break;
          case 6:
            if (
              values2 ===
              values1[0] +
                "," +
                values1[1] +
                "," +
                values1[2] +
                "," +
                values1[4] +
                "," +
                values1[5]
            ) {
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            } else if (
              values2 ===
              values1[0] +
                "," +
                values1[2] +
                "," +
                values1[3] +
                "," +
                values1[4] +
                "," +
                values1[5]
            ) {
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            } else if (
              values2 ===
              values1[1] +
                "," +
                values1[2] +
                "," +
                values1[3] +
                "," +
                values1[4] +
                "," +
                values1[5]
            ) {
              NewData.compute = (counts1 * 100) / counts2;
              compe.push(NewData);
            }
            break;
        }
      });
    });

    console.log("compet ", compe);
    return compe;
  };

  const onceCompute = (twos, once, onceCount, confi) => {
    let sets1 = twos;
    let sets2 = once;
    let compe = [];
    sets1.map((items) => {
      let values1 = items.values.split(",");
      let counts1 = items.counts;
      sets2.map((items2, index) => {
        if (onceCount[index] >= confi) {
          let values2 = items2;
          let NewData = {
            setValue1: items.values,
            counts1: items.counts,
            setValue2: values2,
            counts2: onceCount[index],
          };
          console.log("meronsa ", items2);
          if (values2 === values1[0]) {
            NewData.compute = (confi * 100) / onceCount[index];
            compe.push(NewData);
          } else if (values2 === values1[1]) {
            NewData.compute = (confi * 100) / onceCount[index];
            compe.push(NewData);
          } else if (values2 === values1[2]) {
            NewData.compute = (confi * 100) / onceCount[index];
            compe.push(NewData);
          }
        }
      });
    });

    console.log("once ", compe);
    return compe;
  };

  const doblesCompute = (itemss, twos, onceCount, confi, id) => {
    let sets1 = itemss;
    let sets2 = twos;
    let compe = [];
    sets1.map((items) => {
      let values1 = items.values.split(",");
      let counts1 = items.counts;
      sets2.map((items2, index) => {
        if (onceCount[index] >= confi) {
          let values2 = items2;
          let NewData = {
            setValue1: items.values,
            counts1: items.counts,
            setValue2: values2,
            counts2: onceCount[index],
          };
          console.log("meronsa ", items.values);

          switch (id) {
            case 1:
              if (values2 === values1[0] + "," + values1[1]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[0] + "," + values1[2]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[0] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[1] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[1] + "," + values1[2]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[2] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              }
              break;
            case 2:
              if (values2 === values1[0] + "," + values1[1]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[0] + "," + values1[2]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[0] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[0] + "," + values1[4]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[1] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[1] + "," + values1[2]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[1] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[2] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[2] + "," + values1[4]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[3] + "," + values1[4]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              }
              break;
            case 3:
              if (values2 === values1[0] + "," + values1[1]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[0] + "," + values1[2]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[0] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[0] + "," + values1[4]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[0] + "," + values1[5]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[1] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[1] + "," + values1[2]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[1] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[1] + "," + values1[4]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[2] + "," + values1[3]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[2] + "," + values1[4]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[2] + "," + values1[5]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[3] + "," + values1[4]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[3] + "," + values1[5]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              } else if (values2 === values1[4] + "," + values1[5]) {
                NewData.compute = (confi * 100) / onceCount[index];
                compe.push(NewData);
              }
              break;
          }
        }
      });
    });

    console.log("once ", compe);
    return compe;
  };

  const forrCompute = (itemss, three, onceCount, confi, id) => {
    let sets1 = itemss;
    let sets2 = three;
    let compe = [];
    sets1.map((items) => {
      let values1 = items.values.split(",");
      let counts1 = items.counts;
      sets2.map((items2, index) => {
        if (onceCount[index] >= confi) {
          let values2 = items2;
          let NewData = {
            setValue1: items.values,
            counts1: items.counts,
            setValue2: values2,
            counts2: onceCount[index],
          };
          console.log("meronsa ", items.values);

          if (
            values2 ===
            values1[0] + "," + values1[1] + "," + values1[2] + "," + values1[3]
          ) {
            NewData.compute = (confi * 100) / onceCount[index];
            compe.push(NewData);
          } else if (
            values2 ===
            values1[1] + "," + values1[2] + "," + values1[3] + "," + values1[4]
          ) {
            NewData.compute = (confi * 100) / onceCount[index];
            compe.push(NewData);
          }
        }
      });
    });

    console.log("once ", compe);
    return compe;
  };

  const fiveCompute = (itemss, three, onceCount, confi, id) => {
    let sets1 = itemss;
    let sets2 = three;
    let compe = [];
    sets1.map((items) => {
      let values1 = items.values.split(",");
      let counts1 = items.counts;
      sets2.map((items2, index) => {
        if (onceCount[index] >= confi) {
          let values2 = items2;
          let NewData = {
            setValue1: items.values,
            counts1: items.counts,
            setValue2: values2,
            counts2: onceCount[index],
          };
          console.log("meronsa ", items.values);

          if (
            values2 ===
            values1[0] +
              "," +
              values1[1] +
              "," +
              values1[2] +
              "," +
              values1[3] +
              "," +
              values1[4]
          ) {
            NewData.compute = (confi * 100) / onceCount[index];
            compe.push(NewData);
          } else if (
            values2 ===
            values1[1] +
              "," +
              values1[2] +
              "," +
              values1[3] +
              "," +
              values1[4] +
              "," +
              values1[5]
          ) {
            NewData.compute = (confi * 100) / onceCount[index];
            compe.push(NewData);
          }
        }
      });
    });

    console.log("once ", compe);
    return compe;
  };

  //Button Animate
  const [scaleValue] = useState(new Animated.Value(1));

  const AnimateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
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

  const Buttons = {
    ...styles.SubmitButton,
    backgroundColor: "#444eff",
  };

  const CustomTable = (items, DigVal, TableTitle, ShowHeader, id) => {
    return (
      <View style={styles.table} key={id}>
        <View style={styles.tableHeader}>
          {ShowHeader && <Text style={styles.TextTitle}>Answer</Text>}
          <Text style={styles.textTitle}>{TableTitle}</Text>
        </View>
        <View style={styles.ItemTables}>
          <View style={styles.tableFields}>
            <Text style={styles.ColumnTitle}>Item Set</Text>
            <Text style={styles.ColumnTitle}>Frequence </Text>
          </View>
          {items.map((data, index) => {
            let isValueGreaterThanConfi = DigVal[index] >= getSupp;
            let itemBackgroundColor = isValueGreaterThanConfi
              ? "white"
              : "#ff8d8d";
            let textColor = isValueGreaterThanConfi ? "black" : "white";

            let radius1 = isValueGreaterThanConfi ? 10 : 0;

            return (
              DigVal[index] >= getSupp && (
                <View
                  style={{
                    ...styles.itemsRow,
                    backgroundColor: itemBackgroundColor,
                    borderBottomRightRadius: radius1,
                    borderBottomLeftRadius: radius1,
                    height: data.length >= 19 ? "auto" : 35,
                  }}
                  key={index}
                >
                  <Text style={{ color: textColor }}>{data}</Text>
                  <Text style={{ color: textColor }}>{DigVal[index]}</Text>
                </View>
              )
            );
          })}
          {ShowOneMess[id] && (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                height: 35,
              }}
            >
              <Text>{Message}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const CompeTable = (item, TableTitle, ShowHeader, id) => {
    return (
      <View style={styles.table} key={id}>
        <View style={styles.tableHeader}>
          <Text style={styles.TextTitle}>Computation</Text>
          {ShowHeader && <Text style={styles.textTitle}>{TableTitle}</Text>}
        </View>
        {item.map((data, index) => {
          return (
            data.compute >= getConfi && (
              <View style={styles.compeContainer} key={index}>
                <View style={styles.AnswerContainers}>
                  <Text style={styles.fontstyle}>=</Text>
                  <View style={styles.solutionContainer}>
                    <Text
                      style={{
                        ...styles.solutionText,
                        ...styles.fontstyle,
                      }}
                    >{`{${data.setValue1}}`}</Text>
                    <Text
                      style={styles.fontstyle}
                    >{`{${data.setValue2}}`}</Text>
                  </View>
                  <Text style={styles.fontstyle}>=</Text>
                  <View style={styles.solutionContainer}>
                    <Text
                      style={{
                        ...styles.solutionText,
                        ...styles.fontstyle,
                      }}
                    >
                      {`${getSupp}`}
                    </Text>
                    <Text style={styles.fontstyle}>{`${data.counts2}`}</Text>
                  </View>
                  <Text style={styles.fontstyle}>* 100% = </Text>
                  <Text style={styles.fontstyle}>{`${data.compute.toFixed(
                    2
                  )}%`}</Text>
                </View>
              </View>
            )
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {ShowLoading && <Loadingbar isShow={ShowLoading} />}
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ScrollContainer}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.TextTitle}>Transaction List</Text>
            </View>
            <View style={styles.ItemTables}>
              <View style={styles.tableFields}>
                <Text style={styles.ColumnTitle}>Transaction</Text>
                <Text style={styles.ColumnTitle}>Items</Text>
              </View>
              {NoTransact.map((data) => (
                <View
                  style={{
                    ...styles.itemsRow,
                    height: "auto",
                  }}
                  key={data.id}
                >
                  <Text>{data.Name}</Text>
                  <CustomClickInput
                    GivenItem={itemsHolder}
                    title={data.Name}
                    keys={data.id}
                    getValue={getAllItem}
                  />
                </View>
              ))}
            </View>
            <View style={styles.footerContainer}>
              <View>
                {getValues("support") > 0 && (
                  <>
                    <Text>Support:</Text>
                  </>
                )}
                <CustomInput
                  control={control}
                  name="support"
                  rules={{ required: true }}
                  placeholder="Support ..."
                  OnMeSize={true}
                  HeighSize={50}
                  WidhtSize={125}
                  getContent={setGetSupp}
                  keyboardType={"numeric"}
                  max={3}
                  disab={true}
                />
              </View>
              <View>
                {getValues("confidence").length > 0 && (
                  <>
                    <Text>Confidence:</Text>
                  </>
                )}
                <CustomInput
                  control={control}
                  name="confidence"
                  rules={{ required: true }}
                  placeholder="Confidence% .."
                  OnMeSize={true}
                  HeighSize={50}
                  WidhtSize={125}
                  getContent={setGetConfi}
                  keyboardType={"numeric"}
                  max={3}
                  disab={true}
                />
              </View>
              <TouchableWithoutFeedback
                onPressIn={AnimateButton}
                onPress={handleSubmit(handleSubmited)}
              >
                <Animated.View
                  style={{ ...Buttons, transform: [{ scale: scaleValue }] }}
                >
                  <Text style={styles.textButton}>Submit</Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {ShowAns && (
            <>
              {CustomTable(OneDigItems, OneDigValues, "Table 1", true, 5)}
              {CustomTable(DobDigItems, DobDigValues, "Table 2", false, 0)}
              {CustomTable(ThreeDigItems, ThreeDigValues, "Table 3", false, 1)}
              {CustomTable(FourDigItems, FourDigValues, "Table 4", false, 2)}
              {CustomTable(FiveDigItems, FiveDigValues, "Table 5", false, 3)}
              {CustomTable(SixDigItems, SixDigValues, "Table 6", false, 4)}
              {OnceCompe.length > 0 && CompeTable(OnceCompe, "Wala", false, 6)}
              {dobleCompe.length > 0 &&
                CompeTable(dobleCompe, "Wala", false, 7)}
              {TBCompe.length > 0 && CompeTable(TBCompe, "Wala", false, 8)}
              {fourCompe.length > 0 && CompeTable(fourCompe, "Wala", false, 9)}
              {fiveCompe.length > 0 && CompeTable(fiveCompe, "Wala", false, 10)}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

// ThirdCompe
// OnceCompe

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a5b3ff",
    paddingTop: 40,
    paddingBottom: 5,
    // paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview: {
    // borderWidth: 1,
    // paddingTop: 50,
    // paddingBottom: 50,
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
  },
  ScrollContainer: {
    // borderWidth: 1,
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    height: "auto",
    alignItems: "center",
    overflow: "visible",
    margin: 10,
  },
  tableHeader: {
    // borderWidth: 1,
    width: "100%",
    height: 70,
    paddingLeft: 10,
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  textTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4c67ff",
  },
  TextTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#6db8ff",
  },
  ItemTables: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#5E91FF",
    backgroundColor: "white",
    marginBottom: 15,
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  ColumnTitle: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  tableFields: {
    // borderWidth: 1,
    backgroundColor: "#5E91FF",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: 300,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },

  itemsRow: {
    // borderWidth: 1,
    borderColor: "gray",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  footerContainer: {
    // borderWidth: 1,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  SubmitButton: {
    // borderWidth: 1,
    borderRadius: 10,
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  textButton: {
    color: "white",
  },
  compeContainer: {
    // borderWidth: 1,
    width: "100%",
    height: "auto",
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  AnswerContainers: {
    borderWidth: 1,
    borderColor: "#4c67ff",
    backgroundColor: "#8194ff",
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  solutionContainer: {
    // borderWidth: 1,
    width: 70,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  fontstyle: {
    color: "white",
  },
  solutionText: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: 60,
    textAlign: "center",
  },
});
