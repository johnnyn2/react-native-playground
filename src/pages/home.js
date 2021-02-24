import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = () => {
    return (
        <View style={{ flex: 1, top: 16}}>
            <View style={{width: 'calc(100% - 32px)', alignItems: 'center', flexDirection: 'row', left: 16, backgroundColor: 'white', borderRadius: '1rem', height: 50}}>
                <Text style={{flex: 1, paddingLeft: '0.5rem', fontSize: '1rem'}}>Product Title</Text>
                <Ionicons name='ios-information-circle' size={30} color='grey' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default Home;
