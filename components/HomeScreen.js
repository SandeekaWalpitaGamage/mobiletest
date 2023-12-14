import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, Button, Image, StyleSheet } from "react-native";



const DisplayLogo = () => {
  return (
    <Image style={styles.logoMain}
      source={require('../images/ROI_Logo.jpg')
      }

    />
  );
};

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getEmp = async () => {
    try {
      const response = await fetch(
        "http://localhost:44350/redOpalWebService1.asmx/GetPeople"
      );

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getEmp();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>

          <View style ={{flex:1}}>
            {/* <Image
              source={require('../images/ROI_Logo.jpg')}
              style={{ width: 500, height: 300 }}>

            </Image> */}
            {DisplayLogo ()}
          </View>

          <View style ={{flex:2}}>
            <Text style = {styles.titletext}>Welcome to Red Opal Innovations </Text>
          </View>
          <View style ={{flex:1, justifyContent:'flex-end'}}>
            <Button
              color = '#595959'
              width = '90%'
              title = "Staff Directory"
              onPress = {() => {
              /* 1. Navigate to the Details route with params */
                navigation.navigate('Details', {
                itemId: 86,
                otherParam: 'anything you want here',
              });
            }}
          />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titletext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#941a1d',
    marginTop: 30,
    justifyContent :'flex-end'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  logoMain: {
    marginTop: 2,
    width: 100,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnStyle:{
    color:'#595959',
    width :'90%'
  }
   
});

export default HomeScreen;