

import React from 'react'
import { View } from 'react-native'
import { reqGetSongListDetail } from '../../api'


class ClassDetail extends React.Component{

    componentDidMount =　() => {
        const { disstid } = this.props.route.params
        console.log(disstid)
        reqGetSongListDetail({
            disstid:disstid
        })
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}

export default ClassDetail