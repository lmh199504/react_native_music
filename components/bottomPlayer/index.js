
import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { Button, Modal } from '@ant-design/react-native'
import styles from './styles'
import * as Progress from 'react-native-progress'

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
    };
    render() {

        const { currentSong } = this.props
        const footerButtons = [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => console.log('ok') },
        ];
        return (
            <View style={styles.container}>
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
                        <View>
                            <Progress.Pie progress={0.4} size={40} borderColor="#848484"/>
                        </View>
                        <TouchableHighlight onPress={() => this.setState({ visible: true })}>
                            <Image source={require('./images/menu.png')} style={styles.menu_img} />
                        </TouchableHighlight>
                    </View>
                </View>

                <Modal
                    title="Title"
                    transparent
                    onClose={this.onClose}
                    maskClosable
                    visible={this.state.visible}
                    closable
                    footer={footerButtons}
                >
                    <View style={{ paddingVertical: 20 }}>
                        <Text style={{ textAlign: 'center' }}>Content...</Text>
                        <Text style={{ textAlign: 'center' }}>Content...</Text>
                    </View>
                    <Button type="primary" onPress={this.onClose}>
                        close modal
                    </Button>
                </Modal>
            </View>

        )
    }
}

export default connect(
    state => ({
        currentSong: state.currentSong,
        playList: state.playList
    }),
    {}
)(BottomPlayer)