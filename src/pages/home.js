import React from 'react';
import { ScrollView } from 'react-native';
import ProductItem from '../components/product-item';

const Home = ({navigation}) => {
    const products = [
        { title: 'しろくま'},
        { title:  'ぺんぎん？'},
        { title: 'とんかつ'},
        { title: 'ねこ'},
        { title: 'とかげ'},
        { title: 'ふろしき'},
        { title: 'えびふらいのしっぽ'}
    ];

    return (
        <ScrollView>
            {products.map((p, i) => <ProductItem key={i} id={i} title={p.title} navigation={navigation}/>)}
        </ScrollView>
    );
}



export default Home;
