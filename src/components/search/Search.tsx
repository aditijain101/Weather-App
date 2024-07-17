import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Header from '../header/Header';
import axios from 'axios';

interface CitySuggestion {
  city: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
}

interface SearchBarProps {
  navigation: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<Array<CitySuggestion>>([]);
  const [debouncedCity, setDebouncedCity] = useState(city);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  useEffect(() => {
    if (debouncedCity.length < 2) {
      setCities([]); // Only start suggesting after 2 characters
      return;
    } else {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
            params: { namePrefix: debouncedCity },
            headers: {
              'X-RapidAPI-Key': '960771d6a8msh9703660de643705p15b5dejsn574c4d84d0cd',
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
          });
          console.log("data", response.data);
          setCities(response.data.data); // Assuming response.data.data contains the list of cities
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchCities();
    }
  }, [debouncedCity]);

  const btnClick = async () => {
    setCities([]);
    console.log("city from search", city);

    // await AsyncStorage.setItem("newcity", city)
    navigation.navigate("WeatherResult", { city });
  };

  const listClick = async (cityname: string) => {
    setCity(cityname);
    
    navigation.navigate("WeatherResult", { cityname });
    setCities([])
  };

  useEffect(() => {
    if (city.length < 1) {
      setCities([]);
    }
  }, [city]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />
        <TextInput
          style={styles.textInput}
          onChangeText={setCity}
          value={city}
          placeholder='Enter city name'
          spellCheck
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={btnClick}
            buttonColor="blue"
            mode="contained"
          >
            Save Changes
          </Button>
        </View>
        {cities.map((item, index) => (
          <Card
            key={index}
            style={{ padding: 12 }}
            onPress={() => listClick(item.city)}
          >
            <Text>{item.city}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 30
  },
  textInput: {
    color: "black",
    fontSize: 18,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 5,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  button: {
    width: 'auto',
    marginTop: "auto"
  }
});

export default SearchBar;
