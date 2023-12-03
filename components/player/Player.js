import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, Animated, Easing} from 'react-native'
import styles from './player.style'
import { useDispatch, useSelector } from 'react-redux'
import TrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { setTrack } from '../../redux/trackSlice'

const Player = () => {
    const { track, trackList } = useSelector(state => state.track)
    const [playerState, setPlayerState] = useState()
    const [currentDuration, setCurrentDuration] = useState(10000)

    const dispatch = useDispatch()  

    const rotation = useRef(new Animated.Value(0)).current

    useTrackPlayerEvents([Event.PlaybackTrackChanged, Event.PlaybackState], async event => {
        const trackIndex = await TrackPlayer.getCurrentTrack()
        const trackObject = await TrackPlayer.getTrack(trackIndex)

        if (event.state === 'playing' || event.state === 'paused') {
            setPlayerState(event.state)
        }

        dispatch(setTrack(trackObject))
    })


    const handlePause = () => {
        TrackPlayer.pause()
    }

    const handlePlay = () => {
        TrackPlayer.play()
    }

    const handleSkipToNext = async () => {
        const trackIndex = await TrackPlayer.getCurrentTrack()

        if (trackIndex === trackList.length - 1) {
            TrackPlayer.skip(0)
        }
        else {
            TrackPlayer.skipToNext()
        }

        if (playerState !== 'playing') {
            TrackPlayer.play()
        }
    }

    const handleSkipToPrevious = async () => {
        const trackIndex = await TrackPlayer.getCurrentTrack()

        if (trackIndex === 0) {
            TrackPlayer.skip(trackList.length - 1)
        }
        else {
            TrackPlayer.skipToPrevious()
        }

        if (playerState !== 'playing') {
            TrackPlayer.play()
        }
    }

    const startRotate = (duration) => {
        // console.log('duration:', duration)
          Animated.timing(rotation, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start()

      }

      const stopRotate = () => {
        rotation.stopAnimation((value) => {
          const remainingDistance = 1 - value
          setCurrentDuration(remainingDistance * 10000)
        })
      }

      const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
  
      
      rotation.addListener(({value}) => {
        // console.log(value)
        if (value === 1) {
          rotation.setValue(0)
          startRotate(10000)
          setCurrentDuration(10000)
        }
      })

      useEffect(() => {
        if (playerState === 'playing') {
          startRotate(currentDuration)
        }
        else {
          stopRotate()

        }
    }, [playerState])

    return (
        <View style={styles.playerContainer}>
            <Animated.Image style={[styles.playerThumbnail, {transform: [{rotate: rotate}]}]} source={{ uri: track.thumbnail }} />

            <View style={styles.trackDetails}>
                <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>

                <Text style={styles.trackArtist} numberOfLines={1}>{track.artist}</Text>
            </View>

            <View style={styles.playerControlContainer}>
                <TouchableOpacity onPress={handleSkipToPrevious}>
                    <Ionicons name='play-skip-back' style={styles.controlIcon} />
                </TouchableOpacity>

                {playerState !== 'paused'
                    ? <TouchableOpacity onPress={handlePause}>
                        <Ionicons name='pause' style={styles.controlIcon} />
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={handlePlay}>
                        <Ionicons name='play' style={styles.controlIcon} />
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress={handleSkipToNext}>
                    <Ionicons name='play-skip-forward' style={styles.controlIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Player
