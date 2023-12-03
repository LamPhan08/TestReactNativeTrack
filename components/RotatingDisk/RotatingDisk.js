import React, { useRef, useEffect, useState } from 'react'
import { Easing, View, Animated } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setRotateDuration } from '../../redux/trackSlice'
import tracks from '../../tracks'
import { debounce } from 'lodash'

const RotatingDisk = ({ isPlaying }) => {
    const rotation = useRef(new Animated.Value(0)).current
    const [currentDuration, setCurrentDuration] = useState(5000)

    // console.log(isPlaying)

    const startRotate = (duration) => {
      // console.log('duration:', duration)
        Animated.timing(rotation, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true
        }).start()
    }

    // rotation.addListener(({value}) => {
    //     if (value === 1) {
    //       rotation.stopAnimation()
    //       rotation.setValue(0)
    //       setCurrentDuration(5000)
    //       startRotate()
    //     }
    // })


    const stopRotate = () => {
      rotation.stopAnimation()
      rotation.stopAnimation((value) => {
        const remainingDistance = 1 - value
        setCurrentDuration(remainingDistance * 5000)
      })
    }

    const rotate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    
    rotation.addListener(({value}) => {
      if (value === 1) {
        rotation.setValue(0)
        startRotate(5000)
        setCurrentDuration(5000)
      }
    })

    
    useEffect(() => {
        if (isPlaying) {
          startRotate(currentDuration)
        }
        else {
          stopRotate()

        }
    }, [isPlaying])


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Animated.Image
                source={{uri: tracks[0].thumbnail}}
                style={{ width: 200, height: 200, borderRadius: 100, transform: [{rotate: rotate}]}}
            />
        </View>
    )
}

export default RotatingDisk
