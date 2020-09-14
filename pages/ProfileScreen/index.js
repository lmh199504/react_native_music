import React from 'react';
import { View ,Image,StatusBar } from 'react-native';

export default class BasicTabsExample extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar> */}
                <Image style={{ width:"100%",height:"100%" }} source={ require('./images/bg.jpg') }/>
            </View>
        );
    }
}
