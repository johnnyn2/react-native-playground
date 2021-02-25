import React, {useEffect, useState} from 'react';
import { ScrollView } from 'react-native';
import ProductItem from '../components/product-item';

const initState = {
    products: []
};

const Home = ({navigation}) => {
    const [state, setState] = useState(initState);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setState(prevState => ({...prevState, products: data})))
        .catch(e => console.log(e))
    }, [])

    const {products} = state;

    return (
        <ScrollView>
            {products.map((p, i) => <ProductItem key={i} id={i} title={p.title} navigation={navigation}/>)}
        </ScrollView>
    );
}



export default Home;
