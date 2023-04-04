import React, { useState } from 'react'

import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { withModalMounter } from '/imports/ui/components/modal/service';
import _ from 'lodash';
import { Session } from 'meteor/session';
import TrashIcon from '../icons/TrashIcon'
import { alertScreenReader } from '/imports/utils/dom-utils';
import cx from 'classnames';
import Button from '/imports/ui/components/button/component';
import Toggle from '/imports/ui/components/switch/component';

import { styles } from '../styles.scss'
// import LivePoll from '../livepoll/LivePoll';
import LiveResult from '../livepoll/component'

const intlMessages = defineMessages({
  pollPaneTitle: {
    id: 'app.poll.pollPaneTitle',
    description: 'heading label for the poll menu',
  },
  closeLabel: {
    id: 'app.poll.closeLabel',
    description: 'label for poll pane close button',
  },
  hidePollDesc: {
    id: 'app.poll.hidePollDesc',
    description: 'aria label description for hide poll button',
  },
  quickPollInstruction: {
    id: 'app.poll.quickPollInstruction',
    description: 'instructions for using pre configured polls',
  },
  activePollInstruction: {
    id: 'app.poll.activePollInstruction',
    description: 'instructions displayed when a poll is active',
  },
  dragDropPollInstruction: {
    id: 'app.poll.dragDropPollInstruction',
    description: 'instructions for upload poll options via drag and drop',
  },
  ariaInputCount: {
    id: 'app.poll.ariaInputCount',
    description: 'aria label for custom poll input field',
  },
  customPlaceholder: {
    id: 'app.poll.customPlaceholder',
    description: 'custom poll input field placeholder text',
  },
  noPresentationSelected: {
    id: 'app.poll.noPresentationSelected',
    description: 'no presentation label',
  },
  clickHereToSelect: {
    id: 'app.poll.clickHereToSelect',
    description: 'open uploader modal button label',
  },
  questionErr: {
    id: 'app.poll.questionErr',
    description: 'question text area error label',
  },
  optionErr: {
    id: 'app.poll.optionErr',
    description: 'poll input error label',
  },
  tf: {
    id: 'app.poll.tf',
    description: 'label for true / false poll',
  },
  a4: {
    id: 'app.poll.a4',
    description: 'label for A / B / C / D poll',
  },
  delete: {
    id: 'app.poll.optionDelete.label',
    description: '',
  },
  questionLabel: {
    id: 'app.poll.question.label',
    description: '',
  },
  optionalQuestionLabel: {
    id: 'app.poll.optionalQuestion.label',
    description: '',
  },
  userResponse: {
    id: 'app.poll.userResponse.label',
    description: '',
  },
  responseChoices: {
    id: 'app.poll.responseChoices.label',
    description: '',
  },
  typedResponseDesc: {
    id: 'app.poll.typedResponse.desc',
    description: '',
  },
  responseTypesLabel: {
    id: 'app.poll.responseTypes.label',
    description: '',
  },
  addOptionLabel: {
    id: 'app.poll.addItem.label',
    description: '',
  },
  startPollLabel: {
    id: 'app.poll.start.label',
    description: '',
  },
  secretPollLabel: {
    id: 'app.poll.secretPoll.label',
    description: '',
  },
  isSecretPollLabel: {
    id: 'app.poll.secretPoll.isSecretLabel',
    description: '',
  },
  true: {
    id: 'app.poll.answer.true',
    description: '',
  },
  false: {
    id: 'app.poll.answer.false',
    description: '',
  },
  a: {
    id: 'app.poll.answer.a',
    description: '',
  },
  b: {
    id: 'app.poll.answer.b',
    description: '',
  },
  c: {
    id: 'app.poll.answer.c',
    description: '',
  },
  d: {
    id: 'app.poll.answer.d',
    description: '',
  },
  yna: {
    id: 'app.poll.yna',
    description: '',
  },
  yes: {
    id: 'app.poll.y',
    description: '',
  },
  no: {
    id: 'app.poll.n',
    description: '',
  },
  abstention: {
    id: 'app.poll.abstention',
    description: '',
  },
  startPollDesc: {
    id: 'app.poll.startPollDesc',
    description: '',
  },
  showRespDesc: {
    id: 'app.poll.showRespDesc',
    description: '',
  },
  addRespDesc: {
    id: 'app.poll.addRespDesc',
    description: '',
  },
  deleteRespDesc: {
    id: 'app.poll.deleteRespDesc',
    description: '',
  },
  on: {
    id: 'app.switch.onLabel',
    description: 'label for toggle switch on state',
  },
  off: {
    id: 'app.switch.offLabel',
    description: 'label for toggle switch off state',
  },
  removePollOpt: {
    id: 'app.poll.removePollOpt',
    description: 'screen reader alert for removed poll option',
  },
  emptyPollOpt: {
    id: 'app.poll.emptyPollOpt',
    description: 'screen reader for blank poll option',
  },

  createpollTitle: {
    id: 'app.poll.pollTitleLabel',
    description: 'create poll title',
  },
  askquesLabel: {
    id: 'app.poll.askquesLabel',
    description: 'Ask Question Label',
  },
  quesplaceholderLabel: {
    id: 'app.poll.quesplaceholderLabel',
    description: 'question placeholder label',
  },
  choiceLabel: {
    id: 'app.poll.choiceLabel',
    description: 'Choice Label',
  },
  pollFieldIsEmpty: {
    id: 'app.poll.pollFieldIsEmpty',
    description: 'Invalid Fields Label',
  }
});

function CreatePoll(props) {

  const POLL_SETTINGS = Meteor.settings.public.poll;

  const MAX_CUSTOM_FIELDS = POLL_SETTINGS.maxCustom;
  const MAX_INPUT_CHARS = POLL_SETTINGS.maxTypedAnswerLength;
  const QUESTION_MAX_INPUT_CHARS = 400;
  const FILE_DRAG_AND_DROP_ENABLED = POLL_SETTINGS.allowDragAndDropFile;

  const [state, setState] = useState({
    isPolling: false,
    question: '',
    optList: [{ val: "" }, { val: "" }],
    error: null,
    secretPoll: false,
    type: "A-",
    hasFieldError: false
  })

  const validateInput = (i) => {
    let _input = i;
    if (/^\s/.test(_input)) _input = '';
    return _input;
  };

  const handleTextareaChange = (e) => {
    const { type, error } = state;
    const { pollTypes } = props;
    const validatedQuestion = validateInput(e.target.value);
    const clearError = validatedQuestion.length > 0 && type === pollTypes.Response;
    setState({ ...state, question: validateInput(e.target.value), error: clearError ? null : error });
  }

  const handleInputChange = (e, index) => {
    const { optList, type, error } = state;
    const { pollTypes } = props;
    const list = [...optList];
    const validatedVal = validateInput(e.target.value).replace(/\s{2,}/g, ' ');
    const clearError = validatedVal.length > 0 && type !== pollTypes.Response;
    list[index] = { val: validatedVal };
    setState({ ...state, optList: list, error: clearError ? null : error });
  }

  const handleAddOption = () => {
    const { optList } = state;
    setState({ ...state, optList: [...optList, { val: '' }] });
  }

  const handleRemoveOption = (index) => {
    const { intl } = props;
    const { optList } = state;
    const list = [...optList];
    const removed = list[index];
    list.splice(index, 1);
    setState({ ...state, optList: list });
    alertScreenReader(`${intl.formatMessage(intlMessages.removePollOpt,
      { 0: removed.val || intl.formatMessage(intlMessages.emptyPollOpt) })}`);
  }

  const fieldsIsValid = () => {
    const {
      type, secretPoll, optList, question, error
    } = state;

    if (question.length == 0) {
      setState({ ...state, hasFieldError: true })
      return false;
    } else {
      setState({ ...state, hasFieldError: false })
    }

    for (let i = 0; i < optList.length; i++) {
      if (optList[i].val.length == 0) {
        setState({ ...state, hasFieldError: true })
        return false;
      } else {
        setState({ ...state, hasFieldError: false })
      }
    }
    return true;
  }

  const handleCreatePoll = () => {
    const {
      type, secretPoll, optList, question, error,
    } = state;
    const {
      startPoll,
      startCustomPoll,
      intl,
      pollTypes,
      isDefaultPoll,
      checkPollType,
      smallSidebar,
      setFormlevel
    } = props;

    if (fieldsIsValid()) {
      setState({ ...state, isPolling: state.isPolling })
      setState({ ...state, hasFieldError: !state.hasFieldError })

      const verifiedPollType = checkPollType(
        type,
        optList,
        intl.formatMessage(intlMessages.yes),
        intl.formatMessage(intlMessages.no),
        intl.formatMessage(intlMessages.abstention),
        intl.formatMessage(intlMessages.true),
        intl.formatMessage(intlMessages.false),
      );
      const verifiedOptions = optList.map((o) => {
        if (o.val.length > 0) return o.val;
        return null;
      });
      if (verifiedPollType === pollTypes.Custom) {
        startCustomPoll(
          verifiedPollType,
          secretPoll,
          question,
          _.compact(verifiedOptions),
        );
      } else {
        startPoll(verifiedPollType, secretPoll, question);
      }
    }
  }

  const renderPollOptions = () => {
    const { intl } = props;
    const { isQuesValid, isOptionsValid, optList, question } = state;

    return (
      <div className="createClass">
        <div className={styles.pollTitleDiv}>
          <h3 className={styles.createPollTitle}>{intl.formatMessage(intlMessages.createpollTitle)}</h3>
        </div>
        <div className={styles.createClassWrapper}>
          <div className={styles.createBox}>
            <h3>{intl.formatMessage(intlMessages.askquesLabel)}</h3>
            <input className={styles.quesInput} onChange={handleTextareaChange} type="text" placeholder={intl.formatMessage(intlMessages.quesplaceholderLabel)} value={question} />
            {
              optList.map((obj, pos) => {
                return <div className={styles.addChoiceTab}>
                  <input className={styles.choiceInp} onChange={(e) => handleInputChange(e, pos)} type="text" placeholder={`${intl.formatMessage(intlMessages.choiceLabel)} ${pos + 1}`} value={obj.val} />
                  {pos > 1 &&
                    <button className={styles.removeButton} onClick={() => handleRemoveOption(pos)}><TrashIcon /></button>}
                </div>
              })
            }
            <button disabled={optList.length == MAX_CUSTOM_FIELDS} className={styles.addItemButton} onClick={handleAddOption}>+ Add Item</button>
            <button className={styles.createButton}
              onClick={handleCreatePoll}
            >{intl.formatMessage(intlMessages.createpollTitle)}</button>
            {state.hasFieldError
              && (
                <p className={styles.withError}>
                  {intl.formatMessage(intlMessages.pollFieldIsEmpty)}
                </p>
              )}
          </div>
        </div>
      </div>
    )
  }

  const handleBackClick = () => {
    const { stopPoll } = props;
    setState({
      ...state,
      isPolling: false,
      error: null,
    });
    stopPoll();
    Session.set('resetPollPanel', false);
    document.activeElement.blur();
  }

  const renderActivePollOptions = () => {
    const {
      intl,
      isMeteorConnected,
      stopPoll,
      currentPoll,
      pollAnswerIds,
      usernames,
      isDefaultPoll,
    } = props;

    return (
      <LiveResult {...{
        isMeteorConnected,
        stopPoll,
        currentPoll,
        pollAnswerIds,
        usernames,
        isDefaultPoll,
      }}
        handleBackClick={handleBackClick}
      />
    )
  }

  const renderPollPanel = () => {
    const { isPolling } = state;
    const {
      currentPoll,
      currentSlide,
    } = props;

    // if (!currentSlide) return this.renderNoSlidePanel();

    if (isPolling || currentPoll) {
      return renderActivePollOptions();
    }

    return renderPollOptions();
  }

  return (
    <>
      {
        renderPollPanel()
      }
    </>
  )
}

export default withModalMounter(injectIntl(CreatePoll));

CreatePoll.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  amIPresenter: PropTypes.bool.isRequired,
  pollTypes: PropTypes.instanceOf(Object).isRequired,
  startPoll: PropTypes.func.isRequired,
  startCustomPoll: PropTypes.func.isRequired,
  stopPoll: PropTypes.func.isRequired,
};