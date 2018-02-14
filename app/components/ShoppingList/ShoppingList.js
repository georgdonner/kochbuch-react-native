import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox, FormInput } from 'react-native-elements';
import axios from 'axios';

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
      shoppingList: [],
      newItem: '',
    };
  }

  async componentDidMount() {
    const res = await axios.get(`https://georgs-recipes.herokuapp.com/api/list/${this.props.listCode}`);
    const shoppingList = res.data.list;
    this.setState({ shoppingList });
    this.props.updateShoppingList(shoppingList);
  }

  async addItem() {
    try {
      const list = this.state.shoppingList.concat([this.state.newItem]);
      this.setState({ newItem: '' });
      await axios.put(`https://georgs-recipes.herokuapp.com/api/list/${this.props.listCode}`, {
        list,
      });
      this.setState({ shoppingList: list });
    } catch (error) {
      console.error(error);
    }
  }

  async removeItem(index) {
    try {
      const list = this.state.shoppingList.slice();
      list.splice(index, 1);
      await axios.put(`https://georgs-recipes.herokuapp.com/api/list/${this.props.listCode}`, {
        list,
      });
      this.setState({ shoppingList: list });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const list = this.state.shoppingList.map((item, index) => (
      <CheckBox
        key={item} title={item}
        textStyle={styles.text}
        onIconPress={() => this.removeItem(index)}
      />
    ));
    return (
      <View style={styles.container}>
        <FormInput
          placeholder="Hinzufügen"
          inputStyle={styles.input}
          value={this.state.newItem}
          onChangeText={text => this.setState({ newItem: text })}
          onSubmitEditing={() => this.addItem()}
        />
        {list}
      </View>
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
