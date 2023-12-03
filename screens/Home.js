import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ScrollView, SafeAreaView } from 'react-native'
import TrackPlayer, { State, useTrackPlayerEvents, Event, useProgress, Capability } from 'react-native-track-player'
import NewReleaseCard from '../components/newReleaseCard/NewReleaseCard'
import tracks from '../tracks'
import { useSelector, useDispatch } from 'react-redux'
import Player from '../components/player/Player'
import { setPlay, setPause } from '../redux/trackSlice'

const Home = ({ navigation }) => {
    // const progress = useProgress();

    const { track, trackList } = useSelector(state => state.track)

    const setupTrackPlayer = async () => {
        await TrackPlayer.setupPlayer()

        TrackPlayer.updateOptions({
            // Media controls capabilities
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                // Capability.Stop,
            ],

            // Capabilities that will show up when the notification is in the compact form on Android
            compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious],



        });
    }

    useEffect(() => {
        setupTrackPlayer()
    }, [])

    // console.log('track:', track)
    // console.log('trackList:', trackList)


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ paddingTop: 10, }}>
                <View style={{ gap: 12, marginBottom: 35 }}>
                    <Text style={{ fontSize: 20, marginLeft: 10, color: '#000' }}>Mới phát hành</Text>
                    <FlatList
                        data={tracks.slice(0, 5)}
                        style={{ flex: 1 }}
                        scrollEnabled={false}
                        renderItem={(item, index) => {
                            return (
                                <NewReleaseCard trackData={item} key={index} playlistData={tracks.slice(0, 5)} />
                            )
                        }}
                    />
                </View>

                <View style={{ gap: 12 }}>
                    <Text style={{ fontSize: 20, marginLeft: 10, color: '#000' }}>Yêu thích</Text>
                    <FlatList
                        data={tracks.slice(5)}
                        style={{ flex: 1 }}
                        scrollEnabled={false}
                        renderItem={(item, index) => {
                            return (
                                <NewReleaseCard trackData={item} key={index} playlistData={tracks.slice(5)} />
                            )
                        }}
                    />
                </View>
            </ScrollView>
            {Object.keys(track).length !== 0 ? <Player /> : null}
        </SafeAreaView>
    )
}

export default Home
