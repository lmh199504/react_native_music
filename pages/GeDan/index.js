

import React from 'react'

import { ScrollView,View,Text } from 'react-native'
import { Tabs } from '@ant-design/react-native';
import GeDanItem from './geDanItem'

class GeDan extends React.Component{
    render() {


        const tabs = [
            { title: '为你推荐' },
            { title: '官方歌单' },
            { title: '情歌' },
            { title: '网络情歌' },
            { title: '经典' },
            { title: 'KTV热歌' },
        ];

        const suggestionNav = [
			{name:'为你推荐',id:66},
			{name:'官方歌单',id:3317},
			{name:'情歌',id:71},
			{name:'网络歌曲',id:3056},
			{name:'经典',id:59},
			{name:'KTV热歌',id:64}
		]

        const style = {
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: '#fff',
        };
        return(
            <View style={{ flex: 1 }}>
                <Tabs  tabs={tabs} swipeable={true} tabBarActiveTextColor="#f73c40" tabBarInactiveTextColor="#000" tabBarUnderlineStyle={{ backgroundColor:"#f73c40" }}>
                    <View style={style}>
                        <GeDanItem titleid={ -1 }/>
                    </View>
                    <View style={style}>
                        <GeDanItem titleid={ 3317 }/>
                    </View>
                    <View style={style}>
                        <GeDanItem titleid={ 71 }/>
                    </View>

                    <View style={style}>
                        <GeDanItem titleid={ 3056 }/>
                    </View>
                    <View style={style}>
                        <GeDanItem titleid={ 59 }/>
                    </View>
                    <View style={style}>
                        <GeDanItem titleid={ 64 }/>
                    </View>
                </Tabs>
            </View>
        )
    }
}

export default GeDan