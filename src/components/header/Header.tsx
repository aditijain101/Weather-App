import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { Appbar, Title } from 'react-native-paper';

interface HeaderProps {
 
}

const Header: React.FC<HeaderProps> = ({ }) => {

  return (
 
    <SafeAreaView>
    <Appbar.Header theme={{ colors: { primary: '#00aaff' },dark:true }} style={{backgroundColor:"black",justifyContent:"center"}}>
     <Title style={{color:"#00aaff"}}>Weather App</Title>
    </Appbar.Header>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textInput :{
    color :"blue",
    fontSize:18,
    borderColor:"black",
    borderWidth:4,
    margin:3,
    
  }
})



  

 


export default Header;
