import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox, FormInput } from 'react-native-elements';
import axios from 'axios';

import Loading from '../common/Loading/Loading';
import * as actions from '../../actions';
import colors from '../../config/colors';
import styles from './styles';

class ShoppingList extends Component {
  static navigatorButtons = {
    leftButtons: [{
      id: 'sideMenu',
      buttonColor: colors.white,
    }],
  };

  static navigatorStyle = {
    navBarBackgroundColor: colors.primary,
    navBarTextColor: colors.white,
    navBarButtonColor: colors.white,
  };

  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
    };
  }

  async addItem() {
    try {
      const list = this.props.shoppingList.concat([this.state.newItem]);
      this.setState({ newItem: '' });
      await axios.put(`/list/${this.props.listCode}`, {
        list,
      });
      this.props.updateShoppingList(list);
    } catch (error) {
      console.error(error);
    }
  }

  async removeItem(index) {
    try {
      const list = this.props.shoppingList.slice();
      list.splice(index, 1);
      await axios.put(`/list/${this.props.listCode}`, {
        list,
      });
      this.props.updateShoppingList(list);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (!this.props.shoppingList) return <Loading />;
    const list = this.props.shoppingList.map((item, index) => (
      <CheckBox
        key={item} title={item.trim()}
        textStyle={styles.text}
        containerStyle={styles.checkbox}
        onIconPress={() => this.removeItem(index)}
      />
    ));
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FormInput
          placeholder="Hinzufügen"
          inputStyle={styles.input}
          value={this.state.newItem}
          onChangeText={text => this.setState({ newItem: text })}
          onSubmitEditing={() => this.addItem()}
        />
        {list}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  listCode: state.settings.shoppingList,
  shoppingList: state.user.shoppingList,
});

const mapDispatchToProps = dispatch => ({
  updateShoppingList: list => dispatch(actions.updateShoppingList(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
