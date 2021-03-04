import React, {useState, useCallback} from 'react';
import {ScrollView, Text, StyleSheet, Image, ActivityIndicator, View, Dimensions} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    error: null,
    isSaved: false,
    isSaving: false,
    btnText: 'Save'
};

const EditProduct = ({route}) => {
    const [state, setState] = useState(initState);
    useFocusEffect(
        useCallback(() => {
            axios.get(`https://fakestoreapi.com/products/${route.params.id}`)
                .then(res => setState(prevState => ({ ...prevState, isLoading: false, product: res.data })))
                .then(error => setState(prevState => ({...prevState, isLoading: false, error,})))
            return () => setState(initState);
        }, [])
    )

    const handleChange = e => {
        const {id, value} = e.target;
        switch(id) {
            case 'price': if (isNaN(value)) return;
        }
        setState(prevState => ({
            ...prevState,
            product: {
                ...prevState.product,
                [id]: value,
            }
        }))
    }

    const postUpdateProduct = (data) => {
        setState(prevState => ({...prevState, isSaving: false, isSaved: true}));
        setTimeout(() => setState(prevState => ({...prevState, isSaved: false, btnText: 'SAVE'})), 3000);
    }

    const saveProduct = () => {
        setState(prevState => ({
            ...prevState,
            btnText: '',
            isSaving: true,
        }))
        fetch(`https://fakestoreapi.com/products/${route.params.id}`, {
            method: 'PUT',
            body: JSON.stringify(state.product),
        })
        .then(res => res.json())
        .then(data => postUpdateProduct(data))
        .catch(err => postUpdateProduct(err))
    }

    const { isLoading, product, error, isSaved, isSaving, btnText } = state;

    const { id, title, price, description, category, image} = product;

    const {scrollContainer, container, row, item, heading, header, info}  = styles;

    const btnIcon = isSaving ? <ActivityIndicator color='white' /> : isSaved ? (
        <Icon name='check-circle' color='white' size={20}/>
    ) : null;

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
                        <Input
                            value={title}
                            nativeID='title'
                            onChange={e => handleChange(e)}
                            label='Name'
                            inputStyle={{outline: 'none'}}
                            disabled={isSaving}
                            autoFocus={true}
                        />
                    </View>
                    <View style={row}>
                        <Input
                            value={price}
                            onChange={e => handleChange(e)}
                            leftIcon={{type: 'font-awesome', name: 'dollar'}}
                            nativeID='price'
                            label='Price'
                            inputStyle={{outline: 'none'}}
                            disabled={isSaving}
                        />
                    </View>
                    <View style={row}>
                        <Input
                            value={description}
                            onChange={e => handleChange(e)}
                            leftIcon={{type: 'font-awesome', name: 'info-circle'}}
                            nativeID='description'
                            label='Description'
                            inputStyle={{outline: 'none'}}
                            disabled={isSaving}
                        />
                    </View>
                    <View style={row}>
                        <Input
                            value={category}
                            onChange={e => handleChange(e)}
                            leftIcon={{type: 'font-awesome', name: 'list'}}
                            nativeID='category'
                            label='Category'
                            inputStyle={{outline: 'none'}}
                            disabled={isSaving}
                        />
                    </View>
                    
                </View>
                <View style={[row, {justifyContent: 'center', alignItems: 'center'}]}>
                    <Button
                        icon={
                            btnIcon
                        }
                        iconRight
                        title={btnText}
                        style={{width: 80, height: 42}}
                        onPress={() => saveProduct()}
                    />
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        height: Dimensions.get('window').height - 64,
        backgroundColor: '#fff',
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

export default EditProduct;