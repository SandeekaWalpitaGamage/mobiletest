import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
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
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          // keyExtractor={({ id }) => id}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <Text>
              {item.Id}, {item.Name}, {item.Phone},{item.Department}, {item.Street}, {item.City}, {item.State},{item.Zip},{item.Country}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;
