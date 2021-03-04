import React, {useCallback, useState} from 'react';
import {View, Text, Platform, ActivityIndicator, Dimensions, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton, Colors } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AppText from '../components/AppText';
import AutoScaleImage from '../components/AutoScaleImage';
import Constants from 'expo-constants';

const EMPTY_ERR = 'This field should not be empty';

const initState = {
    product: {
        title: '',
        price: '',
        description: '',
        category: '',
        image: null,
    },
    errorObj: {
        product: {
            title: true,
            price: true,
            description: true,
            category: true,
            image: true
        }
    },
    errorTxt: {
        product: {
            title: '',
            price: '',
            description: '',
            category: '',
            image: '',
        }
    },
    imageWidth: null,
    imageHeight: null,
    error: null,
    isSaved: false,
    isSaving: false,
    btnText: 'Add'
};

const CreateProduct = () => {
    const [state, setState] = useState(initState);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                if (Platform.OS !== 'web') {
                    const {status} = await ImagePicker.requestCameraPermissionsAsync();
                    if (status !== 'granted') {
                        alert('Sorry, we need camera roll permissions to make this work!');
                    }
                } 
            })()

            return () => setState(initState);
        }, [])
    )

    const handleChange = e => {
        const {id, value} = e.target;
        const {result, errMsg} = isValidInput(id, value);
        setState(prevState => {
            const newState = {
                ...prevState,
                errorObj: {
                    ...prevState.errorObj,
                    product: {
                        ...prevState.errorObj.product
                    }
                },
                errorTxt: {
                    ...prevState.errorTxt,
                    product: {
                        ...prevState.errorTxt.product,
                    }
                },
                product: {
                    ...prevState.product,
                }
            };
            newState.product[id] = value;
            newState.errorObj.product[id] = !result;
            newState.errorTxt.product[id] = errMsg;
            return newState; 
        })
    }

    const isValidInput = (id, value) => {
        const result = {};
        switch(id) {
            case 'price':
                if (isNaN(value)) {
                    result['errMsg'] = 'This field should be number';
                }
                result['result'] = !isNaN(value);
                break;
            default:
                result['result'] = true;
                result['errMsg'] = '';
        }
        if (value === '' || value === null) { result['errMsg'] = EMPTY_ERR }
        result['result'] = result['result'] && value !== '' && value !== null;
        return result;
    }

    const isValidForm = () => {
        const productErrObj = state.errorObj.product;
        const hasInvalidInput = Object.keys(productErrObj).filter(k => productErrObj[k]).length !== 0;

        const hasEmptyInput = Object.keys(state.product).filter(k => state.product[k] === '').length > 0;
        return !hasEmptyInput && !hasInvalidInput;
    }

    const postCreateProduct = (data) => {
        setState(prevState => ({...prevState, isSaving: false, isSaved: true}));
        setTimeout(() => setState(prevState => ({...prevState, isSaved: false, btnText: 'Add'})), 3000);
    }

    const createProduct = () => {
        if (isValidForm()) {
            setState(prevState => ({
                ...prevState,
                btnText: '',
                isSaving: true,
            }))
            fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                body: JSON.stringify(state.product),
            })
            .then(res => res.json())
            .then(data => postCreateProduct(data))
            .then(err => postCreateProduct(err))
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })

        if (!result.cancelled) {
            handleChange({
                target: {
                    id: 'image',
                    value: result.uri,
                }
            })
        }
    }

    const { product, error, isSaved, isSaving, btnText } = state;

    const { id, title, price, description, category, image} = product;

    const {scrollContainer, container, dropzone, row, item, heading, header, info}  = styles;

    const btnIcon = isSaving ? <ActivityIndicator color='white' /> : isSaved ? (
        <Icon name='check-circle' color='white' size={20}/>
    ) : null;

    const productErrObj = state.errorObj.product;
    const productErrTxt = state.errorTxt.product;

    return (
        <ScrollView style={scrollContainer}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {image ?
                    <View style={{ position: 'relative', flex: 1, justifyContent: 'center' }}>
                        <IconButton
                            style={{ position: 'absolute', right: 0, top: 0 }}
                            icon='close'
                            color='#8492A6'
                            size={16}
                            onPress={() => {
                                handleChange({
                                    target: {
                                        id: 'image',
                                        value: null,
                                    }
                                })
                            }}
                            disabled={isSaving}
                        />
                        <AutoScaleImage uri={image} />
                    </View>
                    :
                    <TouchableOpacity style={dropzone} onPress={pickImage}>
                        <Icon size={20} name='upload' style={{ marginRight: 5, color: '#8492A6' }} />
                        <AppText style={{ color: '#8492A6' }} text='Upload Product Photo' />
                    </TouchableOpacity>
                }
            </View>
            <View style={info}>
                <AppText style={header} text='Detailed Information' />
                <View style={row}>
                    <Input
                        value={title}
                        nativeID='title'
                        onChange={e => handleChange(e)}
                        label='Name'
                        inputStyle={{ outline: 'none' }}
                        disabled={isSaving}
                        autoFocus={true}
                        errorMessage={productErrTxt.title}
                        errorStyle={{margin: 0}}
                        renderErrorMessage={productErrObj.title}
                    />
                </View>
                <View style={row}>
                    <Input
                        value={price}
                        onChange={e => handleChange(e)}
                        leftIcon={{ type: 'font-awesome', name: 'dollar' }}
                        nativeID='price'
                        label='Price'
                        inputStyle={{ outline: 'none' }}
                        disabled={isSaving}
                        errorMessage={productErrTxt.price}
                        errorStyle={{margin: 0}}
                        renderErrorMessage={productErrObj.price}
                    />
                </View>
                <View style={row}>
                    <Input
                        value={description}
                        onChange={e => handleChange(e)}
                        leftIcon={{ type: 'font-awesome', name: 'info-circle' }}
                        nativeID='description'
                        label='Description'
                        inputStyle={{ outline: 'none' }}
                        disabled={isSaving}
                        errorMessage={productErrTxt.description}
                        errorStyle={{margin: 0}}
                        renderErrorMessage={productErrObj.description}
                    />
                </View>
                <View style={row}>
                    <Input
                        value={category}
                        onChange={e => handleChange(e)}
                        leftIcon={{ type: 'font-awesome', name: 'list' }}
                        nativeID='category'
                        label='Category'
                        inputStyle={{ outline: 'none' }}
                        disabled={isSaving}
                        errorMessage={productErrTxt.category}
                        errorStyle={{margin: 0}}
                        renderErrorMessage={productErrObj.category}
                    />
                </View>

            </View>
            <View style={[row, { justifyContent: 'center', alignItems: 'center', }]}>
                <Button
                    icon={btnIcon}
                    iconRight
                    title={btnText}
                    style={{ width: 100, height: 42, borderRadius: 20, overflow: 'hidden' }}
                    onPress={() => createProduct()}
                    disabled={!isValidForm()}
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
    dropzone: {
        width: Dimensions.get('window').width,
        height: 150,
        borderRadius: 5,
        borderStyle: 'dashed',
        borderColor: '#8492A6',
        backgroundColor: '#EFF2F7',
        alignItems: 'center',
        justifyContent: 'center'
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

export default CreateProduct;