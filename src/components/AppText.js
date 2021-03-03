import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ReadMore from 'react-native-read-more-text';

const AppText = (props) => {
    const { defaultStyles, style, text, readMore } = props;
    const textEle = (
        <Text style={[defaultStyles, style]}>
            {text}
        </Text>
    );

    const _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: Colors.tintColor, marginTop: 5 }} onPress={handlePress}>
                Read more
            </Text>
        );
    }

    const _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: Colors.tintColor, marginTop: 5 }} onPress={handlePress}>
                Show less
            </Text>
        );
    }

    return (
        readMore ?
            <View style={{flex: 1}}><ReadMore
                numberOfLines={3}
                renderTruncatedFooter={fn => _renderTruncatedFooter(fn)}
                renderRevealedFooter={fn => _renderRevealedFooter(fn)}
            >
                {textEle}
            </ReadMore></View> :
            textEle
    )
}

AppText.defaultProps = {
    defaultStyles: {

    }
}

export default AppText;