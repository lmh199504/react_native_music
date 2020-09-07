
import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableHighlight, ScrollView,Dimensions } from 'react-native'
import { Button, Modal } from '@ant-design/react-native'
import styles from './styles'
import * as Progress from 'react-native-progress'
import { playing, stopPlay } from '../../redux/actions'
const { width } = Dimensions.get('window')
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
        const { currentSong,isPlay }  = this.props
        if(currentSong.songmid){
            if(isPlay){ //播放中
                this.props.stopPlay()
            }else{  //暂停播放
                this.props.playing()
            }
        }else{

        }
    }
    render() {

        const { currentSong, playList,isPlay } = this.props
        const footerButtons = [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => console.log('ok') },
        ];
        return (
            <View style={styles.container}>
                <Progress.Bar style={{ marginLeft:5 }} progress={0.3} width={width - 10 } height={1} borderColor="transparent" color="#fe4c3d" unfilledColor="gray"/>
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
                        <TouchableHighlight onPress={ () => this.togglePlay() }>
                            <Image source={ isPlay ? require('./images/zanting.png'):require('./images/bofang.png') } style={ styles.playImg}/>
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
                    // closable
                    // footer={footerButtons}
                >
                    <ScrollView style={{ paddingVertical: 20,height:350 }}>
                        {
                            playList.map((item,index) => (
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
        isPlay: state.isPlay
    }),
    { playing, stopPlay }
)(BottomPlayer)