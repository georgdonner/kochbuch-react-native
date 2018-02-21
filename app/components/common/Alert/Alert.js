import React from 'react';
import { connect } from 'react-redux';
import StatusBarAlert from 'react-native-statusbar-alert';

import init from '../../../actions/init';
import colors from '../../../config/colors';

const Alert = props => (
  <StatusBarAlert
    visible={props.fetchFailed}
    message="Inhalte nicht aktuell. Drücken zum neu laden."
    backgroundColor={colors.gray1}
    color={colors.white}
    onPress={() => props.init()}
  />
);

const mapStateToProps = state => ({
  fetchFailed: state.status.fetchFailed,
});

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(init()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
