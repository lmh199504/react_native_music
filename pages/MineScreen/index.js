import React from 'react'

import { View, Text, ScrollView, Image, TouchableHighlight, BackHandler, ToastAndroid } from "react-native"
import { connect } from 'react-redux'
import styles from './styles'
import { setLoveLists, setUserSheets, resetPlaylist, setCurrentSongs, setIndex } from '../../redux/actions'
import { formatMoment } from '../../utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import RNExitApp from 'react-native-exit-app';
import { Toast } from '@ant-design/react-native'

class Mine extends React.Component {
    state = {
        photos:''
    }
    onPressAdd = () => {
        const { loveList } = this.props
        loveList.forEach((item, index) => {
            if (index === 0) {
                this.props.setIndex(index)
                this.props.setCurrentSongs(item)
            }
        })

        this.props.resetPlaylist(loveList)
    }

    componentDidMount = () => {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
    }
    componentDidUpdate = () => {

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
        const { user, userSheet } = this.props
        return (
            <ScrollView style={styles.ScrollView}>
                <View style={styles.topCon}>
                    <View style={styles.flexBet}>
                        <View style={styles.userInfo}>
                            <Image style={styles.userHeader} source={{ uri: user.headerImg }} />
                            <View>
                                <Text style={styles.userName}>{user.username}</Text>
                                <Text style={styles.userLevel}>Lv.9</Text>
                            </View>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.buyVip}>开通黑胶VIP</Text>
                            <Image style={styles.rightImg} source={require('./images/right.png')} />
                        </View>
                    </View>


                    <View style={{ ...styles.flexBet, marginTop: 30 }}>

                        <View style={{ width: '20%' }}>
                            <View style={styles.foruItem}>
                                <Image style={styles.iconImg} source={require('./images/local.png')} />
                            </View>
                            <Text style={styles.foruItemtext}>本地音乐</Text>
                        </View>



                        <View style={{ width: '20%' }}>
                            <View style={styles.foruItem}>
                                <Image style={styles.iconImg} source={require('./images/down.png')} />
                            </View>
                            <Text style={styles.foruItemtext}>下载管理</Text>
                        </View>

                        <View style={{ width: '20%' }}>
                            <View style={styles.foruItem}>
                                <Image style={styles.iconImg} source={require('./images/diantai.png')} />
                            </View>
                            <Text style={styles.foruItemtext}>我的电台</Text>
                        </View>

                        <View style={{ width: '20%' }}>
                            <View style={styles.foruItem}>
                                <Image style={styles.iconImg} source={require('./images/shoucan.png')} />
                            </View>
                            <Text style={styles.foruItemtext}>我的收藏</Text>
                        </View>

                        <View style={{ width: '20%' }}>
                            <View style={styles.foruItem}>
                                <Image style={styles.iconImg} source={require('./images/guanzhu.png')} />
                            </View>
                            <Text style={styles.foruItemtext}>关注新歌</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.mainCon}>
                    <View style={styles.main_title}>
                        <Text style={styles.main_title_text}>我的音乐</Text>
                        <View style={styles.more_con}>
                            <Text style={styles.more}>更多</Text>
                            <Image style={styles.more_img} source={require('./images/right.png')} />
                        </View>
                    </View>
                    <View style={{ width: '100%', overflow: 'hidden', marginBottom: 10 }}>
                        <ScrollView horizontal={true} >

                            <TouchableHighlight style={styles.mymusic_item} onPress={() => this.onPressAdd()}>
                                <View>
                                    <Image source={require('./images/bg.jpg')} style={styles.music_Item_bg} />
                                    <Image source={require('./images/xin.png')} style={styles.center_img} />
                                    <Text style={styles.music_Item_Text}>我喜欢的音乐</Text>
                                </View>
                            </TouchableHighlight>
                            {/* <View style={styles.mymusic_item}>
                                <Image source={require('./images/bg.jpg')} style={styles.music_Item_bg} />
                                <Image source={require('./images/xin.png')} style={styles.center_img} />
                                <Text style={styles.music_Item_Text}>我喜欢的音乐</Text>
                            </View>
                            <View style={styles.mymusic_item}>
                                <Image source={require('./images/bg.jpg')} style={styles.music_Item_bg} />
                                <Image source={require('./images/xin.png')} style={styles.center_img} />
                                <Text style={styles.music_Item_Text}>我喜欢的音乐</Text>
                            </View>
                            <View style={styles.mymusic_item}>
                                <Image source={require('./images/bg.jpg')} style={styles.music_Item_bg} />
                                <Image source={require('./images/xin.png')} style={styles.center_img} />
                                <Text style={styles.music_Item_Text}>我喜欢的音乐</Text>
                            </View> */}
                        </ScrollView>
                    </View>

                    <View style={styles.main_title}>
                        <Text style={styles.main_title_text}>我的歌单</Text>
                        <View style={styles.more_con}>
                            <Text style={styles.more}>更多</Text>
                            <Image style={styles.more_img} source={require('./images/right.png')} />
                        </View>
                    </View>
                    <View style={styles.geDan}>

                        {
                            userSheet.map((item, index) => (

                                <View style={styles.geDan_Item} key={index}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UserSheetDetail', {
                                        sheetId: item.sheetId
                                    })}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <View style={styles.geDan_Item_bg_box}>
                                                    <Image style={styles.geDan_Item_bg} source={{ uri: item.sheetCover }} />
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={styles.geDan_Item_title}>{item.name}</Text>
                                                <Text style={styles.geDan_Item_subTitle}>{formatMoment(item.createTime)}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }

                        <View style={{flexDirection:'row'}}>
                            <TouchableHighlight underlayColor="#fff" onPress={ () => Toast.info("不许新建.") }>
                                <View style={{ height: 50, backgroundColor: "#f3f3f3", borderRadius: 5, width: 50, marginRight: 10, overflow: 'hidden' }} >
                                    <Image style={{ width: 40, height: 40, marginLeft: 5, marginTop: 5 }} source={require('./images/add.png')} />
                                </View>
                            </TouchableHighlight>
                            <View>
                                <Text style={{ ...styles.geDan_Item_title, color: "#000", lineHeight: 40 }}>创建歌单</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        )
    }
}


export default connect(
    state => ({
        user: state.user,
        loveList: state.loveList,
        userSheet: state.userSheet
    }),
    { setLoveLists, setUserSheets, resetPlaylist, setIndex, setCurrentSongs }
)(Mine)