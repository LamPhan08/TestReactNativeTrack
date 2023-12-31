import {StyleSheet, Dimensions} from 'react-native'

const {width} = Dimensions.get('window')

export default styles = StyleSheet.create({
    newReleaseItemContainer: {
        gap: 5
    },
    newReleaseItem: {
        // backgroundColor: COLORS.itemBackground,
        width: width,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 0.5,
        borderColor: '#ddd'
    },

    thumbnail: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 5
    },

    newReleaseDetails: {
        flex: 1,
        gap: 5
    },

    titleContainer: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',

    },

    title: {
        fontSize: 14,
        fontFamily: 'Mulish-Bold',
        color: '#000'
    },

    artistsNames: {
        fontSize: 12,
        fontFamily: 'Mulish-Regular',
        color: 'grey'
    },

    releaseDate: {
        fontSize: 12,
        fontFamily: 'Mulish-Regular',
        color: 'grey'
    },

    moreIcon: {
        fontSize: 20,
        color: 'grey'
    }

})