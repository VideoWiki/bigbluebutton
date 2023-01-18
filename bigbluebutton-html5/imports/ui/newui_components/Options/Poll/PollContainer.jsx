import React, { useState, useContext } from 'react'
import CreatePoll from './createpoll/CreatePoll';
import { defineMessages, injectIntl } from 'react-intl';

import { makeCall } from '/imports/ui/services/api';
import { withTracker } from 'meteor/react-meteor-data';
import Presentations from '/imports/api/presentations';
import PresentationService from '/imports/ui/components/presentation/service';
import { Session } from 'meteor/session';
import Service from './service';
import Auth from '/imports/ui/services/auth';
import { UsersContext } from '/imports/ui/components/components-data/users-context/context';
import LayoutContext from '/imports/ui/components/layout/context';
import PollingComponent from './polling/container'
import PollResult from './pollresult/container.jsx'
import { styles } from './styles.scss'

const CHAT_CONFIG = Meteor.settings.public.chat;
const PUBLIC_CHAT_KEY = CHAT_CONFIG.public_id;

const intlMessages = defineMessages({
  selectPresentationLabel: {
    id: 'app.poll.selectPresentationLabel',
    description: 'aria-label for selecting presentation',
  },
  noPresentationLabel: {
    id: 'app.poll.noPresentationLabel',
    description: 'aria-label for no presentation',
  }
});

function PollContainer(props) {

  const [formlevel, setFormlevel] = useState(1);
  const layoutContext = useContext(LayoutContext);
  const { layoutContextDispatch } = layoutContext;
  const usingUsersContext = useContext(UsersContext);
  const { users } = usingUsersContext;
  const { intl } = props
  const usernames = {};

  Object.values(users[Auth.meetingID]).forEach((user) => {
    usernames[user.userId] = { userId: user.userId, name: user.name, avatar: user.avatar };
  });

  return (
    <div className={styles.pollContainer}>
      {
        props.currentSlide ? <>
          {formlevel === 1 && Service.amIPresenter() && <CreatePoll  {...{ layoutContextDispatch, ...props }} setFormlevel={setFormlevel} usernames={usernames} />}
          {/* <PollingComponent /> */}
          {!props.amIPresenter && <PollResult />}
        </> :
          Service.amIPresenter() ?
            <div className={styles.pollContainerError}><h3>{intl.formatMessage(intlMessages.selectPresentationLabel)}</h3></div> :
            <div className={styles.pollContainerError}><h3>{intl.formatMessage(intlMessages.noPresentationLabel)}</h3></div>
      }
    </div>
  )
}

export default injectIntl(withTracker(({ intl }) => {
  const isPollSecret = Session.get('secretPoll') || false;
  Meteor.subscribe('current-poll', isPollSecret);

  const currentPresentation = Presentations.findOne({
    current: true,
  }, { fields: { podId: 1 } }) || {};

  const currentSlide = PresentationService.getCurrentSlide(currentPresentation.podId);

  const pollId = currentSlide ? currentSlide.id : PUBLIC_CHAT_KEY;

  const { pollTypes } = Service;

  const startPoll = (type, secretPoll, question = '') => makeCall('startPoll', pollTypes, type, pollId, secretPoll, question);

  const startCustomPoll = (type, secretPoll, question = '', answers) => makeCall('startPoll', pollTypes, type, pollId, secretPoll, question, answers);

  const stopPoll = () => makeCall('stopPoll');

  return {
    currentSlide,
    amIPresenter: Service.amIPresenter(),
    pollTypes,
    startPoll,
    startCustomPoll,
    stopPoll,
    intl,
    publishPoll: Service.publishPoll,
    currentPoll: Service.currentPoll(),
    isDefaultPoll: Service.isDefaultPoll,
    checkPollType: Service.checkPollType,
    resetPollPanel: Session.get('resetPollPanel') || false,
    pollAnswerIds: Service.pollAnswerIds,
    isMeteorConnected: Meteor.status().connected,
  };
})(PollContainer));