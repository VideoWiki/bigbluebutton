import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import { withModalMounter } from '/imports/ui/components/modal/service';
import BreakoutRoom from '/imports/ui/newui_components/actions-bar/create-breakout-room/container';

const propTypes = {
  users: PropTypes.arrayOf(Object).isRequired,
  meetingIsBreakout: PropTypes.bool.isRequired,
  hasBreakoutRoom: PropTypes.bool.isRequired,
  isBreakoutEnabled: PropTypes.bool.isRequired,
  isBreakoutRecordable: PropTypes.bool.isRequired
};

class UserOptions extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
      const {
        meetingIsBreakout,
        hasBreakoutRoom,
        isBreakoutEnabled,
        getUsersNotAssigned,
        amIModerator,
        users,
        isBreakoutRecordable
    } = this.props;
    
    console.log(this.props);
    console.log(meetingIsBreakout);
      const canCreateBreakout = amIModerator
        && !meetingIsBreakout
        && !hasBreakoutRoom
        && isBreakoutEnabled;
  
      const canInviteUsers = amIModerator
        && !meetingIsBreakout
        && hasBreakoutRoom
        && getUsersNotAssigned(users).length;

    return (<div>
        {canCreateBreakout&&<BreakoutRoom isInvitation={false} isBreakoutRecordable={isBreakoutRecordable}/>}
        {canInviteUsers&&<BreakoutRoom/>}
    </div>
    );
  }
}

UserOptions.propTypes = propTypes;
export default withModalMounter(injectIntl(UserOptions));
