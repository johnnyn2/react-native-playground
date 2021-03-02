import React, {useEffect} from 'react';
import { ScrollView } from 'react-native';
import ProductItem from '../components/product-item';
import { connect } from 'react-redux';
import { setAllProducts } from '../redux/productActions';

const Home = ({navigation, setAllProducts, products}) => {
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setAllProducts(data))
        .catch(e => console.log(e))
    }, [])

    return (
        <ScrollView>
            {products.map((p, i) => <ProductItem key={i} id={i} title={p.title} navigation={navigation}/>)}
        </ScrollView>
    );
}

const mapStateToProps = state => {
    return {
        products: state.products.data || [],
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setAllProducts: products => dispatch(setAllProducts(products))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
