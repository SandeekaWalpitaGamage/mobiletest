import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "react-native-web";

// Display sub logo
const DisplayLogo = () => {
  return (
    <Image style={styles.logoSub}
      source={require('../images/ROI_Logo.jpg')
      }

    />
  );
};

// Display profile picture.
  const DisplayProfilePic= () => {
    return (
      <Image style={styles.avata}
        source={require('../images/Avata.png')
        }

      />
    );
  };



  const AddEmpScreen = ({ route, navigation }) => {
    const { title } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    const [emp, setEMP] = useState({
      name: "",
      phone: "",
      department: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });

       
    const onChangeName = (value) => {
      setEMP({ ...emp, name: value });  
    };

    const onChangePhone = (value) => {
      setEMP({ ...emp, phone: value});
    };
  
    const onChangeDepartment = (value) => {
      setEMP({ ...emp, department: value});
    };
  
    const onChangeStreet = (value) => {
      setEMP({ ...emp, street: value});
    };
  
    const onChangeCity = (value) => {
      setEMP({ ...emp, city: value});
    };
  
    const onChangeState = (value) => {
      setEMP({ ...emp, state: value});
    };
  
    const onChangeZip = (value) => {
      setEMP({ ...emp, zip: value});
    };
  
    const onChangeCountry = (value) => {
      setEMP({ ...emp, country: value });
    };
    
    /* Clear input text boxes*/
    const clsEmpTxtBoxes = () => {
      emp.name = "";
      emp.phone = "";
      emp.department = "";
      emp.street = "";
      emp.city = "";
      emp.state = "";
      emp.zip = "";
      emp.country = "";
    };
    useEffect(() => {
      navigation.setOptions({ title });
    }, [title]);
    /* Add new Employee */
  const AddEmp = async (empInfo) => {
    
    try {
        const response = await fetch("http://localhost:44350/redOpalWebService1.asmx/AddEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: empInfo,
      });

    }
    catch (error) {
      console.error('Error adding employee:', error);
    }
  }; 
  
  const validateFields = () => {
    for (let key in emp) {
      const value = emp[key];
      if (typeof value === "string" && value.trim() === "") {
        return false;
      }
    }
    return true;
  };

  const clickHandle = () => {
    if (!validateFields()) {
      window.alert("You have to fill all text boxes", [{ text: "OK" }]);
      return;
    }
    let empInfo = `name=${emp.name}&phone=${emp.phone}&department=${emp.department}&street=${emp.street}&city=${emp.city}&state=${emp.state}&zip=${emp.zip}&country=${emp.country}`;
    AddEmp(empInfo);
    window.alert('Success','New employee added');
  }

    return (    
      <View>
        <View>
          <View style= {styles.logoCont}> 
            {DisplayLogo()}
          </View>
        </View>
        
        <View style={styles.profilePic}>
          {DisplayProfilePic()}
        </View>
        
        <View>
          <Text style={styles.label}>Name</Text>
            <TextInput style ={styles.input}
              placeholder="Full Name"
              value={emp.name}
              onChangeText={(value) => onChangeName(value)}
            />
            <Text style={styles.label}>Phone</Text>
            <TextInput style ={styles.input}
              placeholder="Phone"
              value={emp.phone}
              onChangeText={(value) => onChangePhone(value)}
            />
            <Text style={styles.label}>Department</Text>
            <TextInput style ={styles.input}
              placeholder="Department"
              value={emp.department}
              onChangeText={(value) => onChangeDepartment(value)}
            />
            <Text style={styles.label}>Address</Text>
            <View style={styles.addressBox}>
              <TextInput  style ={styles.input}
                placeholder="Street"
                value={emp.street}
                onChangeText={(value) => onChangeStreet(value)}
              />
              <TextInput  style ={styles.input}
                placeholder="City"
                value={emp.city}
                onChangeText={(value) => onChangeCity(value)}
              />
              
              <TextInput style ={styles.input}
                placeholder="State"
                value={emp.state}
                onChangeText={(value) => onChangeState(value)}
              />
              <TextInput style ={styles.input}
                placeholder="Zip"
                value={emp.zip}
                onChangeText={(value) => onChangeZip(value)}
              />
              <TextInput style ={styles.input}
                placeholder="Country"
                value={emp.country}
                onChangeText={(value) => onChangeCountry(value)}
              />
            </View>
        </View>
        
        
        <Button color='#595959' title="Add" onPress={clickHandle}></Button>
      </View>    
     
    );
  };


  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 10,
      borderWidth: 1,
      paddingTop: 2,
      paddingBottom: 3,
    },
    label:{
      margin:5,
      fontWeight: 'bold',
      paddingTop: 5,
      paddingLeft: 7,
      paddingBottom: 0,
    },
    addressBox:{
      margin:12,
      borderWidth:1,
      padding:4,
    },
    avata: {
      width: 70,
      height: 70,
      marginTop :20,
      alignItems :'center',
      justifyContent: 'center',
    },
    logoSub: {
      marginTop: 2,
      width: 75,
      height: 37.5,
      alignSelf: 'right',
    },
    logoCont:{
      flexDirection: 'row',
      justifyContent: 'end',
      padding: 10,
    },
    profilePic:{
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 10,
    },
    // hedding:{
    //   // flexDirection: 'row',
    //   // justifyContent:'start',
    //   // fontWeight: 'bold',
    //   color: '#941a1d',
    //   fontSize:16,margin: 12,
    //   textAlign: 'left',
    // },
  });

export default AddEmpScreen;
