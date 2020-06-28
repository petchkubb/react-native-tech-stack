import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {CardSection} from './common';

class ListItem extends Component {
  componentDidUpdate() {
    LayoutAnimation.spring();
  }
  renderDescription() {
    const {expanded} = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text style={{flex: 1}}>{this.props.library.description}</Text>
        </CardSection>
      );
    }
  }

  render() {
    const {id, title} = this.props.library;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyles}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  titleStyles: {
    fontSize: 18,
  },
});

const mapStateToProps = (state, props) => {
  const expanded = state.selectedLibraryId === props.library.id;
  return {
    expanded,
  };
};

export default connect(mapStateToProps, actions)(ListItem);
