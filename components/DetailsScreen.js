import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, StyleSheet, Alert, TouchableOpacity,Image } from 'react-native';
import { ScrollView } from 'react-native-web';
import { AddEmpScreen } from '/components/AddNewEmployee';

// display logo
const DisplayLogo = () => {
  return (
    <Image style={styles.logoSub}
      source={require('../images/ROI_Logo.jpg')
      }

    />
  );
};


// display profile picture
const DisplayProfilePic= () => {
  return (
    <Image style={styles.itemImage}
      source={require('../images/Avata.png')
      }

    />
  );
};


function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  const { otherParam } = route.params;
  const [selectedId, setSelectedId] = useState(null);

  const [data, setData] = useState([]);

  const getEmp = async (setData) => {
    try {
      const response = await fetch(
        "http://localhost:44350/redOpalWebService1.asmx/GetPeople"
      );

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmp(setData);
  }, []);

  const ViewEmployee = (selectedId) => {    
    navigation.navigate('ViewEmployee', { employeeId:selectedId });
  };

  useEffect(() => {
    navigation.setOptions({
      title: ' ', // Change this to the desired title
    });
  }, []);

  return (
    <View >
      <View style={styles.logoCont}>
        {DisplayLogo()}
      </View>
      <View >
        <Text style={styles.pageTitle}>Staff Directory</Text>
      </View>
      
      <ScrollView>
        <View>
        <FlatList 
            data={data}
            // keyExtractor={({ id }) => id}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.itemContainer}
                onPress={() => ViewEmployee(item.Id)}>
                  {DisplayProfilePic ()}
                  <Text style={styles.listTitle}>{`${item.Name}`}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View>
          <Button
            color='#595959'
            title='Add Employee'
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate('AddEmployee', {
                itemId: 86,
                otherParam: 'anything you want here',
                title : 'Add new staff profile',
                
              });
            }}
          />

        </View>
      </ScrollView>
    </View>
  );
}
const ShowAlert =() =>{
  Alert.alert('Suce')
}
const styles = StyleSheet.create({
  pageTitle: {
    fontWeight: 'bold',
    color: '#941a1d',
    fontSize:16,margin: 12,
    textAlign: 'left',
   
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerStyle:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  listTitle:{
    fontSize:15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 1,
  },
  itemImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  logoSub: {
    //paddingTop:5,
    marginTop: 2,
    width: 75,
    height: 37.5,
    //alignItems: 'left',
    //alignSelf: 'right',
    align: 'right',
    //alignContent:'center',
  },
  logoCont:{
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  }

})


export default DetailsScreen;