import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import _ from 'lodash';
import CreateBreakoutRoom from './create-breakout-room/container';
import ActionsBarService from '/imports/ui/components/actions-bar/service';
import BreakroomContainer from './breakout-room/container'

import CreateBreakoutRoom1 from '../../../components/actions-bar/create-breakout-room/container';
// import { withModalMounter } from '/imports/ui/components/modal/service';
// import Button from '/imports/ui/components/button/component';
// import LockViewersContainer from '/imports/ui/components/lock-viewers/container';
// import GuestPolicyContainer from '/imports/ui/components/waiting-users/guest-policy/container';
// import CaptionsService from '/imports/ui/components/captions/service';
// import CaptionsWriterMenu from '/imports/ui/components/captions/writer-menu/container';
// import BBBMenu from '/imports/ui/components/menu/component';
// import { styles } from './styles';
// import { getUserNamesLink } from '/imports/ui/components/user-list/service';
// import Settings from '/imports/ui/services/settings';

const propTypes = {
  //   intl: PropTypes.shape({
  //     formatMessage: PropTypes.func.isRequired,
  //   }).isRequired,
  //   isMeetingMuted: PropTypes.bool.isRequired,
  //   toggleMuteAllUsers: PropTypes.func.isRequired,
  //   toggleMuteAllUsersExceptPresenter: PropTypes.func.isRequired,
  //   toggleStatus: PropTypes.func.isRequired,
  //   mountModal: PropTypes.func.isRequired,
  //   users: PropTypes.arrayOf(Object).isRequired,
  //   guestPolicy: PropTypes.string.isRequired,
  //   meetingIsBreakout: PropTypes.bool.isRequired,
  //   hasBreakoutRoom: PropTypes.bool.isRequired,
  //   isBreakoutEnabled: PropTypes.bool.isRequired,
  isBreakoutRecordable: PropTypes.bool.isRequired,
  isInvitation: PropTypes.bool.isRequired,
  //   dynamicGuestPolicy: PropTypes.bool.isRequired,
};

class BreakoutRoomComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formFillLevel: 1,
    };
    this.changeFormLevel = this.changeFormLevel.bind(this);
  }

  componentDidMount(){
    const breakouts = ActionsBarService.getBreakouts();
    if (breakouts.length > 0) {
      this.setState({ formFillLevel: 7 })
    }
  }
  componentDidUpdate() {
    const breakouts = ActionsBarService.getBreakouts();
    if (breakouts.length > 0) {
      this.setState({ formFillLevel: 7 })
    }
  }

  changeFormLevel(state) {
    this.setState({ ...state })
  }

  render() {
    const { isBreakoutRecordable, isInvitation } = this.props;

    return (
      <>
        {
          this.state.formFillLevel != 7 &&
          <CreateBreakoutRoom
            {...{
              isBreakoutRecordable,
              isInvitation,
              ...this.state,
              changeFormLevel: this.changeFormLevel,
            }}
          />
        }
        {
          this.state.formFillLevel === 7 && 
          <BreakroomContainer/>
        }
      </>
    );
  }
}

BreakoutRoomComponent.propTypes = propTypes;
export default injectIntl(BreakoutRoomComponent);
