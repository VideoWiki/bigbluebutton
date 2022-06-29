import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { styles } from './styles';
import MyUserParticipantsContainer from './user-participants/container';

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

class MyUserContent extends PureComponent {
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
      requestUserInformation,
      currentClosedChats,
      sidebarContentPanel,
      layoutContextDispatch,
      startedChats,
    } = this.props;

    return (
      <div
        data-test="userListContent"
        className={styles.userSidebar}
        // className={styles.content}
      >
        <MyUserParticipantsContainer
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
      </div>
    );
  }
}

MyUserContent.propTypes = propTypes;
MyUserContent.defaultProps = defaultProps;

export default MyUserContent;
