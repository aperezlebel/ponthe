import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';
import {getFullImageFromAPI} from '../API/loadImages'
import store from '../store/configureStore'


const images = [{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    // props: {
    //     // headers: ...
    // }
}
//  {
//     // props: {
//     //     // Or you can set source directory.
//     //     source: require('../background.png')
//     // }
// }
]

class MyImageViewer extends React.Component {

  constructor(props) {
      super(props)
      console.log(props.show)
      this.state = {
        show: props.show,
        file_list: props.file_list,
        url_list: []
      }
  }

  // render() {
  //   const encodedData = this.props.navigation.state.params.image.base64
  //   const width = this.props.navigation.state.params.image.width
  //   const height = this.props.navigation.state.params.image.height
  //   // console.log(encodedData)
  //   return (
  //     <View style={styles.main_container}>
  //       <Image
  //         style={[styles.image, {width: width, height: height}]}
  //         source={{uri: `data:image/jpg;base64,${encodedData}`}}
  //       />
  //     </View>
  //   )
  // }

  _onCancel = () => {
    console.log("swipe down")
    // console.log(this.props.navigation.navigate('Home'))
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps) {
    getFullImageFromAPI(nextProps.base64_list[0].file_path, store.getState().userInfo.token).then((data) => {
      urls = [{
        url: data.jsonData.base64,
        props: {
          resizeMode: "contain",
          style: {
            width: data.jsonData.width,
            height: data.jsonData.height
          }
        }
      }]

      console.log(urls)

      this.setState({
        show: nextProps.show,
        url_list: urls
      });

    })

  }



  render() {
      console.log(this.state.base64_list)
      return (
          <Modal visible={this.state.show} transparent={true}>
              <ImageViewer
                imageUrls={this.state.url_list}
                onCancel = {this._onCancel}
                enableSwipeDown={true}
                enableImageZoom={true}
                />
          </Modal>
      )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black"
  },
  image: {
    flex: 1,
    resizeMode: ImageResizeMode.contain
  }
})

export default MyImageViewer