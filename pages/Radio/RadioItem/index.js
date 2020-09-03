

import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import styles from './styles'
import MyImg from '../../../components/Image'
import { formatNum } from '../../../utils'
import PropTypes from 'prop-types'
class RadioItem extends React.Component {
    static propTypes = {
        radioList: PropTypes.array.isRequired
    }


    render() {

        const { radioList } = this.props
        return (
            <ScrollView style={styles.ScrollView}>
                <View style={styles.container}>
                    {
                        radioList.map((item, index) => (
                            <View style={styles.Item} key={index}>
                                <View style={styles.Item_box}>
                                    <View>
                                        <MyImg uri={item.radioImg} style={styles.radioImg}/>
                                    </View>
                                    <Text style={ styles.radioName }>
                                        { item.radioName }
                                    </Text>
                                    <Text style={ styles.listenNum }>
                                        播放量：{ formatNum(item.listenNum) }
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default RadioItem