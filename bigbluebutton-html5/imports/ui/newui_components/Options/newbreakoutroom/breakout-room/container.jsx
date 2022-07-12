import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AudioService from '/imports/ui/components/audio/service';
import AudioManager from '/imports/ui/services/audio-manager';
import BreakoutComponent from './component';
import Service from '/imports/ui/components/breakout-room/service';
import LayoutContext from '/imports/ui/components/layout/context';
import UserListService from '/imports/ui/components/user-list/service';

const BreakoutContainer = (props) => {
  const layoutContext = useContext(LayoutContext);
  const { layoutContextDispatch } = layoutContext;
  return <BreakoutComponent {...{ layoutContextDispatch, ...props }} />;
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
    users: UserListService.getUsers()
  };
})(BreakoutContainer);
