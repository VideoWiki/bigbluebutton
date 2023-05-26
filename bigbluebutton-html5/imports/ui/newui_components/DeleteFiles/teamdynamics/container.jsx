import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ActionsBarService from '/imports/ui/components/actions-bar/service';

import TeamDynamicsComponent from './component';

const TeamDynamicsContainer = (props) => {
  const { amIModerator } = props;
  return (
    amIModerator
    && (
      <TeamDynamicsComponent {...props} />
    )
  );
};

export default withTracker(() => ({
  createBreakoutRoom: ActionsBarService.createBreakoutRoom,
  getBreakouts: ActionsBarService.getBreakouts,
  getUsersNotAssigned: ActionsBarService.getUsersNotAssigned,
  sendInvitation: ActionsBarService.sendInvitation,
  breakoutJoinedUsers: ActionsBarService.breakoutJoinedUsers(),
  users: ActionsBarService.users(),
  isMe: ActionsBarService.isMe,
  meetingName: ActionsBarService.meetingName(),
  amIModerator: ActionsBarService.amIModerator(),
}))(TeamDynamicsContainer);





// import { withTracker } from 'meteor/react-meteor-data';
// import PropTypes from 'prop-types';
// // import Auth from '/imports/ui/services/auth';
// // import Meetings from '/imports/api/meetings';
// import ActionsBarService from '/imports/ui/components/actions-bar/service';
// // import LearningDashboardService from '/imports/ui/components/learning-dashboard/service';
// // import UserListService from '/imports/ui/components/user-list/service';
// // import WaitingUsersService from '/imports/ui/components/waiting-users/service';
// // import logger from '/imports/startup/client/logger';
// import { defineMessages, injectIntl } from 'react-intl';
// // import { notify } from '/imports/ui/services/notification';
// import BreakoutRoomComponent from './component';

// const propTypes = {
//   users: PropTypes.arrayOf(Object).isRequired,
//   clearAllEmojiStatus: PropTypes.func.isRequired,
//   intl: PropTypes.object.isRequired,
// };

// // const intlMessages = defineMessages({
// //   clearStatusMessage: {
// //     id: 'app.userList.content.participants.options.clearedStatus',
// //     description: 'Used in toast notification when emojis have been cleared',
// //   },
// // });

// // const { dynamicGuestPolicy } = Meteor.settings.public.app;

// // const meetingMuteDisabledLog = () => logger.info({
// //   logCode: 'useroptions_unmute_all',
// //   extraInfo: { logType: 'moderator_action' },
// // }, 'moderator disabled meeting mute');

// const BreakoutContainer = withTracker((props) => {
//   const {
//     // users,
//     // clearAllEmojiStatus,
//     // intl,
//   } = props;

// //   const toggleStatus = () => {
// //     clearAllEmojiStatus(users);

// //     notify(
// //       intl.formatMessage(intlMessages.clearStatusMessage), 'info', 'clear_status',
// //     );
// //   };

// //   const isMeetingMuteOnStart = () => {
// //     const { voiceProp } = Meetings.findOne({ meetingId: Auth.meetingID },
// //       { fields: { 'voiceProp.muteOnStart': 1 } });
// //     const { muteOnStart } = voiceProp;
// //     return muteOnStart;
// //   };

// //   const getMeetingName = () => {
// //     const { meetingProp } = Meetings.findOne({ meetingId: Auth.meetingID },
// //       { fields: { 'meetingProp.name': 1 } });
// //     const { name } = meetingProp;
// //     return name;
// //   };

//   return {
//     // toggleMuteAllUsers: () => {
//     //   UserListService.muteAllUsers(Auth.userID);
//     //   if (isMeetingMuteOnStart()) {
//     //     return meetingMuteDisabledLog();
//     //   }
//     //   return logger.info({
//     //     logCode: 'useroptions_mute_all',
//     //     extraInfo: { logType: 'moderator_action' },
//     //   }, 'moderator enabled meeting mute, all users muted');
//     // },
//     // toggleMuteAllUsersExceptPresenter: () => {
//     //   UserListService.muteAllExceptPresenter(Auth.userID);
//     //   if (isMeetingMuteOnStart()) {
//     //     return meetingMuteDisabledLog();
//     //   }
//     //   return logger.info({
//     //     logCode: 'useroptions_mute_all_except_presenter',
//     //     extraInfo: { logType: 'moderator_action' },
//     //   }, 'moderator enabled meeting mute, all users muted except presenter');
//     // },
//     // toggleStatus,
//     // isMeetingMuted: isMeetingMuteOnStart(),
//     // amIModerator: ActionsBarService.amIModerator(),
//     // getUsersNotAssigned: ActionsBarService.getUsersNotAssigned,
//     // hasBreakoutRoom: UserListService.hasBreakoutRoom(),
//     // isBreakoutEnabled: ActionsBarService.isBreakoutEnabled(),
//     isBreakoutRecordable: ActionsBarService.isBreakoutRecordable(),
//     isInvitation: false
//     // users: ActionsBarService.users(),
//     // guestPolicy: WaitingUsersService.getGuestPolicy(),
//     // isMeteorConnected: Meteor.status().connected,
//     // meetingName: getMeetingName(),
//     // learningDashboardEnabled: LearningDashboardService.isLearningDashboardEnabled(),
//     // openLearningDashboardUrl: LearningDashboardService.openLearningDashboardUrl,
//     // dynamicGuestPolicy,
//   };
// })(BreakoutRoomComponent);

// BreakoutContainer.propTypes = propTypes;

// export default injectIntl(BreakoutContainer);
