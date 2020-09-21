

import React from 'react'
import { View, Text, TouchableOpacity,ToastAndroid,BackHandler } from 'react-native'
import { Tabs } from '@ant-design/react-native'
import VideoItem from './videoItem'
class Video extends React.Component {


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


        const tabs = [
			{"id": 15,"title": "全部",lan:"all"},
			{"id": 16,"title": "内地",lan:"neidi"},
			{"id": 17,"title": "港台",lan:"korea"},
			{"id": 18,"title": "欧美",lan:"gangtai"},
			{"id": 19,"title": "韩国",lan:"oumei"},
			{"id": 20,"title": "日本",lan:"janpan"}
		]

        return (
            <View style={{ flex: 1 ,marginBottom:50}}>
                <Tabs
                    tabs={tabs}
                    renderTabBar={tabProps => (
                        <View
                            style={{
                                paddingHorizontal: 16,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            {tabProps.tabs.map((tab, i) => (
                                // change the style to fit your needs
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    key={tab.key || i}
                                    style={{
                                        // width: '30%',
                                        padding: 6,
                                    }}
                                    onPress={() => {
                                        const { goToTab, onTabClick } = tabProps;
                                        // tslint:disable-next-line:no-unused-expression
                                        onTabClick && onTabClick(tabs[i], i);
                                        // tslint:disable-next-line:no-unused-expression
                                        goToTab && goToTab(i);
                                    }}
                                >
                                    <View style={{ backgroundColor: tabProps.activeTab === i ? "#f73c40" : "#fff", padding: 5, borderRadius: 5 }}>
                                        <Text
                                            style={{
                                                color: tabProps.activeTab === i ? '#fff' : '#000',
                                            }}
                                        >
                                            {tab.title}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                >
                    {
                        tabs.map(item => (
                            <View key={item.id}>
                                <VideoItem lan={item.lan}/>
                            </View>
                        ))
                    }
                </Tabs>
            </View>
        )
    }
}

export default Video