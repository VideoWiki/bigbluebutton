import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Styled from './styles';
import UserParticipantsContainer from './user-participants/container';
import UserMessages from './user-messages/container';
import UserNotesContainer from './user-notes/container';
import UserCaptionsContainer from './user-captions/container';
import WaitingUsers from './waiting-users/component';
import UserPolls from './user-polls/component';
import BreakoutRoomItem from './breakout-room/component';

const propTypes = {
  compact: PropTypes.bool,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  isPublicChat: PropTypes.func.isRequired,
  setEmojiStatus: PropTypes.func.isRequired,
  clearAllEmojiStatus: PropTypes.func.isRequired,
  roving: PropTypes.func.isRequired,
  pollIsOpen: PropTypes.bool.isRequired,
  forcePollOpen: PropTypes.bool.isRequired,
  requestUserInformation: PropTypes.func.isRequired,
};

const defaultProps = {
  compact: false,
};
const CHAT_ENABLED = Meteor.settings.public.chat.enabled;
const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

class UserContent extends PureComponent {
  render() {
    const {
      compact,
      intl,
      currentUser,
      setEmojiStatus,
      clearAllEmojiStatus,
      roving,
      isPublicChat,
      pollIsOpen,
      forcePollOpen,
      hasBreakoutRoom,
      pendingUsers,
      isWaitingRoomEnabled,
      isGuestLobbyMessageEnabled,
      requestUserInformation,
      currentClosedChats,
      sidebarContentPanel,
      layoutContextDispatch,
      startedChats,
    } = this.props;

    const showWaitingRoom = (isGuestLobbyMessageEnabled && isWaitingRoomEnabled)
      || pendingUsers.length > 0;

    return (
      <Styled.Content data-test="userListContent">
        {CHAT_ENABLED
          ? (
            <UserMessages
              {...{
                isPublicChat,
                compact,
                intl,
                roving,
                currentClosedChats,
                startedChats,
              }}
            />
          ) : null}
        {currentUser.role === ROLE_MODERATOR
          ? (
            <UserCaptionsContainer
              {...{
                intl,
              }}
            />
          ) : null}
        <UserNotesContainer
          {...{
            intl,
          }}
        />
        {showWaitingRoom && currentUser.role === ROLE_MODERATOR
          ? (
            <WaitingUsers
              {...{
                intl,
                pendingUsers,
                sidebarContentPanel,
                layoutContextDispatch,
              }}
            />
          ) : null}
        <UserPolls
          isPresenter={currentUser.presenter}
          {...{
            pollIsOpen,
            forcePollOpen,
            sidebarContentPanel,
            layoutContextDispatch,
          }}
        />
        <BreakoutRoomItem
          isPresenter={currentUser.presenter}
          {...{
            hasBreakoutRoom,
            sidebarContentPanel,
            layoutContextDispatch,
          }}
        />
        <UserParticipantsContainer
          {...{
            compact,
            intl,
            currentUser,
            setEmojiStatus,
            clearAllEmojiStatus,
            roving,
            requestUserInformation,
          }}
        />
      </Styled.Content>
    );
  }
}

UserContent.propTypes = propTypes;
UserContent.defaultProps = defaultProps;

export default UserContent;
