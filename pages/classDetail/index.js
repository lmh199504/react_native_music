

import React from 'react'
import { View, StatusBar, ScrollView, ImageBackground, Image, TouchableHighlight, Text } from 'react-native'
import { reqGetSongListDetail } from '../../api'
import { ActivityIndicator } from '@ant-design/react-native'
import { BlurView } from '@react-native-community/blur'
import MyImg from '../../components/Image'
import styles from './styles'
class ClassDetail extends React.Component {

    state = {
        islove: false,
        list: [],
        desc: '',
        tags: [],
        logo: '',
        headurl: '',
        visitnum: 0,
        dissname: '',
        loading: false,
        nickname: '',
        disstid: ''
    }

    componentDidMount = () => {
        const { disstid } = this.props.route.params
        console.log(disstid)
        this.setState({
            loading: true,
            disstid
        })
        reqGetSongListDetail({
            disstid: disstid
        }).then(res => {
            const list = res.response.cdlist[0].songlist
            const desc = res.response.cdlist[0].desc
            const tags = res.response.cdlist[0].tags
            const { logo, headurl, visitnum, dissname, nickname } = res.response.cdlist[0]
            list.forEach((item, index) => {
                item.key = index
            })
            this.setState({
                list: list,
                desc,
                tags,
                logo,
                headurl, visitnum,
                dissname,
                loading: false,
                nickname
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const { list, logo, visitnum, desc, dissname, tags, loading, nickname, disstid, headurl } = this.state

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar>

                <View style={styles.topMsg}>
                    <View style={styles.topBg}>
                        <MyImg uri={logo} style={styles.ImageBackground} />
                    </View>

                    <BlurView
                        blurType="light"
                        blurAmount={60}
                        reducedTransparencyFallbackColor="#fff"
                        style={styles.absolute}
                    />

                    <View style={ styles.topInfo }>
                        <View>
                            <MyImg uri={logo} style={ styles.logo }/>
                        </View>
                        <View>
                            <Text>
                                {dissname}
                            </Text>
                            <View>
                                <MyImg uri={ headurl } />
                                <Text>{ nickname }</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={styles.topTitle}>
                    <View>
                        <TouchableHighlight underlayColor="transparent" onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../../assets/images/goback_white.png')} style={styles.goBack} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.muiscInfo}>
                        <Text style={styles.songname}>歌单</Text>
                    </View>
                </View>
                <ScrollView style={styles.ScrollView}>

                </ScrollView>

                <ActivityIndicator
                    animating={loading}
                    text="加载中...."
                    toast />
            </View>
        )
    }
}

export default ClassDetail