import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const ViewProduct = () => {
    useFocusEffect(
        useCallback(() => {
            
        })
    )
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>View</Text>
        </View>
    );
}

const mapStateToProps = () => {
    
}

export default ViewProduct;