import React, { useEffect, useState } from "react";
import Plus from "../Icons/Plus";
import Button from '/imports/ui/newui_components/button/component';
import { defineMessages, injectIntl } from 'react-intl';
import _ from 'lodash';
import AudioManager from '/imports/ui/services/audio-manager';
import { Session } from 'meteor/session';
import VideoService from '/imports/ui/components/video-provider/service';
import logger from '/imports/startup/client/logger';
import UserListService from '/imports/ui/components/user-list/service';
import { screenshareHasEnded } from '/imports/ui/components/screenshare/service';
import BreakoutRoomContainer from '../../../breakout-room/breakout-remaining-time/container'

import { styles } from "../styles.scss";

const intlMessages = defineMessages({
  breakoutTitle: {
    id: 'app.createBreakoutRoom.title',
    description: 'breakout title',
  },
  breakoutAriaTitle: {
    id: 'app.createBreakoutRoom.ariaTitle',
    description: 'breakout aria title',
  },
  breakoutDuration: {
    id: 'app.createBreakoutRoom.duration',
    description: 'breakout duration time',
  },
  breakoutRoom: {
    id: 'app.createBreakoutRoom.room',
    description: 'breakout room',
  },
  breakoutJoin: {
    id: 'app.createBreakoutRoom.join',
    description: 'label for join breakout room',
  },
  breakoutJoinAudio: {
    id: 'app.createBreakoutRoom.joinAudio',
    description: 'label for option to transfer audio',
  },
  breakoutReturnAudio: {
    id: 'app.createBreakoutRoom.returnAudio',
    description: 'label for option to return audio',
  },
  askToJoin: {
    id: 'app.createBreakoutRoom.askToJoin',
    description: 'label for generate breakout room url',
  },
  generatingURL: {
    id: 'app.createBreakoutRoom.generatingURL',
    description: 'label for generating breakout room url',
  },
  endAllBreakouts: {
    id: 'app.createBreakoutRoom.endAllBreakouts',
    description: 'Button label to end all breakout rooms',
  },
  alreadyConnected: {
    id: 'app.createBreakoutRoom.alreadyConnected',
    description: 'label for the user that is already connected to breakout room',
  },
  extendTimeInMinutes: {
    id: 'app.createBreakoutRoom.extendTimeInMinutes',
    description: 'Label for input to extend time (minutes)',
  },
  extendTimeLabel: {
    id: 'app.createBreakoutRoom.extendTimeLabel',
    description: 'Button label to incresce breakout rooms time',
  },
  extendTimeCancel: {
    id: 'app.createBreakoutRoom.extendTimeCancel',
    description: 'Button label to cancel extend breakout rooms time',
  },
  extendTimeHigherThanMeetingTimeError: {
    id: 'app.createBreakoutRoom.extendTimeHigherThanMeetingTimeError',
    description: 'Label for error when extend breakout rooms time would be higher than remaining time in parent meeting',
  },
});

function Joinroom(props) {
  let prevBreakoutData = {};
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    requestedBreakoutId: '',
    waiting: false,
    generated: false,
    joinedAudioOnly: false,
    breakoutId: '',
    visibleExtendTimeForm: false,
    visibleExtendTimeHigherThanMeetingTimeError: false,
    extendTime: 5,
  });
  console.log("join", props, state)

  const clearJoinedAudioOnly = ()=> {
    setState({...state, joinedAudioOnly: false });
  }

  // useEffect(() => {
  //   let arr = [];
  //   let count = 1;
  //   props.breakoutRoom.joinedUsers.forEach((user) => {
  //     if (user.room == props.room) {
  //       arr.push({ ...user, count: count })
  //       count += 1;
  //     }
  //   })
  //   setUsers(arr);
  // }, [props.breakoutRoom])

  // useEffect(()=>{
  //   const {
  //     getBreakoutRoomUrl,
  //     setBreakoutAudioTransferStatus,
  //     isMicrophoneUser,
  //     isReconnecting,
  //     breakoutRooms,
  //   } = props.breakout;

  //   const {
  //     waiting,
  //     requestedBreakoutId,
  //     joinedAudioOnly,
  //     generated,
  //   } = state;

  //   if (breakoutRooms.length === 0) {
  //     return true
  //   }

  //   if (waiting && !generated) {
  //     const breakoutUrlData = getBreakoutRoomUrl(requestedBreakoutId);

  //     if (!breakoutUrlData) return false;
  //     if (breakoutUrlData.redirectToHtml5JoinURL !== ''
  //       && breakoutUrlData.redirectToHtml5JoinURL !== prevBreakoutData.redirectToHtml5JoinURL) {
  //       prevBreakoutData = breakoutUrlData;
  //       window.open(breakoutUrlData.redirectToHtml5JoinURL, '_blank');
  //       _.delay(() => setState({...state, generated: true, waiting: false }), 1000);
  //     }
  //   }

  //   if (joinedAudioOnly && (!isMicrophoneUser || isReconnecting)) {
  //     clearJoinedAudioOnly();
  //     setBreakoutAudioTransferStatus({
  //       breakoutMeetingId: '',
  //       status: AudioManager.BREAKOUT_AUDIO_TRANSFER_STATES.DISCONNECTED,
  //     });
  //   }
  //   return true;

  // },[])

  const getBreakoutLabel = (breakoutId) => {
    const { intl, getBreakoutRoomUrl } = props.breakout;
    const { requestedBreakoutId, generated } = state;

    const breakoutRoomUrlData = getBreakoutRoomUrl(breakoutId);

    if (generated && requestedBreakoutId === breakoutId) {
      return intl.formatMessage(intlMessages.breakoutJoin);
    }

    if (breakoutRoomUrlData) {
      return intl.formatMessage(intlMessages.breakoutJoin);
    }

    return intl.formatMessage(intlMessages.askToJoin);
  }

  const getBreakoutURL = (breakoutId) => {
    Session.set('lastBreakoutOpened', breakoutId);
    const { requestJoinURL, getBreakoutRoomUrl } = props.breakout;
    const { waiting } = state;
    const breakoutRoomUrlData = getBreakoutRoomUrl(breakoutId);
    console.log("url", breakoutRoomUrlData, breakoutId) //
    if (!breakoutRoomUrlData && !waiting) {
      setState(
        {
          ...state,
          waiting: true,
          generated: false,
          requestedBreakoutId: breakoutId,
        },
        () => requestJoinURL(breakoutId),
      );
    }

    if (breakoutRoomUrlData) {
      window.open(breakoutRoomUrlData.redirectToHtml5JoinURL, '_blank');
      setState({ ...state, waiting: false, generated: false });
    }
    return null;
  }

  const returnBackToMeeeting = (breakoutId) => {
    const { transferUserToMeeting, meetingId } = props.breakout;
    transferUserToMeeting(breakoutId, meetingId);
    setState({ ...state, joinedAudioOnly: false, breakoutId });
  }

  const transferUserToBreakoutRoom = (breakoutId) => {
    const { transferToBreakout } = props.breakout;
    transferToBreakout(breakoutId);
    setState({ ...state, joinedAudioOnly: true, breakoutId });
  }

  const renderUserActions = (breakoutId, joinedUsers, number) => {
    const {
      isMicrophoneUser,
      amIModerator,
      intl,
      isUserInBreakoutRoom,
      exitAudio,
      setBreakoutAudioTransferStatus,
      getBreakoutAudioTransferStatus,
    } = props.breakout;

    const {
      joinedAudioOnly,
      breakoutId: _stateBreakoutId,
      requestedBreakoutId,
      waiting,
      generated,
    } = state;

    const {
      breakoutMeetingId: currentAudioTransferBreakoutId,
      status,
    } = getBreakoutAudioTransferStatus();

    const isInBreakoutAudioTransfer = status
      === AudioManager.BREAKOUT_AUDIO_TRANSFER_STATES.CONNECTED;

    const stateBreakoutId = _stateBreakoutId || currentAudioTransferBreakoutId;
    const moderatorJoinedAudio = isMicrophoneUser && amIModerator;
    const disable = waiting && requestedBreakoutId !== breakoutId;
    const audioAction = joinedAudioOnly || isInBreakoutAudioTransfer
      ? () => {
        setBreakoutAudioTransferStatus({
          breakoutMeetingId: breakoutId,
          status: AudioManager.BREAKOUT_AUDIO_TRANSFER_STATES.RETURNING,
        });
        returnBackToMeeeting(breakoutId);
        return logger.debug({
          logCode: 'breakoutroom_return_main_audio',
          extraInfo: { logType: 'user_action' },
        }, 'Returning to main audio (breakout room audio closed)');
      }
      : () => {
        setBreakoutAudioTransferStatus({
          breakoutMeetingId: breakoutId,
          status: AudioManager.BREAKOUT_AUDIO_TRANSFER_STATES.CONNECTED,
        });
        transferUserToBreakoutRoom(breakoutId);
        return logger.debug({
          logCode: 'breakoutroom_join_audio_from_main_room',
          extraInfo: { logType: 'user_action' },
        }, 'joining breakout room audio (main room audio closed)');
      };
    return (
      <div className={styles.breakoutActions}>
        {
          isUserInBreakoutRoom(joinedUsers)
            ? (
              <span className={styles.alreadyConnected}>
                {intl.formatMessage(intlMessages.alreadyConnected)}
              </span>
            )
            : (
              <>
                {/* <Button
                data-test="breakoutJoin"
                aria-label={`${getBreakoutLabel(breakoutId)} ${props.breakout.breakoutRooms[number - 1]?.shortName}`}
                onClick={() => {
                  getBreakoutURL(breakoutId);
                  // leave main room's audio,
                  // and stops video and screenshare when joining a breakout room
                  exitAudio();
                  logger.debug({
                    logCode: 'breakoutroom_join',
                    extraInfo: { logType: 'user_action' },
                  }, 'joining breakout room closed audio in the main room');
                  VideoService.storeDeviceIds();
                  VideoService.exitVideo();
                  if (UserListService.amIPresenter()) screenshareHasEnded();
                }}
                disabled={disable}
                className={styles.PlusButton}
              >
                
              </Button> */}
                <Plus
                  data-test="breakoutJoin"
                  aria-label={`${getBreakoutLabel(breakoutId)} ${props.breakout.breakoutRooms[number - 1]?.shortName}`}
                  onClick={() => {
                    getBreakoutURL(breakoutId);
                    // leave main room's audio,
                    // and stops video and screenshare when joining a breakout room
                    exitAudio();
                    logger.debug({
                      logCode: 'breakoutroom_join',
                      extraInfo: { logType: 'user_action' },
                    }, 'joining breakout room closed audio in the main room');
                    VideoService.storeDeviceIds();
                    VideoService.exitVideo();
                    if (UserListService.amIPresenter()) screenshareHasEnded();
                  }}
                  disabled={disable}
                />
              </>
            )
        }
        {
          moderatorJoinedAudio
            ? [
              ('|'),
              (
                <Button
                  label={
                    stateBreakoutId === breakoutId
                      && (joinedAudioOnly || isInBreakoutAudioTransfer)
                      ? intl.formatMessage(intlMessages.breakoutReturnAudio)
                      : intl.formatMessage(intlMessages.breakoutJoinAudio)
                  }
                  className={styles.button}
                  disabled={stateBreakoutId !== breakoutId && joinedAudioOnly}
                  key={`join-audio-${breakoutId}`}
                  onClick={audioAction}
                />
              ),
            ]
            : null
        }
      </div>
    );
  }

  return (<div className={styles.RoomBox}>
    <div className={styles.alignAtcorners}>
      <div className={styles.RoomName}>Room {props.breakoutRoom.sequence}</div>
      <BreakoutRoomContainer
        messageDuration={intlMessages.breakoutDuration}
        breakoutRoom={props.breakout.breakoutRooms[0]}
      />

    </div>
    <div className={styles.alignAtcorners}>
      <div className={styles.ImageGroup}>
        {
          users.map((user) => {
            if (user.count <= 6) {
              // return <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
              return (
                <div className={styles.userRoom} ><span>{user.name.charAt(0)}</span></div>
              )
            }
          })
        }
        {
          props.breakoutRoom.joinedUsers > 6 ? <div className={styles.remaining}>+{props.breakoutRoom.joinedUsers.length - 6}</div> : null
        }

      </div>
      <div className={styles.PlusButton}>
        {state.waiting && state.requestedBreakoutId === props.breakoutRoom.breakoutId ? (
          <span>
            {props.breakout.intl.formatMessage(intlMessages.generatingURL)}
            <span className={styles.connectingAnimation} />
          </span>
        ) : renderUserActions(
          props.breakoutRoom.breakoutId,
          props.breakoutRoom.joinedUsers,
          props.breakoutRoom.sequence.toString(),
        )}
        {/* <Plus /> */}
      </div>
    </div>
  </div>);
}
export default injectIntl(Joinroom);