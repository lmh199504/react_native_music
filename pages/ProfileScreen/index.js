import React from 'react';
import { View ,Image,StatusBar,ToastAndroid,BackHandler } from 'react-native';

export default class BasicTabsExample extends React.Component {

    componentDidMount = () => {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
        this.onBackButtonPressAndroid);
    }

    onBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                RNExitApp.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar> */}
                <Image style={{ width:"100%",height:"100%" }} source={ require('./images/bg.jpg') }/>
            </View>
        );
    }
}
