import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

type HomeScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/Image.png')} 
        style={styles.illustration}
        resizeMode="contain" 
      />
      <Text style={styles.title}>Welcome Home!</Text>  
      <Text style={styles.subtitle}>Manage your day with ease.</Text> 

    <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.navigate('Tasks')}
    >
      <Text style={styles.buttonText}>Get started</Text> 
    </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            padding: 20,
            justifyContent: 'center',
        },
        illustration: {
            width: 300,
            height: 300,
            marginBottom: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333333',
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 16,
            color: '#666666',
            marginBottom: 30,
        },
        button: {
            backgroundColor: '#FF0000',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            alignItems: 'center',
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'bold',
        },
});

export default HomeScreen;