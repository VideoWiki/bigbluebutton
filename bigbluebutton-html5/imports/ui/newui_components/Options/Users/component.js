import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import injectWbResizeEvent from '/imports/ui/components/presentation/resize-wrapper/component';
import MyUserContentContainer from './user-list-content/container';

const propTypes = {
  compact: PropTypes.bool,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  isPublicChat: PropTypes.func.isRequired,
  setEmojiStatus: PropTypes.func.isRequired,
  clearAllEmojiStatus: PropTypes.func.isRequired,
  roving: PropTypes.func.isRequired,
  requestUserInformation: PropTypes.func.isRequired,
};

const defaultProps = {
  compact: false,
};

class MyUserList extends PureComponent {
  render() {
    const {
      intl,
      compact,
      setEmojiStatus,
      clearAllEmojiStatus,
      isPublicChat,
      roving,
      hasBreakoutRoom,
      requestUserInformation,
    } = this.props;
    return (
      <div>
        <MyUserContentContainer
        {...{
            intl,
            compact,
            setEmojiStatus,
            clearAllEmojiStatus,
            isPublicChat,
            roving,
            hasBreakoutRoom,
            requestUserInformation,
          }
          }
          />
      </div>
    );
  }
}

MyUserList.propTypes = propTypes;
MyUserList.defaultProps = defaultProps;

export default injectWbResizeEvent(injectIntl(MyUserList));
