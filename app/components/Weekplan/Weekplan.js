import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import weekday from '../../utils/weekday';
import * as actions from '../../actions';
import colors from '../../config/colors';
import styles from './styles';

class Weekplan extends Component {
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

  async componentDidMount() {
    const res = await axios.get(`https://georgs-recipes.herokuapp.com/api/plan/${this.props.planCode}`);
    const weekplan = res.data.plan;
    this.props.updateWeekplan(weekplan);
  }

  getWeek = (offset = 0) => {
    const start = moment().startOf('isoWeek').add(offset, 'w');
    const week = [];
    for (let i = 0; i < 7; i += 1) {
      const date = moment(start).add(i, 'd').hours(12);
      week.push({
        date,
        entries: this.getEntries(date),
      });
    }
    return week;
  }

  getEntries = date => (
    this.props.weekplan.filter(entry => moment(entry.date).isSame(moment(date), 'day'))
  )

  render() {
    if (!this.props.weekplan) return <Text>Keinen Wochenplan gefunden :(</Text>;
    const week = this.getWeek().map(day => (
      <View key={day.date}>
        <Text>{weekday(day.date)}</Text>
      </View>
    ));
    return (
      <View>
        <View>
          
        </View>
        {week}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  planCode: state.settings.weekplan,
  weekplan: state.user.weekplan,
});

const mapDispatchToProps = dispatch => ({
  updateWeekplan: plan => dispatch(actions.updateWeekplan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Weekplan);
