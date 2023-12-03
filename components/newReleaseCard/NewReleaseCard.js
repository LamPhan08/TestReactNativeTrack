import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './newReleaseCard.style'
import {useDispatch, useSelector} from 'react-redux'
import TrackPlayer from 'react-native-track-player'
import { setTrack, setTrackList, setPlay } from '../../redux/trackSlice'

const NewReleaseCard = ({ trackData, playlistData }) => {
  const dispatch = useDispatch()

  const handlePress = async () => {
    await TrackPlayer.setQueue(playlistData)

    dispatch(setTrackList(playlistData))
    dispatch(setTrack(trackData.item))

    await TrackPlayer.skip(trackData.index)

    TrackPlayer.play()

    
  }

  

  return (
    <View style={styles.newReleaseItemContainer}>

          <TouchableOpacity style={styles.newReleaseItem} onPress={handlePress}>
            <Image source={{ uri: trackData.item.thumbnail }} style={styles.thumbnail} />

            <View style={styles.newReleaseDetails}>
              <View>
                <Text style={styles.title} numberOfLines={1}>{trackData.item.title}</Text>

                <Text style={styles.artistsNames} numberOfLines={1}>{trackData.item.artist}</Text>
              </View>

              {/* <Text style={styles.releaseDate} numberOfLines={1}>{HandleDate(item.releaseDate)}</Text> */}
            </View>

            {/* <TouchableOpacity>
              <Feather name='more-vertical' style={styles.moreIcon} />
            </TouchableOpacity> */}
          </TouchableOpacity>
    </View>
  )
}

export default NewReleaseCard
