import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    trackList: [],
    isPlay: false,
    currentTime: 0,
    duration: 0,
    track: {},
    rotateDuration: 5000
}

export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        setTrack: (state, action) => {
            state.track = action.payload
        },

        setTrackList: (state, action) => {
            state.trackList = action.payload
        },
        setPlay: (state) => {
            state.isPlay = true
        },
        setPause: (state) => {
            state.isPlay = false
        },
        setRotateDuration: (state, action) => {
            state.rotateDuration = action.payload
            // console.log('Done')
        }
    }
})

export const {setTrack, setTrackList, setPlay, setPause, setRotateDuration} = trackSlice.actions

export default trackSlice.reducer