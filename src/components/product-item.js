import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton, Colors } from 'react-native-paper';


const ProductItem = ({title, id, navigation}) => {
    const { productItem, productTitle, editIconContainer } = styles;

    return (
        <View style={productItem}>
            <Text style={productTitle}>{title}</Text>
            <Ionicons name='ios-information-circle' size={30} color='grey' onPress={() => navigation.navigate('ViewProduct')}/>
            <IconButton style={editIconContainer} color="white" icon="pencil" size={16} onPress={() => navigation.navigate('EditProduct')} />
        </View>
    );
}

const styles = StyleSheet.create({
    productItem: {
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 16,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 16,
        paddingTop: 5,
        paddingBottom: 5,
    },
    productTitle: {
        flex: 1,
        paddingLeft: 8,
        fontSize: 16
    },
    editIconContainer: {
        backgroundColor: '#808080',
        borderRadius: 25,
        marginRight: 8,
        marginLeft: 8,
        color: 'white',
    }
})

export default ProductItem;