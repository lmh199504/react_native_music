import React from 'react'
import { BackHandler, ToastAndroid } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNav from '../HomeTabNav'
import NotificationsScreen from '../NotificationsScreen'
import DrawerContent from '../../components/DrawerContent'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { getUserInfo } from '../../redux/actions'
import RNExitApp from 'react-native-exit-app';
const Drawer = createDrawerNavigator();

class DrawerNav extends React.Component {

    componentDidMount = async () => {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
        const userId = await AsyncStorage.getItem('userId')
        if (!!userId) {
            this.props.getUserInfo()
        } else {

            this.props.navigation.navigate("Login")
        }
    }

    componentWillUnmount() {
        this.backHandler && this.backHandler.remove();
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
            <Drawer.Navigator initialRouteName="TabNav" drawerContent={props => <DrawerContent {...props} />} drawerStyle={{ width: 310 }}>
                <Drawer.Screen name="TabNav" component={TabNav} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            </Drawer.Navigator>
        )
    }
}





export default connect(
    state => ({
        user: state.user
    }),
    { getUserInfo }
)(DrawerNav)