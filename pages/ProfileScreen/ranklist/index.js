
import React from 'react'
import { ScrollView, View, Text,Image } from 'react-native'
import styles from './styles'
import RankItem from './rankItem'
import { tags } from './tags'


class RankList extends React.Component {
    render() {
        return (
            <ScrollView style={ styles.ScrollView }>
                {
                    tags.dianfeng.map(item => (
                        <RankItem topId={item.topId} key={ item.topId } name={item.name}/>
                    ))
                }
                {
                    tags.area.map(item => (
                        <RankItem topId={item.topId} key={ item.topId } name={item.name}/>
                    ))
                }
                {
                    tags.specail.map(item => (
                        <RankItem topId={item.topId} key={ item.topId } name={item.name}/>
                    ))
                }
                {
                    tags.world.map(item => (
                        <RankItem topId={item.topId} key={ item.topId } name={item.name}/>
                    ))
                }
            </ScrollView>
        )
    }
}

export default RankList