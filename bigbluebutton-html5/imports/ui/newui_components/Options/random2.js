import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ActionsBarService from '/imports/ui/components/actions-bar/service';
import UserListService from '/imports/ui/components/user-list/service';
import { meetingIsBreakout } from '/imports/ui/components/app/service';
import { injectIntl } from 'react-intl';
import UserOptions from './random';

const propTypes = {
  users: PropTypes.arrayOf(Object).isRequired,
};

const UserOptionsContainer = withTracker((props) => {
    console.log(props);
    return {
    amIModerator: ActionsBarService.amIModerator(),
    getUsersNotAssigned: ActionsBarService.getUsersNotAssigned,
    hasBreakoutRoom: UserListService.hasBreakoutRoom(),
    isBreakoutEnabled: ActionsBarService.isBreakoutEnabled(),
    isBreakoutRecordable: ActionsBarService.isBreakoutRecordable(),
    users: ActionsBarService.users(),
    meetingIsBreakout: meetingIsBreakout(),
    isMeteorConnected: Meteor.status().connected
    };
})(UserOptions);

UserOptionsContainer.propTypes = propTypes;

export default injectIntl(UserOptionsContainer);
