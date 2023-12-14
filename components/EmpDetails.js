import * as React from 'react';
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native-web";

const DisplayLogo = () => {
    return (
      <Image style={styles.logoSub}
        source={require('../images/ROI_Logo.jpg')
        }
  
      />
    );
  };
  
  const DisplayProfilePic= () => {
    return (
      <Image style={styles.avata}
        source={require('../images/Avata.png')
        }
  
      />
    );
  };

function EmpDetails ({route, navigation}) {
    const { employeeId } = route.params;
    const [employee, setEmp] = useState({
        Id: -1,
        Name: '',
        Phone: '',
        Department: {
            Id: -1,
            Name: ''
        },
        Street: '',
        City: '',
        State: '',
        Zip: '',
        Country: ''
    });

    const getEmpById = async (id) => {
        try {
        const response = await fetch(
            `http://localhost:44350/redOpalWebService1.asmx/GetEmployeeById?id=${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            return json;
        
        } catch (error) {
        console.error(error);
        } 
    };

    useEffect(() => {
        // Correctly handle the async function inside useEffect
        const fetchEmp = async () => {
            const emp = await getEmpById(employeeId);
            setEmp(emp);
        }

        fetchEmp();
    }, [employeeId]);

    const UpdateEmp = () => {
        
        navigation.navigate('UpdateEmployee', { employee:employee ,title : 'Update staff profile', });
      };

    return(

      <View>
        <View style ={styles.logoCont}>
          {DisplayLogo()}
        </View>
        <View style = {styles.profilePic}>
          {DisplayProfilePic()}
        </View>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput style ={styles.input}
            value={employee.Name}
            onChangeText={(value) => onChangeName(value)}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput style ={styles.input}
            value={employee.Phone}
            onChangeText={(value) => onChangePhone(value)}
        />
        <Text style={styles.label}>Department</Text>
        <TextInput style ={styles.input}
            value={employee.Department.Id}
            onChangeText={(value) => onChangeDepartment(value)}
        />
        <Text style={styles.label}>Address</Text>
          <View style={styles.addressBox}>                  
            <TextInput  style ={styles.addTextInput}
                value={employee.Street}
                onChangeText={(value) => onChangeStreet(value)}
            />
            <TextInput style ={styles.addTextInput}
                value={employee.City}
                onChangeText={(value) => onChangeCity(value)}
            />
            
            <TextInput style ={styles.addTextInput}
                value={employee.State}
                onChangeText={(value) => onChangeState(value)}
            />
            <TextInput style ={styles.addTextInput}
                value={employee.Zip}
                onChangeText={(value) => onChangeZip(value)}
            />
              <TextInput style ={styles.addTextInput}
                value={employee.Country}
                onChangeText={(value) => onChangeCountry(value)}
                />
          </View>
          <Button
              color='#595959'
              title='Edit'
              onPress={() => UpdateEmp(employee.Id)}
          />
          </View>
      </View>

    )
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
    addTextInput: {
      height: 10,
      margin: 10,
      flex: 1, // Equal flex to distribute space evenly
      paddingHorizontal: 8, // Add padding as needed
     // borderWidth: 1, 
      // borderWidth: 1,
     // paddingTop: 2,
      //paddingBottom: 3,
    },
    container: {
      flexDirection: 'row', // Use row for horizontal layout
      justifyContent: 'space-between', // Adjust this based on your layout needs
      paddingHorizontal: 16, // Add padding as needed
      paddingTop: 16,
    },
    column: {
      flex: 1, // Equal flex to distribute space evenly
      paddingHorizontal: 8, // Add padding as needed
      //borderWidth: 1, // Add border for visualization
    },
    row: {
      paddingVertical: 8, // Add padding between rows
    },
    logoCont:{
      flexDirection: 'row',
      justifyContent: 'end',
      padding: 10,
    },
    profilePic:{
      width: 70,
      height: 70,
      marginTop :15,
      flexDirection: 'row',
      justifyContent: 'center',
      //padding: 10,
    },
    avata: {
      width: 70,
      height: 70,
      marginTop :20,
      alignItems :'center',
      justifyContent: 'center',
    },
    // profilePic: {
    //   width: 100,
    //   height: 100,
    //   marginTop :20,
    //   alignItems :'center',
    //   justifyContent: 'center',
    // },
    logoSub: {
      marginTop: 2,
      width: 75,
      height: 37.5,
      alignSelf: 'flex-right',
      justifyContent: 'right',
    },
    
  });

export default EmpDetails;