import React from 'react';
import {Text, StyleSheet} from 'react-native';

const AppText = (props) => {
    const {defaultStyles, style, text} = props;
    return <Text style={[defaultStyles, style]}>{text}</Text>
}

AppText.defaultProps = {
    defaultStyles: {
        
    }
}

export default AppText;