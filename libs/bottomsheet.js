import React from 'react';
import { Dimensions, Platform, ScrollView, View } from 'react-native';
import Interactable from 'react-native-interactable';

const screenSettings = {
  interactableBottom: Dimensions.get('window').height - 100
};

export default class BottomSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll        : false,
      showBackground: false,
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
  onStopInteraction = ({nativeEvent}) => {
    const {y} = nativeEvent
    if (y === 100) {
      this.setState({
        scroll: !this.state.showBackground
      });
    } else {
      this.setState({
        showBackground: false
      })
    }
  }

  render() {
    return (
      <View>
        <Interactable.View
          style={ this.props.style }
          gravityPoints={ [{x: 0, y: 100, strength: 1000, falloff: 40, damping: 0.5}] }
          initialPosition={ {y: screenSettings.interactableBottom} }
          verticalOnly={ true }
          snapPoints={ [{y: screenSettings.interactableBottom}, {y: 50}] }
          boundaries={ {left: 0, right: 0, top: 100, bounce: 0} }
          onStop={ this.onStopInteraction }
          onSnap={ this.onSnap }>
          { this.props.header }
          <ScrollView
            onScroll={ this.onScroll }
            onScrollDragEnd={ this.onScrollDragEnd }
            scrollEventThrottle={ 100 }
            bounces={ Platform.OS === 'ios' ? false : undefined }
            overScrollMode={ Platform.OS === 'ios' ? undefined : 'never' }
            scrollEnabled={ true }
            style={ {
              height         : Dimensions.get('window').height - 210,
              backgroundColor: '#FFFFFF',
            } }
          >
            { this.props.children }
          </ScrollView>
        </Interactable.View>
      </View>
    );
  }
}