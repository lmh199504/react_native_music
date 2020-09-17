import React from 'react'
import { View } from 'react-native'
import NewSong from './newSong'
import BottomPlayer from '../../components/bottomPlayer'
class DaySuggest extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <NewSong />
                {/* <BottomPlayer /> */}
            </View>
            
        )
    }
}

export default DaySuggest