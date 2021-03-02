import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-bottom-tabs-no-warnings';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from '../pages/Home';
import CreateProduct from '../pages/CreateProduct';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

const MenuBar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list-outline' : 'ios-list';
                    } else if (route.name === 'Create') {
                        return  (<FontAwesome5
                            size={20}
                            name={'plus-circle'}
                            color={color}
                        />);
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Create" component={CreateProduct} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}


export default MenuBar;