import React, {useEffect} from 'react';
import { ScrollView, Text } from 'react-native';
import ProductItem from '../components/product-item';
import { connect } from 'react-redux';
import { fetchAllProducts } from '../redux/productActions';
import { setAllProducts } from '../redux/productActions';

const Home = ({navigation, fetchAllProducts, data, loading, error}) => {
    useEffect(() => {
        fetchAllProducts();
    }, [])

    return (
        <ScrollView>
            {loading?
                <Text>Loading...</Text> :
                error.message ?
                    <Text>Error in fetching products</Text>
                :
                    data.map((p, i) => <ProductItem key={i} id={i} title={p.title} navigation={navigation}/>)
            }
        </ScrollView>
    );
}

const mapStateToProps = state => state.products;

const mapDispatchToProps = dispatch => ({
    fetchAllProducts: () => dispatch(fetchAllProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
