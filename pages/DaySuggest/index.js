import React from 'react'
import { View } from 'react-native'
import NewSong from './newSong'
class DaySuggest extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <NewSong />
            </View>
            
        )
    }
}

export default DaySuggest