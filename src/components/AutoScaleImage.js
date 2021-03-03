import React, {useState} from 'react';
import { Image, Dimensions, ActivityIndicator, View} from 'react-native';

const initState = {
    imageWidth: null,
    imageHeight: null,
}

const AutoScaleImage = ({uri}) => {
    const [state, setState] = useState(initState);

    const {imageWidth, imageHeight} = state;

    return (
        <Image
            style={{ height: imageHeight, width: imageWidth, flex: 1, marginLeft: Dimensions.get('window').width / 4 }}
            onError={() => console.log('fail to load image')}
            source={{uri,}}
            onLayout={(e) => {
                Image.getSize(uri, (width, height) => {
                    const imageWidth = Dimensions.get('window').width / 2;
                    const ratio = imageWidth / width;
                    setState(prevState => ({
                        ...prevState,
                        imageWidth,
                        imageHeight: height * ratio,
                    }))
                })
            }}
            loadingIndicatorSource={require('../../assets/adaptive-icon.png')}
        />
    );
}

export default AutoScaleImage;