import React, {useEffect} from 'react';
import { ScrollView, Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import ProductItem from '../components/product-item';
import { connect } from 'react-redux';
import { fetchAllProducts } from '../redux/productActions';

const Home = ({navigation, fetchAllProducts, data, loading, error}) => {
    useEffect(() => fetchAllProducts(), [])

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
    fetchAllProducts: () => dispatch(fetchAllProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
