import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import store from '../store/configureStore'
import MyImageViewer from './MyImageViewer'
import ImageItem from './ImageItem'

class MyFlatList extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          full_path_list: [],
          full_dim_list: [],
          full_file_list: [],
          partial_file_list: [],
          showImageViewer: false,
          current_index: 0,
          page: 0,
          page_size: 10,
          refreshing: true
      }

      this.getImages = props.getImages
      this._loadAllPaths()
      this._loadNextImages()
  }

  _loadAllPaths() {
    this.getImages().then(data => {
        var path_list = new Array(data.jsonData.files.length).fill("")
        var dim_list = new Array(data.jsonData.files.length).fill({})
        var full_file_list = new Array(data.jsonData.files.length)

        for (var i = 0; i < data.jsonData.files.length; i++) {

          full_file_list[i] = {
            file_path: data.jsonData.files[i].file_path,
            file_dim: data.jsonData.files[i].full_dimension
          }
          path_list[i] = data.jsonData.files[i].file_path
          dim_list[i] = data.jsonData.files[i].full_dimension
        }

        this.setState({
          full_file_list: full_file_list,
          partial_file_list: full_file_list.slice(0, this.state.page_size),
          full_path_list: path_list,
          full_dim_list: dim_list,
          refreshing: false,
          page: 0,
          current_index: -1,
        })
    })
  }

  _displayFullImage = (item, index) => {
    this.setState({
      'showImageViewer': true,
      'current_index': index
    })
  }

  _loadNextImages () {
    if((this.state.page+1)*this.state.page_size < this.state.full_file_list.length){
      this.setState({
        partial_file_list: this.state.partial_file_list.concat(this.state.full_file_list.slice((this.state.page+1)*this.state.page_size, (this.state.page+2)*this.state.page_size)),
        page: this.state.page+1,
        current_index: -1
      })
    }
  }

  _refresh() {
    this.setState({
      refreshing: true,
      current_index: -1
    })
    this._loadAllPaths()
  }

  render() {
    return (
      <View style={[this.props.container_style, styles.main_container]}>
        {this.props.title != undefined &&
          <Text style={styles.text_style}>
            {this.props.title}
          </Text>
        }
        <FlatList
          data={this.state.partial_file_list}
          keyExtractor={(item) => item.file_path.toString()}
          numColumns={numColumns}
          renderItem={({item, index}) =>
            <TouchableOpacity
              style={styles.touchable_opacity}
              onPress={() => this._displayFullImage(item, index)}>
              <ImageItem
                path={item.file_path}
                style = {styles.image}
              />
            </TouchableOpacity>
          }
          onEndReachedThreshold = {0.3}
          onEndReached = {() => {this._loadNextImages()}}
          onRefresh = {() => {this._refresh()}}
          refreshing = {this.state.refreshing}
        />
        <MyImageViewer
          show={this.state.showImageViewer}
          full_path_list={this.state.full_path_list}
          full_dim_list={this.state.full_dim_list}
          current_index={this.state.current_index}
        />
      </View>
    )
  }
}

const numColumns = 2

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white'
  },
  touchable_opacity: {
    flex: 1,
    margin: 2,
  },
  text_style: {
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25
  },
  image: {
    width: "100%",
    height: 150,
  }
})

export default MyFlatList
