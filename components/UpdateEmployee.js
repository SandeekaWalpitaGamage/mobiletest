import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from "react-native-web";
import { useForm } from 'react-hook-form';
// import {
//   ActivityIndicator,
//   FlatList,
//   Text,
//   TextInput,
//   View,
//   Button,
//   TouchableOpacity,
// } from "react-native";

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

const UpdateEmpSceen = ({route, navigation}) => {
  const { employee } = route.params;
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [updateEmployee, setUpdateEmployee] = useState({
    Id: employee.Id,
    Name: employee.Name,
    Phone: employee.Phone,
    Department: employee.Department.Id,
    Street: employee.Street,
    City: employee.City,
    State: employee.State,
    Zip: employee.Zip,
    Country: employee.Country,
  });


const onChangeName = (value) => {
  setUpdateEmployee({ ...updateEmployee, Name: value });
};

const onChangePhone = (value) => {
  setUpdateEmployee({ ...updateEmployee, Phone: value });
};

const onChangeDepartment = (value) => {
  setUpdateEmployee({ ...updateEmployee, Department: value});
};

const onChangeStreet =(value) =>{
  setUpdateEmployee({...updateEmployee, Street: value});
};
const onChangeCity = (value) => {
  setUpdateEmployee({ ...updateEmployee, City: value });
};

const onChangeState = (value) => {
  setUpdateEmployee({ ...updateEmployee, State: value });
};

const onChangeZip = (value) => {
  setUpdateEmployee({ ...updateEmployee, Zip: value });
};

const onChangeCountry =(value) =>{
  setUpdateEmployee({...updateEmployee, Country: value});
};


// const getEmpById = async (id) => {
//     try {
//     const response = await fetch(
//         `http://localhost:44350/redOpalWebService1.asmx/GetEmployeeById?id=${id}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const json = await response.json();
//         return json;
        
//     } catch (error) {
//     console.error(error);
//     } 
// };

// useEffect(() => {
//     // Correctly handle the async function inside useEffect
//     const fetchEmp = async () => {
//         const emp = await getEmpById(employeeId);
//        // console.log(emp.department.Id)
//         setEmp(emp);
//     }

//     fetchEmp();
// }, [employeeId]);

// const emp = getEmpById(employeeId);  


const UpdateEmp =(empInfo) => {
  
  console.log(empInfo);
  fetch("http://localhost:44350/redOpalWebService1.asmx/UpdateEmployee", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: empInfo,
  })
  
  .catch((err) => {
    console.log(err);
  });
};
   
const clickHandle = ()=> {
  let empInfo = `id=${updateEmployee.Id}&name=${updateEmployee.Name}&phone=${updateEmployee.Phone}&department=${updateEmployee.Department}&street=${updateEmployee.Street}
  &city=${updateEmployee.City}&state=${updateEmployee.State}
  &zip=${updateEmployee.Zip}&country=${updateEmployee.Country}`;
  UpdateEmp(empInfo);
  window.alert("Success", "Employee updated " );
  // Alert.alert("Success", "Employee updated .", [
  //   {
  //     text: "OK",
  //     color :"#D9D9D9",
  //     // onPress: () =>
  //     //   navigation.navigate("Employee Detail", {
  //     //     employee: employee,
  //     //     employeeUpdated: true,
  //     //   }),
  //   },
  // ])
    
}
  

  return (
  
    <View>
      <View style ={styles.logoCont}>
          {DisplayLogo()}
      </View>
      <View style={styles.profilePic}> {DisplayProfilePic()} </View>
      
      <View>
        {/* <Text style={styles.label}>ID</Text>
        <TextInput
          value={updateEmployee.Id}
          //onChangeText={(value) => onChangeEMPID(value)}
        /> */}
        <Text style={styles.label}>Name</Text>
        <TextInput style ={styles.input}
          // placeholder={employee.name}
            value={updateEmployee.Name}
            onChangeText={(value) => onChangeName(value)}
            // editable={true}
            //onChangeText={(value) => setEmp({...employee, name: value})}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput style ={styles.input}
            //placeholder="Phone"
            value={updateEmployee.Phone}
            onChangeText={(value) => onChangePhone(value)}
            //editable={true}
            //onChangeText={(value) => setEmp({...employee, phone: value})}
        />
        <Text style={styles.label}>Department</Text>
        <TextInput style ={styles.input}
        //placeholder={employee.Department.Id}
            value={updateEmployee.Department}
            onChangeText={(value) => onChangeDepartment(value)}
            //editable={true}
        //     onChangeText={(value) => setEmp({...employee, department: value})}
          />
        <Text style={styles.label}>Address</Text>
        <View style={styles.addressBox}>
            <TextInput  style ={styles.input}
                //placeholder="Street"
                value={updateEmployee.Street}
                onChangeText={(value) => onChangeStreet(value)}
                //editable={true}
                //onChangeText={(value) => setEmp({...employee, street: value})}
            />
            <TextInput style ={styles.input}
                //placeholder="City"
                value={updateEmployee.City}
                onChangeText={(value) => onChangeCity(value)}
                //editable={true}
                // onChangeText={(value) => setEmp({...employee, city: value})}
            />            
            <TextInput style ={styles.input}
                //placeholder="State"
                value={updateEmployee.State}
                onChangeText={(value) => onChangeState(value)}
                //editable={true}
                //onChangeText={(value) => setEmp({...employee, state: value})}
            />
            <TextInput style ={styles.input}
                //placeholder="Zip"
                value={updateEmployee.Zip}
                onChangeText={(value) => onChangeZip(value)}
                //editable={true}
                // onChangeText={(value) => setEmp({...employee, zip: value})}
            />
            <TextInput style ={styles.input}
                //placeholder="Country"
                value={updateEmployee.Country}
                onChangeText={(value) => onChangeCountry(value)}
                // onChangeText={(value) => setEmp({...employee, country: value})}
            />
        </View>
        <Button 
            color='#595959'
            type="submit"
            title='Update Employee'
            // onPress={onButtonClick}
            onPress={clickHandle}
            
        />
            {/* <Text>{setIsUpdated ? "The Employee data is updated" : ""}</Text> */}
        
      </View>
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
    alignSelf: 'flex-right',
    justifyContent: 'right',
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
});

export default UpdateEmpSceen;
