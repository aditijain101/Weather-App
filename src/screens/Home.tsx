import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Img from '../assets/weather.jpg';
import SearchBar from '../components/search/Search';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Adjust the import according to your project structure

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={Img} style={styles.backgroundImage}> */}
        <SafeAreaView style={styles.safeArea}>
          <SearchBar navigation={navigation} />
          <View style={styles.provider}>
            {/* Other components can go here */}
          </View>
        </SafeAreaView>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the whole background
  },
  safeArea: {
    flex: 1,
  },
  provider: {
    padding: 16,
  },
});

export default Home;
