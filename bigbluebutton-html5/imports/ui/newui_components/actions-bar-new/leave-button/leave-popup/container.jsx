import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Auth from '/imports/ui/services/auth';
import LeavePopup from './component';
import { meetingIsBreakout } from '/imports/ui/components/app/service';
import { UsersContext } from '/imports/ui/components/components-data/users-context/context';

const PUBLIC_CONFIG = Meteor.settings.public;
const ROLE_MODERATOR = PUBLIC_CONFIG.user.role_moderator;

const LeavePopupContainer = props => {

    const usingUsersContext = useContext(UsersContext);
    const { users } = usingUsersContext;
    const currentUser = users[Auth.meetingID][Auth.userID];
    const amIModerator = currentUser.role === ROLE_MODERATOR;

    return (
        <LeavePopup {
            ...{
                ...props, amIModerator
            }
        } />
    )
};

export default withTracker((props) => {

    return {
        isMeteorConnected: Meteor.status().connected,
        isBreakoutRoom: meetingIsBreakout(),
    };
})(LeavePopupContainer);
