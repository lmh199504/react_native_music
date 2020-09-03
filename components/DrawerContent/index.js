
import React from 'react'
import { View, StyleSheet, Image, Button, Text, TouchableOpacity, BVLinearGradient } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import LinearGradient from 'react-native-linear-gradient'
import styles from './style'
class DrawerContent extends React.Component {
    pressFun() {
        this.props.navigation.navigate('Search')
    }
    render() {
        const { state, descriptors, navigation, position } = this.props
        return (
            <View style={styles.main}>
                <DrawerContentScrollView style={{marginBottom:30}}>
                    <LinearGradient colors={['#7b7b7b', '#5d5d5d']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.topCon}>
                        <View>
                            <View style={styles.flexBet}>
                                <View>
                                    <View><Text style={styles.blackJiao}>开通黑胶VIP</Text></View>
                                    <View><Text style={styles.sub_title}>加入黑胶vip，立享超17项专属特权</Text></View>
                                </View>
                                <View>
                                    <TouchableOpacity>
                                        <LinearGradient colors={['#e2d1d4', '#d6baae']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.memberCenter}>
                                            <View><Text style={styles.memberCenterText}>会员中心</Text></View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ ...styles.marginTop20, ...styles.flexBet }}>
                                <View>
                                    <View><Text style={styles.first_mon}>首月仅5元</Text></View>
                                    <View><Text style={styles.sub_title}>畅听本周最热单曲</Text></View>
                                </View>
                                <View>
                                    <Image
                                        style={styles.TopImg}
                                        source={require('../../assets/images/timg.jpg')}
                                    />
                                </View>
                            </View>
                        </View>
                    </LinearGradient>

                    <View style={styles.centerCon}>
                        <View style={styles.flexBet}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image style={styles.TopImg} source={require('../../assets/images/timg.jpg')} />
                                <Text style={styles.userName}>兴风作浪啊</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.qiandao}><Text style={styles.qiandaoText}>签到</Text></View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ ...styles.flexBet, ...styles.marginTop10, marginBottom: 15 }}>
                            <View style={{width: '25%' }}>
                                <View style={styles.foruItem}>
                                    <Image style={styles.iconImg} source={require('../../assets/images/message.png')} />
                                </View>
                                <Text style={styles.foruItemtext}>我的消息</Text>
                            </View>
                            <View style={{ width: '25%' }}>
                                <View style={styles.foruItem}>
                                    <Image style={styles.iconImg} source={require('../../assets/images/message.png')} />
                                </View>
                                <Text style={styles.foruItemtext}>我的消息</Text>
                            </View>
                            <View style={{ textAlign: 'center', width: '25%' }}>
                                <View style={styles.foruItem}>
                                    <Image style={styles.iconImg} source={require('../../assets/images/message.png')} />
                                </View>
                                <Text style={styles.foruItemtext}>我的消息</Text>
                            </View>
                            <View style={{ textAlign: 'center', width: '25%' }}>
                                <View style={styles.foruItem}>
                                    <Image style={styles.iconImg} source={require('../../assets/images/message.png')} />
                                </View>
                                <Text style={styles.foruItemtext}>我的消息</Text>
                            </View>
                        </View>

                        <View style={styles.listCon}>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/yuan.png')} />
                                <Text style={styles.itemText}>创作者中心</Text>
                            </View>
                        </View>

                        <View style={styles.listCon}>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/huatong.png')} />
                                <Text style={styles.itemText}>听歌识曲</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/menpiao.png')} />
                                <Text style={styles.itemText}>演出</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/gouwuche.png')} />
                                <Text style={styles.itemText}>商城</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/dingwei.png')} />
                                <Text style={styles.itemText}>附近的人</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/lingsheng.png')} />
                                <Text style={styles.itemText}>口袋彩铃</Text>
                            </View>
                        </View>

                        <View style={styles.listCon}>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/dingdan.png')} />
                                <Text style={styles.itemText}>我的订单</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/dingshi.png')} />
                                <Text style={styles.itemText}>定时停止播放</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/saoyisao.png')} />
                                <Text style={styles.itemText}>扫一扫</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/naozhong.png')} />
                                <Text style={styles.itemText}>音乐闹钟</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/yunpan.png')} />
                                <Text style={styles.itemText}>音乐云盘</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/liuliang.png')} />
                                <Text style={styles.itemText}>在线听歌免流量</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/youhuiquan.png')} />
                                <Text style={styles.itemText}>优惠券</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Image style={styles.itemIcon} source={require('../../assets/images/anquan.png')} />
                                <Text style={styles.itemText}>青少年模式</Text>
                            </View>
        
                        </View>

                    </View>
                </DrawerContentScrollView>
                <View style={styles.fixedBottom}>
                    <View style={ styles.flexBottomItem}>
                        <Image style={styles.itemIcon} source={require('../../assets/images/yejian.png')} />
                        <Text style={styles.itemText}>夜间模式</Text>
                    </View>
                    <View style={ styles.flexBottomItem}>
                        <Image style={styles.itemIcon} source={require('../../assets/images/setting.png')} />
                        <Text style={styles.itemText}>设置</Text>
                    </View>
                    <View style={ styles.flexBottomItem}>
                        <Image style={styles.itemIcon} source={require('../../assets/images/tuichu.png')} />
                        <Text style={styles.itemText}>退出</Text>
                    </View>
                </View>
            </View>
        )
    }
}



export default DrawerContent