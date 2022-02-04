import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import MyUserDropdown from "./user-dropdown/component"
// import UserDropdown from './user-dropdown/component';

const propTypes = {
  compact: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  getAvailableActions: PropTypes.func.isRequired,
  isThisMeetingLocked: PropTypes.bool.isRequired,
  normalizeEmojiName: PropTypes.func.isRequired,
  getScrollContainerRef: PropTypes.func.isRequired,
  toggleUserLock: PropTypes.func.isRequired,
  isMeteorConnected: PropTypes.bool.isRequired,
};

class MyUserListItem extends PureComponent {
  render() {
    const {
      user,
      assignPresenter,
      compact,
      currentUser,
      changeRole,
      getAvailableActions,
      getEmoji,
      getEmojiList,
      getGroupChatPrivate,
      getScrollContainerRef,
      intl,
      isThisMeetingLocked,
      lockSettingsProps,
      normalizeEmojiName,
      removeUser,
      setEmojiStatus,
      toggleVoice,
      hasPrivateChatBetweenUsers,
      toggleUserLock,
      requestUserInformation,
      userInBreakout,
      breakoutSequence,
      meetingIsBreakout,
      isMeteorConnected,
      isMe,
      usersProp,
      voiceUser,
      scrollArea,
      notify,
      raiseHandAudioAlert,
      raiseHandPushAlert,
      layoutContextDispatch,
      isRTL,
      ejectUserCameras,
    } = this.props;

    const contents = (
      <MyUserDropdown
        {...{
          assignPresenter,
          compact,
          changeRole,
          currentUser,
          getAvailableActions,
          getEmoji,
          getEmojiList,
          getGroupChatPrivate,
          getScrollContainerRef,
          intl,
          isThisMeetingLocked,
          lockSettingsProps,
          normalizeEmojiName,
          removeUser,
          setEmojiStatus,
          toggleVoice,
          user,
          hasPrivateChatBetweenUsers,
          toggleUserLock,
          requestUserInformation,
          userInBreakout,
          breakoutSequence,
          meetingIsBreakout,
          isMeteorConnected,
          isMe,
          usersProp,
          voiceUser,
          scrollArea,
          notify,
          raiseHandAudioAlert,
          raiseHandPushAlert,
          layoutContextDispatch,
          isRTL,
          ejectUserCameras,
        }}
      />
    );
        return contents;
    // return <div></div>;
  }
}

MyUserListItem.propTypes = propTypes;

export default injectIntl(MyUserListItem);
