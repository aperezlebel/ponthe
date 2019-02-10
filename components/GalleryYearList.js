import React from 'react'
import { StyleSheet, View, Text, FlatList,
  ImageBackground, TouchableOpacity } from 'react-native'
import GalleryEventGrid from '../components/GalleryEventGrid.js'
import ImageItem from './ImageItem'

class GalleryYearList extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Text style={styles.year_text}> {this.props.year} </Text>
        <FlatList
          data={this.props.year_galleries}
          keyExtractor={(item) => item.toString()}
          horizontal={true}
          renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => this.props.displayGalleryEvent(item)}>
              <ImageItem
                // base64={item.image}
                path={item.file_path}
                style={styles.image}
              />
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 25
  },
  year_text: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 25
  },
  event_text_container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  event_text: {
    fontWeight: 'bold',
    //textTransform: 'uppercase',
    fontSize: 15,
    color: 'white'
  },
  image: {
    flex: 1,
    margin: 5,
    width: 226,
    height: 226,
    // margin: 5,
    // backgroundColor: '#DDDDDD'
  }
})

export default GalleryYearList
