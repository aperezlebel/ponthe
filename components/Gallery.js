import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import store from '../store/configureStore'
import { getAllYearsFromAPI } from '../API/loadImages'
import GalleryYearList from '../components/GalleryYearList.js'
import GalleryUploadList from '../components/GalleryUploadList.js'

class Gallery extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          year_list: [],
          refreshing: true
      }
      this._loadYears();
  }

  _loadYears () {
    getAllYearsFromAPI(store.getState().userInfo.token).then(data => {
        this.setState({
            year_list: data.jsonData.data,
            refreshing: false,
        })
        console.log(this.state.year_list[0].year)
    })
  }

  _displayGalleryEvent = (item) => {
    this.props.navigation.navigate('GalleryEvent', {gallery: item})
  }


  _refresh() {
    this.setState({
      refreshing: true
    })
    this._loadYears()
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Text style={styles.text_style}>
          Galeries
        </Text>
        <FlatList
          data={this.state.year_list}
          keyExtractor={(item) => item.year.toString()}
          renderItem={({item}) =>
            <GalleryYearList
              year={item.year}
              year_galleries={item.galleries}
              displayGalleryEvent={this._displayGalleryEvent}/>
            }
          onRefresh = {() => {this._refresh()}}
          refreshing = {this.state.refreshing}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingBottom: 10,
    marginTop: "5%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text_style: {
    marginTop: 35,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25
  },
})


export default Gallery
