import React, {useState, useCallback} from 'react';
import {ScrollView, Text, StyleSheet, Image, ActivityIndicator, View, Dimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AppText from '../components/AppText';

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

    const { isLoading, product, error, imageWidth, imageHeight } = state;

    const { id, title, price, description, category, image} = product;

    const {container, row, item, heading, header}  = styles;

    return (
        isLoading ?
        (
            <View style={container}><ActivityIndicator size='large'/></View>
        ) :
            typeof error !== 'undefined' && error !== null && error.message ?
                <Text>Fail to load product information</Text>
            :
            <ScrollView>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Image
                        style={{height: imageHeight, width: imageWidth, flex: 1, marginLeft: Dimensions.get('window').width / 4}}
                        onError={() => console.log('fail to load image')}
                        source={{uri: image}}
                        onLayout={(e) => {
                            const containerWidth = e.nativeEvent.layout.width;
                            Image.getSize(image, (width, height) => {
                                const imageWidth  = Dimensions.get('window').width / 2;
                                const ratio  = imageWidth / width;
                                setState(prevState => ({
                                    ...prevState,
                                    imageWidth,
                                    imageHeight: height * ratio,
                                }))
                            })
                        }}
                    />
                </View>
                <View>
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
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row'
    },
    item: {
        flex: 1
    },
    heading: {
        fontWeight: 'bold',
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default ViewProduct;