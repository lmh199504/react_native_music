
import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native'
import { Modal,Toast } from '@ant-design/react-native'
import styles from './styles'
import DeviceInfo from 'react-native-device-info';
import * as Progress from 'react-native-progress'
import { playing, stopPlay } from '../../redux/actions'
const { width } = Dimensions.get('window')

const device = {};
// console.log(DeviceInfo)
// device.DeviceID = DeviceInfo.getUniqueID();
device.UserAgent = DeviceInfo.getUserAgent();
device.DeviceBrand = DeviceInfo.getBrand();
device.DeviceModel = DeviceInfo.getModel();
device.SystemVersion = DeviceInfo.getSystemVersion();
device.AppVersion = DeviceInfo.getVersion();
device.AppReadableVersion = DeviceInfo.getReadableVersion();
console.log(device)

class BottomPlayer extends React.Component {

    state = {
        visible: false
    }
    onPress = () => {
        this.props.navigation.navigate("Play")
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    }
    togglePlay = () => {
        const { currentSong, isPlay } = this.props
        if (currentSong.songmid) {
            if (isPlay) { //播放中
                this.props.stopPlay()
                console.log("____________暂停")
            } else {  //暂停播放
                console.log("____________播放")
                this.props.playing()
            }
        } else {
            Toast.info("暂无播放歌曲")
        }
    }
    render() {

        const { currentSong, playList, isPlay,musictime } = this.props
        return (
            <View style={styles.container}>
                <Progress.Bar style={{ marginLeft: 5 }} progress={ musictime.currentTime && musictime.duration ? musictime.currentTime / musictime.duration : 0 } width={width - 10} height={1} borderColor="transparent" color="#fe4c3d" unfilledColor="gray" />
                <View style={styles.container_box}>
                    <View style={styles.left}>
                        <View style={styles.coverView}>
                            <Image source={{ uri: currentSong.cover }} style={styles.cover} />
                        </View>
                        <View>
                            <Text style={styles.title}>{currentSong.title}</Text>
                            <Text style={styles.singer}>{currentSong.singer ? currentSong.singer[0].name : ''}</Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <TouchableHighlight onPress={() => this.togglePlay()} underlayColor="transparent">
                            <Image source={isPlay ? require('./images/zanting.png') : require('./images/bofang.png')} style={styles.playImg} />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.setState({ visible: true })}>
                            <Image source={require('./images/menu.png')} style={styles.menu_img} />
                        </TouchableHighlight>
                    </View>
                </View>

                <Modal
                    title="播放列表"
                    transparent
                    onClose={this.onClose}
                    maskClosable
                    visible={this.state.visible}
                >
                    <ScrollView style={{ paddingVertical: 20, height: 350 }}>
                        {
                            playList.map((item, index) => (
                                <View key={index}>
                                    <Text>{item.title}</Text>
                                    <Text>{item.singer[0].name}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </Modal>
            </View>

        )
    }
}

export default connect(
    state => ({
        currentSong: state.currentSong,
        playList: state.playList,
        isPlay: state.isPlay,
        musictime:state.musictime
    }),
    { playing, stopPlay }
)(BottomPlayer)