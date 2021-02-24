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
        width: 'calc(100% - 32px)',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        left: 16,
        backgroundColor: 'white',
        borderRadius: '1rem',
        height: 50
    },
    productTitle: {
        flex: 1,
        paddingLeft: '0.5rem',
        fontSize: '1rem'
    },
    editIconContainer: {
        backgroundColor: '#808080',
        borderRadius: '100%',
        marginRight: '0.5rem',
        marginLeft: '0.5rem',
        color: 'white',
    }
})

export default ProductItem;