import React, {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {withNavigation} from 'react-navigation';

const ImageZoom = ({navigation}) => {
  const images = navigation.state.params.image_uri;
  console.log(navigation)
  return (
    <Modal visible={true} transparent={true}>
      {/* <ImageViewer imageUrls={require(images)} /> */}
    </Modal>
  );
};

export default withNavigation(ImageZoom);
