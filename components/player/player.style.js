import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ccc',
        gap: 10
        // backgroundColor: 'yellow'
    },

    playerThumbnail: {
        height: 40,
        width: 40,
        borderRadius: 100,
    },

    trackDetails:{
        justifyContent: 'space-between',
        flex: 1,
        // backgroundColor: 'red',
    },

    trackTitle: {
        color: '#000',
        fontWeight: '500',
        fontSize: 14
    },

    trackArtist: {
        color: 'grey',
        fontSize: 12
    },

    playerControlContainer: {
        flexDirection: 'row',
        gap: 10
    },

    controlIcon: {
        fontSize: 26,
        color: '#000',
    }
    
})