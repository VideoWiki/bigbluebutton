import React, { PureComponent } from 'react';
import { FormattedTime, defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Modal from '/imports/ui/newui_components/modal/simple/component';
import { styles } from './styles.scss';

const propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    closeModal: PropTypes.func.isRequired,
    meetingTitle: PropTypes.string.isRequired,
  };

function LeaveMeetingComponent(props) {

  const intlMessages = defineMessages({
    leaveMeetingTitle: {
      id: 'app.leaveMeeting.title',
      description: 'leave meeting title',
    },
    leaveMeetingDescription: {
      id: 'app.leaveMeeting.description',
      description: 'leave meeting description',
    },
    yesLabel: {
      id: 'app.endMeeting.yesLabel',
      description: 'label for yes button for end meeting',
    },
    noLabel: {
      id: 'app.endMeeting.noLabel',
      description: 'label for no button for end meeting',
    },
  });

  const { closeModal, leaveSession, meetingTitle, intl } = props;

  return (
    <Modal
      // overlayClassName={styles.overlay}
      // className={styles.modal}
      onRequestClose={() => closeModal()}
      hideBorder
      // contentLabel={intl.formatMessage(intlMessages.ariaTitle)}
      title={intl.formatMessage(intlMessages.leaveMeetingTitle, { 0: meetingTitle })}
    >
      <div className={styles.leaveWrapper}>
        <p>{intl.formatMessage(intlMessages.leaveMeetingDescription)}</p>
        <div className={styles.leaveButtons}>
          <button onClick={() => leaveSession()} className={styles.yesLeaveButton}>{intl.formatMessage(intlMessages.yesLabel)}</button>
          <button onClick={() => closeModal()} className={styles.noLeaveButton}>{intl.formatMessage(intlMessages.noLabel)}</button>
        </div>
      </div>
    </Modal >
  )
}

LeaveMeetingComponent.propTypes = propTypes;

export default injectIntl(LeaveMeetingComponent);