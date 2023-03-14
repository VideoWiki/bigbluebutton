import React, { PureComponent } from 'react';
import cx from 'classnames';
import Button from '/imports/ui/newui_components/button/component';
import CaptionsButtonContainer from '/imports/ui/components/actions-bar/captions/container';
import withShortcutHelper from '/imports/ui/components/shortcut-help/service';
import { styles } from './styles.scss';

import { withModalMounter } from '/imports/ui/components/modal/service';
import ActionsDropdown from './actions-dropdown/container';
import ScreenshareButtonContainer from '/imports/ui/newui_components/actions-bar-new/screenshare/container';
import AudioControlsContainer from '/imports/ui/newui_components/audio-new/audio-controls/container';
import JoinVideoOptionsContainer from '/imports/ui/newui_components/video-provider-new/video-button/container';
import PresentationOptionsContainer from './presentation-options/component';
import LeaveMeetingContainer from './modal/container'
import LeaveButton from "./leave-button/component"

import Handraise from './icon/Handraise';
import Leavecall from './icon/Leavecall';
import { makeCall } from '/imports/ui/services/api';

class ActionsBar extends PureComponent {

  constructor() {
    super();
    // Set the logout code to 680 because it's not a real code and can be matched on the other side
    this.LOGOUT_CODE = '680';
    this.leaveSession = this.leaveSession.bind(this);
  }

  leaveSession() {
    makeCall('userLeftMeeting');
    // we don't check askForFeedbackOnLogout here,
    // it is checked in meeting-ended component

    Session.set('codeError', this.LOGOUT_CODE);
  }

  render() {
    const {
      amIPresenter,
      amIModerator,
      enableVideo,
      isLayoutSwapped,
      toggleSwapLayout,
      handleTakePresenter,
      intl,
      isSharingVideo,
      hasScreenshare,
      stopExternalVideoShare,
      isCaptionsAvailable,
      isMeteorConnected,
      isPollingEnabled,
      isSelectRandomUserEnabled,
      isRaiseHandButtonEnabled,
      isPresentationDisabled,
      isThereCurrentPresentation,
      allowExternalVideo,
      setEmojiStatus,
      mountModal,
      currentUser,
      shortcuts,
      layoutContextDispatch,
      actionsBarStyle,
      isOldMinimizeButtonEnabled,
    } = this.props;

    return (
      <div
        className={styles.actionsbar}
        style={
          {
            height: actionsBarStyle.innerHeight,
          }
        }
      >
        <div className={styles.left}>
          {/* <ActionsDropdown {...{
            amIPresenter,
            amIModerator,
            isPollingEnabled,
            isSelectRandomUserEnabled,
            allowExternalVideo,
            handleTakePresenter,
            intl,
            isSharingVideo,
            stopExternalVideoShare,
            isMeteorConnected,
          }}/> */}
          {!isOldMinimizeButtonEnabled ||
            (isOldMinimizeButtonEnabled && isLayoutSwapped && !isPresentationDisabled)
            ? (
              <PresentationOptionsContainer
                isLayoutSwapped={isLayoutSwapped}
                toggleSwapLayout={toggleSwapLayout}
                layoutContextDispatch={layoutContextDispatch}
                hasPresentation={isThereCurrentPresentation}
                hasExternalVideo={isSharingVideo}
                hasScreenshare={hasScreenshare}
              />
            )
            : null}
          {isCaptionsAvailable
            ? (
              <CaptionsButtonContainer {...{ intl }} />
            )
            : null}
        </div>
        <div className={styles.center}>
          <AudioControlsContainer />
          {enableVideo
            ? (
              <JoinVideoOptionsContainer />
            )
            : null}
          {/* <LeaveButton/> */}
          <ScreenshareButtonContainer {...{
            amIPresenter,
            isMeteorConnected,
          }}
          />
        </div>
        <div className={styles.right}>
          {isRaiseHandButtonEnabled
            ? (
              <Button
                // icon="hand"
                customIcon={<Handraise />}
                label={intl.formatMessage({
                  id: `app.actionsBar.emojiMenu.${currentUser.emoji === 'raiseHand'
                    ? 'lowerHandLabel'
                    : 'raiseHandLabel'
                    }`,
                })}
                accessKey={shortcuts.raisehand}
                color={currentUser.emoji === 'raiseHand' ? 'primary' : 'default'}
                data-test={currentUser.emoji === 'raiseHand' ? 'lowerHandLabel' : 'raiseHandLabel'}
                ghost={currentUser.emoji !== 'raiseHand'}
                className={cx(currentUser.emoji === 'raiseHand' || styles.btn)}
                hideLabel
                circle
                size="lg"
                onClick={() => {
                  setEmojiStatus(
                    currentUser.userId,
                    currentUser.emoji === 'raiseHand' ? 'none' : 'raiseHand',
                  );
                }}
              />
            )
            : null}
        </div>
      </div>
    );
  }
}

export default withShortcutHelper(withModalMounter(ActionsBar), ['raiseHand']);
