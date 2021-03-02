import React, {useCallback} from 'react';
import { ScrollView, Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProductItem from '../components/ProductItem';
import { connect } from 'react-redux';
import { fetchAllProducts, clearProducts } from '../redux/product/productActions';

const Home = ({navigation, fetchAllProducts, clearProducts, data, loading, error}) => {
    /** same as the componentDidMount, componentWillUnmount in React. 
     Since the stack is not actually mounted / unmounted in react-navigation stack/tabs */
    useFocusEffect(
        useCallback(() => {
            fetchAllProducts();
            return () => clearProducts();
        }, [])
    )

    return (
        loading?
            <View style={styles.container}>
                <ActivityIndicator size='large'/>
            </View>
        :
            error.message ?
                <Text>Error in fetching products</Text>
            :
                <ScrollView>
                    {data.map((p, i) => <ProductItem key={i} id={i} title={p.title} navigation={navigation}/>)}
                </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})

const mapStateToProps = state => state.products;

const mapDispatchToProps = dispatch => ({
    fetchAllProducts: () => dispatch(fetchAllProducts(dispatch)),
    clearProducts: () => dispatch(clearProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
