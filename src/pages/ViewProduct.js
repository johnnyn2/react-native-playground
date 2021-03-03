import React, {useState, useCallback} from 'react';
import {ScrollView, Text, StyleSheet, Image, ActivityIndicator, View, Dimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AppText from '../components/AppText';
import AutoScaleImage from '../components/AutoScaleImage';

const initState = {
    isLoading: true,
    product: {
        id: null,
        title: null,
        price: null,
        description: null,
        category: null,
        image: null,
    },
    imageWidth: null,
    imageHeight: null,
    error: null
};

const ViewProduct = ({route}) => {
    const [state, setState] = useState(initState);
    useFocusEffect(
        useCallback(() => {
            axios.get(`https://fakestoreapi.com/products/${route.params.id}`)
                .then(res => setState(prevState => ({ ...prevState, isLoading: false, product: res.data })))
                .then(error => setState(prevState => ({...prevState, isLoading: false, error,})))
            return () => setState(initState);
        }, [])
    )

    const { isLoading, product, error } = state;

    const { id, title, price, description, category, image} = product;

    const {scrollContainer, container, row, item, heading, header, info}  = styles;

    return (
        isLoading ?
        (
            <View style={container}><ActivityIndicator size='large'/></View>
        ) :
            typeof error !== 'undefined' && error !== null && error.message ?
                <Text>Fail to load product information</Text>
            :
            <ScrollView style={scrollContainer}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <AutoScaleImage uri={image}/>
                </View>
                <View style={info}>
                    <AppText style={header} text='Detailed Information'/>
                    <View style={row}>
                        <AppText style={heading} text='Id'/><AppText style={item} text={id}/>
                    </View>
                    <View style={row}>
                        <AppText style={heading} text='Name'/><AppText style={item} text={title}/>
                    </View>
                    <View style={row}>
                        <AppText style={heading} text='Price'/><AppText style={item} text={price}/>
                    </View>
                    <View style={row}>
                        <AppText style={heading} text='Description'/><AppText style={item} text={description}/>
                    </View>
                    <View style={row}>
                        <AppText style={heading} text='Category'/><AppText style={item} text={category}/>
                    </View>
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        height: Dimensions.get('window').height - 64,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    item: {
        width: (Dimensions.get('window').width - 40) / 2
    },
    heading: {
        fontWeight: 'bold',
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15
    }
})

export default ViewProduct;