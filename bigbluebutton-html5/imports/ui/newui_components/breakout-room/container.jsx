import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AudioService from '/imports/ui/components/audio/service';
import AudioManager from '/imports/ui/services/audio-manager';
import BreakoutComponent from './component';
import Service from './service';
import LayoutContext from '../../components/layout/context';
import { UsersContext } from '/imports/ui/components/components-data/users-context/context';
import Auth from '/imports/ui/services/auth';

const BreakoutContainer = (props) => {
  const layoutContext = useContext(LayoutContext);
  const { layoutContextDispatch } = layoutContext;
  const usingUsersContext = useContext(UsersContext);
  const { users } = usingUsersContext;
  const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;
  return <BreakoutComponent {...{ layoutContextDispatch, ...props }} users={users[Auth.meetingID]} ROLE_MODERATOR={ROLE_MODERATOR} />;
};

export default withTracker((props) => {
  const {
    endAllBreakouts,
    requestJoinURL,
    extendBreakoutsTime,
    isExtendTimeHigherThanMeetingRemaining,
    findBreakouts,
    getBreakoutRoomUrl,
    transferUserToMeeting,
    transferToBreakout,
    meetingId,
    amIModerator,
    isUserInBreakoutRoom,
  } = Service;

  const breakoutRooms = findBreakouts();
  const isMicrophoneUser = AudioService.isConnected() && !AudioService.isListenOnly();
  const isMeteorConnected = Meteor.status().connected;
  const isReconnecting = AudioService.isReconnecting();
  const {
    setBreakoutAudioTransferStatus,
    getBreakoutAudioTransferStatus,
  } = AudioService;

  return {
    ...props,
    breakoutRooms,
    endAllBreakouts,
    requestJoinURL,
    extendBreakoutsTime,
    isExtendTimeHigherThanMeetingRemaining,
    getBreakoutRoomUrl,
    transferUserToMeeting,
    transferToBreakout,
    isMicrophoneUser,
    meetingId: meetingId(),
    amIModerator: amIModerator(),
    isMeteorConnected,
    isUserInBreakoutRoom,
    exitAudio: () => AudioManager.exitAudio(),
    isReconnecting,
    setBreakoutAudioTransferStatus,
    getBreakoutAudioTransferStatus,
  };
})(BreakoutContainer);
