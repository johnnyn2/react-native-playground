import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { connect } from 'react-redux';
import { IconButton, Colors } from 'react-native-paper';
import { setActiveProductId } from '../redux/product/productActions';


const ProductItem = ({title, id, navigation, setActiveProductId}) => {
    const handleViewProduct = () => {
        setActiveProductId(id);
        navigation.navigate('ViewProduct', {id,});
    }

    const { productItem, productTitle, editIconContainer } = styles;

    return (
        <View style={productItem}>
            <Text style={productTitle}>{title}</Text>
            <Ionicons name='ios-information-circle' size={30} color='grey' onPress={() => handleViewProduct()}/>
            <IconButton style={editIconContainer} color="white" icon="pencil" size={16} onPress={() => navigation.navigate('EditProduct')} />
        </View>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setActiveProductId: id => dispatch(setActiveProductId(id))
})

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

export default connect(null, mapDispatchToProps)(ProductItem);