import React, { useState, useEffect } from 'react';
import { TextInput, Button, Card, Title, Snackbar } from 'react-native-paper';
import { View, Text, FlatList, Image } from 'react-native';
import Header from '../components/header/Header';
import axios from 'axios';
import WeatherIcon from '../assets/weatherIcon.png';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type WeatherResultNavigationProp = StackNavigationProp<RootStackParamList, 'WeatherResult'>;
type WeatherResultRouteProp = RouteProp<RootStackParamList, 'WeatherResult'>;

interface WeatherProps {
  navigation: WeatherResultNavigationProp;
  route: WeatherResultRouteProp;
}

const WeatherResult: React.FC<WeatherProps> = ({ navigation, route }) => {
  const { city } = route.params;

  const [info, setInfo] = useState({
    name: "loading !!",
    temp: "loading",
    humidity: "loading",
    desc: "loading",
    icon: "loading"
  });
  
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onDismissSnackBar = () => setVisible(false);

  console.log('====================================');
  console.log("city", city);
  console.log('====================================');

  useEffect(() => {
    if (city && city.length > 1) {
      getWeather();
    } else {
      console.log('City is invalid, navigating back to Home');
      navigation.navigate("Home");
    }
  }, [city]);

  const getWeather = async () => {
    const options = {
      method: 'GET',
      url: 'https://weather-api138.p.rapidapi.com/weather',
      params: {
        city_name: city
      },
      headers: {
        'x-rapidapi-key': '960771d6a8msh9703660de643705p15b5dejsn574c4d84d0cd',
        'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const results = response.data;
      console.log('====================================');
      console.log("results", results);
      console.log('====================================');
      setInfo({
        name: results.name,
        temp: results.main.temp,
        humidity: results.main.humidity,
        desc: results.weather[0].description,
        icon: results.weather[0].icon,
      });
    } catch (error) {
      console.log("hi",error);
      
      console.error('Error fetching weather data:', error);
      setErrorMessage('Failed to fetch weather data. Please try again.');
      setVisible(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ alignItems: "center" }}>
        <Title
          style={{
            color: '#00aaff',
            marginTop: 30,
            fontSize: 30
          }}>
          {info.name}
        </Title>
        <Image
          style={{
            width: 120,
            height: 120
          }}
          source={WeatherIcon}
        />
        <Image 
          style={{
            width: 120,
            height: 120
          }}
          source={{ uri: "https://openweathermap.org/img/w/" + info.icon + ".png" }}
        />
      </View>

      <Card style={{
        margin: 5,
        padding: 12
      }}>
        <Title style={{ color: "#00aaff" }}>Temperature - {info.temp}'F</Title>
      </Card>
      <Card style={{
        margin: 5,
        padding: 12
      }}>
        <Title style={{ color: "#00aaff" }}>Humidity - {info.humidity}</Title>
      </Card>
      <Card style={{
        margin: 5,
        padding: 12
      }}>
        <Title style={{ color: "#00aaff" }}>Description- {info.desc}</Title>
      </Card>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something if needed
          },
        }}>
        {errorMessage}
      </Snackbar>
    </View>
  );
};

export default WeatherResult;
