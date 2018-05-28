import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import Interactable from 'react-native-interactable';

const screenSettings = {
  interactableBottom: Dimensions.get('window').height - 100
};

export default class BottomSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: false
    };
    this.onSnap = this.onSnap.bind(this)
  }

  onSnap = ({nativeEvent}) => {
    const {index, id} = nativeEvent;
    if (index === 1) {
      this.setState({
        scroll: true
      });
    } else {
      this.setState({
        scroll: false
      });
    }
  };

  onScroll = (event: Object) => {
    if (event.nativeEvent.contentOffset.y > 0) {
      this.setState({
        scroll: true
      });
    } else {
      this.setState({
        scroll: false
      });
    }
  };

  onScrollDragEnd = (event: Object) => {
    if (event.nativeEvent.contentOffset.y > 0) {
      this.setState({
        scroll: true
      });
    } else {
      this.setState({
        scroll: false
      });
    }
  };

  render() {
    return (
      <Interactable.View
        style={ this.props.style }
        gravityPoints={ [{x: 0, y: 100, strength: 5000, falloff: 40, damping: 0.5}] }
        initialPosition={ {y: screenSettings.interactableBottom} }
        verticalOnly={ true }
        snapPoints={ [{y: screenSettings.interactableBottom, tension: 1000}, {y: 100}] }
        boundaries={ {left: 0, right: 0, top: 100, bounce: 0} }
        onSnap={ this.onSnap }>
        { this.props.header }
        <ScrollView
          onScroll={ this.onScroll }
          onScrollDragEnd={ this.onScrollDragEnd }
          scrollEventThrottle={ 100 }
          scrollEnabled={ this.state.scroll }
          style={ {
            maxHeight: Dimensions.get('window').height - 180,
          } }
        >
          <View>
            { '' }
          </View>
        </ScrollView>
      </Interactable.View>
    );
  }
}