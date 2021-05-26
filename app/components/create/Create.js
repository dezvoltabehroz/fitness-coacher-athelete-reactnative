import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../style/colors'
import { RadioButton, Checkbox } from 'react-native-paper';
import { FontFamily } from '../../style/typograpy'
import Button from '../../common/Button'
import AgeGroupModal from '../../common/ageGroupModal'
import { TrainingCategoryServices } from '../../services';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const SettingScreen = (props) => {
  useEffect(() => {
    getCategories();
    getSkills();
  }, [])
  const [modalVisible, setmodalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState('baseBall')
  const [hitting, sethitting] = useState(false)
  const [pitching, setPitching] = useState(false)
  const [catcher, setcatcher] = useState(false)
  const [infield, setInfield] = useState(false)
  const [outfield, setOutfield] = useState(false)
  const [ihitting, setihitting] = useState(false)
  const [ipitching, setiPitching] = useState(false)
  const [icatcher, seticatcher] = useState(false)
  const [iinfield, setiInfield] = useState(false)
  const [ioutfield, setiOutfield] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [age, setAge] = useState('')
  const [note, setNotes] = useState('')
  const [selectInstruction, setSelectInstruction] = useState({});
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [instructorModalVisible, setInstructorModalVisible] = useState(false);
  const [selectInstructor, setSelectInstructor] = useState({});
  const [instructor, setInstructor] = useState({});
  const [skill, setSkill] = useState({});
  const [instruction, setInstruction] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [coachSkills, setCoachSkills] = useState([]);
  const [subCatVal, setSubCat] = useState(false)
  const [cat, setCat] = useState(false)
  const [skillVal, setSkillVal] = useState(false)
  const [prev, setPrev] = useState(0);
  const [arr, setArr] = useState([
    {
      flag: false,
      age: "Under-9",
    },
    {
      flag: false,
      age: "10-11",
    },
    {
      flag: false,
      age: "12-14",
    },
    {
      flag: false,
      age: "15-16",
    },
    {
      flag: false,
      age: "18+",
    },
  ]);
  const getCategories = () => {
    setLoading(true)
    TrainingCategoryServices.allTrainingTypes()
      .then((response) => {
        var skill = response.data.trainingTypes
        console.log("allTrainingTypes level", skill);
        for (let index = 0; index < response.data.trainingTypes.length; index++) {
          skill[index].selected = false;
        }
        setCategories(skill);
        getSubCategories(skill[0]);
      })
      .catch((err) => console.log(err))
  };

  const getSubCategories = (item) => {
    TrainingCategoryServices.subCategories(item.id)
      .then((response) => {
        setCategoriesLoading(false)
        var subCategory = [...response.data.subCategories];
        console.log("skill level", subCategory);
        for (let index = 0; index < subCategory.length; index++) {
          subCategory[index].selected = false;
        }
        console.log(subCategory)
        setSubCategories(subCategory);
        getSkills();
      })
      .catch((err) => console.log(err))
  };

  const getSkills = async () => {
    TrainingCategoryServices.getSkillsBy()
      .then((response) => {
        var skill = response.data.skills;
        console.log("skill level", skill);
        for (let index = 0; index < response.data.skills.length; index++) {
          skill[index].selected = false;
        }
        setCoachSkills(skill);
        setLoading(false)
      })
      .catch((err) => {
        console.log("error =", err);
      });
  };

  const settingValue = (item) => {
    setSelectInstruction(item);
    getSkills(item);
  };

  const settingInstructor = (item) => {
    setSelectInstructor(item);
    getSubCategories(item);
  };

  const selectingSkills = (iteration) => {
    var skill = [...coachSkills];
    // if (skill[iteration].selected) {
    //   skill[iteration].selected = false;
    // } else {
    //   skill[iteration].selected = true;
    // }
    for (let index = 0; index < skill.length; index++) {
      skill[index].selected = false;
    }
    skill[iteration].selected = true;
    setSkill(skill[iteration])
    console.log("skill level is ", skill);
    setCoachSkills(skill);
    setSkillVal(true)
  };

  const selectingTrainingType = async (iteration) => {
    var categoriesArr = [...categories];
    for (let index = 0; index < categoriesArr.length; index++) {
      categoriesArr[index].selected = false;
    }
    categoriesArr[iteration].selected = true;
    setInstructor(categoriesArr[iteration])
    getSubCategories(categoriesArr[iteration])
    await setCategories(categoriesArr);
    await setCat(true);

  };

  useEffect(() => {
    // setSubmit()
  }, [submit])

  const checkBoxFunc = (iteration) => {
    var subCategory = [...subCategories];
    for (let index = 0; index < subCategory.length; index++) {
      subCategory[index].selected = false;
    }
    subCategory[iteration].selected = true;
    setInstruction(subCategory[iteration])
    setSubCategories(subCategory);
    for (let index = 0; index < instruction.length; index++) {
      if (instruction[index].selected) {
        setSubCat(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <ScrollView style={styles.bottom}>
        {
          loading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={20} color={'#030E2D'} />
            </View>
            :
            <>
              <FlatList
                data={categories}
                contentContainerStyle={styles.contentContainerStyle}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.outerView}>
                      <View style={[styles.innerView1]}>
                        <MaterialIcons onPress={() => selectingTrainingType(index)}
                          size={20}
                          name={item.selected ? "check-box" : "check-box-outline-blank"} />
                        <Text style={styles.innertext}>{item.title}</Text>
                      </View>
                    </View>
                  );
                }}
              />
              {/* </View> */}
              {submit && !cat && (
                <Text style={styles.errorStyle}> Please select instructor type</Text>
              )}

              <Text style={styles.text}>Instruction Types</Text>
              <View style={styles.outerView}>

                <FlatList
                  data={subCategories}
                  contentContainerStyle={styles.contentContainerStyle}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.outerView}>
                        <View style={[styles.innerView1]}>
                          <MaterialIcons onPress={() => checkBoxFunc(index)}
                            size={20}
                            name={item.selected ? "check-box" : "check-box-outline-blank"} />
                          <Text style={styles.innertext}>{item.title}</Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
              {submit && subCatVal != true && (
                <Text style={styles.errorStyle}>
                  Please select aleast one instruction type
                </Text>
              )}
              <Text style={[styles.text, { marginTop: 5 }]}>Skill Level</Text>

              <FlatList
                data={coachSkills}
                contentContainerStyle={styles.contentContainerStyle}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.outerView}>
                      <View style={[styles.innerView1]}>
                        <MaterialIcons onPress={() => selectingSkills(index)}
                          size={20}
                          name={item.selected ? "check-box" : "check-box-outline-blank"} />
                        <Text style={styles.innertext}>{item.skill}</Text>
                      </View>
                    </View>
                  );
                }}
              />
              {submit && !skillVal && (
                <Text style={styles.errorStyle}>
                  Please select atleast one skill level
                </Text>
              )}

              <Text style={[styles.text, { marginTop: 5 }]}>Coach Age Group</Text>

              <FlatList
                data={arr}
                contentContainerStyle={styles.contentContainerStyle}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.outerView}>
                      <View style={[styles.innerView1]}>
                        <MaterialIcons onPress={() => {
                          let array = arr;
                          array[prev].flag = false;
                          array[index].flag = true;
                          setArr(arr);
                          // ageArr.push({ ageGroup: item.age })
                          // setAge(ageArr)
                          setAge(item.age);
                          setPrev(index);
                        }}
                          size={20}
                          name={item.flag && age == item.age ? "check-box" : "check-box-outline-blank"} />
                        <Text style={styles.innertext}>{item.age}</Text>
                      </View>
                    </View>
                  );
                }}
              />
              {submit && !age && (
                <Text style={styles.errorStyle}>
                  Please select age group
                </Text>
              )}
              <View style={styles.imageOuter}>
                <View style={styles.profileView}>
                  <Image source={require('../../assets/avatar.png')} style={styles.image} />
                  <Image source={require('../../assets/video.png')} style={[styles.image, { position: 'absolute', left: 40, top: 35 }]} />

                </View>
                <Text style={styles.imageText}>Upload Video/Image</Text>
              </View>
              <Text style={[styles.text, { marginTop: 15 }]}>Notes</Text>
              <TextInput value={note} style={styles.input} onChangeText={(val) => setNotes(val)} />
              {submit && !note && (
                <Text style={styles.errorStyle}>
                  Please add detail note
                </Text>
              )}
              <Button text={'Create Booking Request'} onPress={() => {
                if (submit && instruction && instructor && age && skill && note) {
                  let data = {
                    instructor: instructor,
                    instruction: instruction,
                    ageGroup: age,
                    skill: skill,
                    note: note
                  };
                  props.navigation.navigate('Preview', { data })
                } else {
                  setSubmit(true)
                }

              }} />
              <View style={{ height: 50 }}></View>
            </>}
      </ScrollView>

      <AgeGroupModal modalVisible={modalVisible} setModalVisible={setmodalVisible} setAge={setAge} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom:
  {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: '22%',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: "5%",
    width: width * 0.95,
  },
  text:
  {
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: FontFamily.helveticaLight,
  },
  errorStyle: {
    fontSize: 12,
    color: "red",
    paddingLeft: 0,
    paddingBottom: 5
  },
  outerView:
  {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8
  },
  outerView1:
  {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  innerView:
  {
    height: 40,
    width: '48%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    alignItems: 'center',
    flexDirection: 'row'
  },
  innertext:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 12
  },

  innerView1:
  {
    height: 40,
    // width: '33%',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: "3%",
    borderColor: Colors.textColor,
    // borderColor: 'red',
    paddingRight: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: 'red',
  },
  innerView2:
  {
    height: 40,
    width: '31%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageOuter:
  {
    height: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.backgroundColor,
    marginTop: 20
  },
  profileView:
  {
    height: 70,
    width: 70,
    backgroundColor: Colors.whiteColor,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  image:
  {
    height: 20,
    width: 20
  },
  imageText:
  {
    fontSize: 14,
    color: Colors.blackColor,
    fontFamily: FontFamily.helveticaBold,
    marginTop: 10
  },
  input:
  {
    height: 120,
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.textColor,
    marginTop: 10,
    padding: 10

  },
  dropDown:
  {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  dropImage:
  {
    height: 14,
    width: 14
  }

});

export default SettingScreen;
