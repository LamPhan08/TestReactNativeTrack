import React, {useState} from 'react'
import { View, Button } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import tracks from '../tracks'
import RotatingDisk from '../components/RotatingDisk/RotatingDisk'

const Search = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <RotatingDisk isPlaying={isPlaying}/>
      
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlayback}/>
    </View>
  )
}

export default Search
