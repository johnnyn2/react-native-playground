import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const AppBar = () => {
    const {container} = styles;

    return (
        <View style={container}>
            <Text>
                App Bar
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        top:0,
        left:0,
    }
})

export default AppBar;