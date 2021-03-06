
import React from 'react'
import Animated from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity,Image,StatusBar,ToastAndroid,BackHandler  } from 'react-native';
import FindScreen from '../FindScreen'
import ProfileScreen from '../ProfileScreen'
import MineScreen from '../MineScreen'
import VideoScreen from '../VideoScreen'
import BottomPlayer from '../../components/bottomPlayer'

const Tab = createMaterialTopTabNavigator();

class MyTabBar extends React.Component {



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
        const { state, descriptors, navigation, position } = this.props
        const StatusBarColor = state.index !== 0 ? '#fff' : '#1b1e23'
        const backgroundColor = state.index === 0 ? "#1b1e23":'#fff' 
        const Color = state.index === 0 ? "#fff":"#000" 
        

        return (
            <View>
                <View style={{flexDirection: 'row',paddingLeft: 30, paddingRight: 30, paddingTop: 20,paddingBottom:15, justifyContent: 'space-between',overflow:"visible",backgroundColor}}>
                    <StatusBar barStyle="dark-content" backgroundColor={StatusBarColor} StatusBarAnimation="fade" />
                    {/* <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar> */}
                    <TouchableOpacity
                        accessibilityRole="button"
                        onPress={() => navigation.openDrawer()}>
                        <View>
                            <Image source={require('../../assets/images/caidan.png')} style={{ width: 15, height: 15, marginTop: 6 }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: "space-between", flex: 4 }}>
                        {state.routes.map((route, index) => {
                            const { options } = descriptors[route.key];
                            const label =
                                options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                        ? options.title
                                        : route.name;

                            const isFocused = state.index === index;
                            const key = index
                            const onPress = () => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate(route.name);
                                }
                            };

                            const onLongPress = () => {
                                navigation.emit({
                                    type: 'tabLongPress',
                                    target: route.key,
                                });
                            };
                            // modify inputRange for custom behavior
                            const inputRange = state.routes.map((_, i) => i);
                            const opacity = Animated.interpolate(position, {
                                inputRange,
                                outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
                            });

                            const fontSize = Animated.interpolate(position,{
                                inputRange,
                                outputRange: inputRange.map(i => (i === index ? 18 : 16)),
                            });
                            return (
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityStates={isFocused ? ['selected'] : []}
                                    key={key}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    onLongPress={onLongPress}
                                    style={{ flex: 1}}
                                >
                                    <Animated.Text style={{ opacity, textAlign: 'center', fontSize,color:Color,textAlignVertical:'center' }}>{label}</Animated.Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <TouchableOpacity
                        accessibilityRole="button"
                        onPress={() =>  navigation.navigate('Search')}
                    >
                        <View >
                            <Image source={require('../../assets/images/shousuo.png')} style={{ width: 15, height: 15, marginTop: 6 }} />
                        </View>
                    </TouchableOpacity >
                </View>
                <BottomPlayer navigation={navigation} />
            </View>
        );
    }

}

function TabNav() {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="MineScreen" component={MineScreen} options={{title:"我的"}}/>
            <Tab.Screen name="FindScreen" component={FindScreen} options={{ title:"发现" }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{title:"云村"}}/>
            <Tab.Screen name="Video" component={VideoScreen} options={{title:"视频"}}/>
        </Tab.Navigator>
    )
}

export default TabNav