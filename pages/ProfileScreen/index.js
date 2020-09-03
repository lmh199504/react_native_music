import React from 'react';
import { View ,Image } from 'react-native';

export default class BasicTabsExample extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image style={{ width:"100%",height:"100%" }} source={ require('./images/bg.jpg') }/>
            </View>
        );
    }
}
