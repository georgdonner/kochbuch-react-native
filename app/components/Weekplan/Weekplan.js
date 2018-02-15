import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/de';

import weekday from '../../utils/weekday';
import * as actions from '../../actions';
import colors from '../../config/colors';
import styles from './styles';

moment.locale('de');

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

  constructor(props) {
    super(props);
    this.state = {
      week: 0,
    };
  }

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

  weekText = () => {
    const weekOfYear = moment().add(this.state.week, 'w').isoWeek();
    return this.state.week === 0 ? 'Diese Woche' : `Woche ${weekOfYear}`;
  }

  weekdayText = (date) => {
    let text = weekday(date).toUpperCase();
    if (this.state.week !== 0) {
      text += ` (${moment(date).format('DD.MM.YY')})`;
    }
    return text;
  }

  render() {
    if (!this.props.weekplan) return <Text>Keinen Wochenplan gefunden :(</Text>;
    const week = this.getWeek(this.state.week).map(day => (
      <View key={day.date} style={styles.entry}>
        <Text style={styles.weekday}>{this.weekdayText(day.date)}</Text>
      </View>
    ));
    return (
      <View>
        <View style={styles.weekNav}>
          <Icon
            name="arrow-back"
            color={colors.darkGray}
            onPress={() => this.setState({ week: this.state.week - 1 })}
          />
          <Text style={styles.weekNavText}>{this.weekText()}</Text>
          <Icon
            name="arrow-forward"
            color={colors.darkGray}
            onPress={() => this.setState({ week: this.state.week + 1 })}
          />
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
