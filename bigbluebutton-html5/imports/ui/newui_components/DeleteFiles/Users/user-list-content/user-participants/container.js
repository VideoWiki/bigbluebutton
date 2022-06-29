import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import UserListService from '/imports/ui/components/user-list/service';
import MyUserParticipants from './component';
import { meetingIsBreakout } from '/imports/ui/components/app/service';
import ChatService from '/imports/ui/components/chat/service';

const MyUserParticipantsContainer = (props) => <MyUserParticipants {...props} />;

export default withTracker(() => {
  ChatService.removePackagedClassAttribute(
    ['ReactVirtualized__Grid', 'ReactVirtualized__Grid__innerScrollContainer'],
    'role',
  );

  return ({
    users: UserListService.getUsers(),
    meetingIsBreakout: meetingIsBreakout(),
  });
})(MyUserParticipantsContainer);
