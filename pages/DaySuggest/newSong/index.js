

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Tabs } from '@ant-design/react-native'
import NewItem from './newItem'
class NewSong extends React.Component {
    render() {

        const tabs = [
            { title: '最新', type: 5 },
            { title: '内地', type: 1 },
            { title: '港台', type: 6 },
            { title: '欧美', type: 2 },
            { title: '韩国', type: 4 },
            { title: '日本', type: 3 }
        ];

        return (
            <View style={{ flex: 1 }}>
                <Text style={ {textAlign:'center',padding:10,fontSize:16} }>
                    新歌首发
                </Text>
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
                            <View key={item.type}>
                                <NewItem type={item.type} />
                            </View>
                        ))
                    }
                </Tabs>
            </View>
        )
    }
}

export default NewSong