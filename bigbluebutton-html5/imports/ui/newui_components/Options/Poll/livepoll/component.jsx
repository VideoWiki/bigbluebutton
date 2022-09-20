import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import Button from '/imports/ui/components/button/component';
import caseInsensitiveReducer from '/imports/utils/caseInsensitiveReducer';
import { Session } from 'meteor/session';
import { styles } from '../styles';
import Service from './service';

const intlMessages = defineMessages({
  usersTitle: {
    id: 'app.poll.liveResult.usersTitle',
    description: 'heading label for poll users',
  },
  responsesTitle: {
    id: 'app.poll.liveResult.responsesTitle',
    description: 'heading label for poll responses',
  },
  publishLabel: {
    id: 'app.poll.publishLabel',
    description: 'label for the publish button',
  },
  cancelPollLabel: {
    id: 'app.poll.cancelPollLabel',
    description: 'label for cancel poll button',
  },
  backLabel: {
    id: 'app.poll.backLabel',
    description: 'label for the return to poll options button',
  },
  doneLabel: {
    id: 'app.createBreakoutRoom.doneLabel',
    description: 'label shown when all users have responded',
  },
  waitingLabel: {
    id: 'app.poll.waitingLabel',
    description: 'label shown while waiting for responses',
  },
  secretPollLabel: {
    id: 'app.poll.liveResult.secretLabel',
    description: 'label shown instead of users in poll responses if poll is secret',
  },

  pollingTitleLabel: {
    id: 'app.poll.pollingTitleLabel',
    description: 'Polling Title Label'
  },
  pollrestartLabel: {
    id: 'app.poll.pollrestartLabel',
    description: 'Restart Poll Label'
  }
});

const getResponseString = (obj) => {
  const { children } = obj.props;
  if (typeof children !== 'string') {
    return getResponseString(children[1]);
  }

  return children;
};

class LiveResult extends PureComponent {
  static getDerivedStateFromProps(nextProps) {
    const {
      currentPoll, intl, pollAnswerIds, usernames, isDefaultPoll,
    } = nextProps;

    const keys = [{ option: "A", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "B", color: "#44CC88", bgColor: "#44cc881a" }, { option: "C", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "D", color: "#44CC88", bgColor: "#44cc881a" }, { option: "E", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "F", color: "#44CC88", bgColor: "#44cc881a" }, { option: "G", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "H", color: "#44CC88", bgColor: "#44cc881a" }, { option: "", color: "", bgColor: "" }]
    if (!currentPoll) return null;

    const {
      answers, responses, users, numResponders, pollType
    } = currentPoll;
    const defaultPoll = isDefaultPoll(pollType);

    const currentPollQuestion = (currentPoll.question) ? currentPoll.question : '';

    let userAnswers = responses
      ? [...users, ...responses.map(u => u.userId)]
      : [...users];
    const answerList = [];
    userAnswers = userAnswers.map(id => usernames[id])
      .map((user) => {
        let answer = '';
        let opt = keys.length-1;
        if (responses) {
          const response = responses.find(r => r.userId === user.userId);
          if (response) {
            answer = answers[response.answerId].key;
            opt = answers[response.answerId].id;
          }
        }
        answerList.push({
          bgColor: keys[opt].bgColor,
          option: keys[opt].option,
          color: keys[opt].color,
          name: user.name,
          avatar: user.avatar,
          answer,
        })
        return {
          bgColor: keys[opt].bgColor,
          option: keys[answer.id],
          name: user.name,
          avatar: user.avatar,
          answer,
        };
      })
      .sort(Service.sortUsers)
      .reduce((acc, user) => {
        const formattedMessageIndex = user.answer.toLowerCase();
        return ([
          ...acc,
          (
            <tr key={_.uniqueId('stats-')}>
              <td className={styles.resultLeft}>{user.name}</td>
              <td data-test="receivedAnswer" className={styles.resultRight}>
                {
                  defaultPoll && pollAnswerIds[formattedMessageIndex]
                    ? intl.formatMessage(pollAnswerIds[formattedMessageIndex])
                    : user.answer
                }
              </td>
            </tr>
          ),
        ]);

      }, []);
    const pollStats = [];

    let maxKey = 0;
    let max = 0;
    answers.reduce(caseInsensitiveReducer, []).map((obj) => {
      if (obj.numVotes > max) {
        max = obj.numVotes;
        maxKey = obj.key;
      }
    })
    answers.reduce(caseInsensitiveReducer, []).map((obj) => {
      const formattedMessageIndex = obj.key.toLowerCase();
      const pct = Math.round(obj.numVotes / numResponders * 100);
      // const percent = Number.isNaN(pct) ? 0 : pct;
      const pctFotmatted = `${Number.isNaN(pct) ? 0 : pct}%`;

      // const calculatedWidth = {
      //   width: pctFotmatted,
      //   backgroundColor: keys[obj.id].bgColor
      // };
      const calculatedWidth = {
        width: pctFotmatted,
        backgroundColor: (obj.key === maxKey ? "#44CC881A" : "#7966fa1a")
      };
      const boxStyle = {
        border: `1px solid ${(obj.key === maxKey ? '#44CC88' : '#7966FA')}`
      };
      const backgroundStyle = {
        backgroundColor: (obj.key === maxKey ? "#44CC88" : "#7966FA")
      }
      const textStyle = {
        color: (obj.key === maxKey ? "#44CC88" : "#7966FA")
      }
      // const boxStyle = {
      //   border: `1px solid ${keys[obj.id].color}`
      // };
      // const backgroundStyle = {
      //   backgroundColor: keys[obj.id].color
      // }
      // const textStyle = {
      //   color: keys[obj.id].color
      // }

      return pollStats.push(
        // <div className={styles.main} key={_.uniqueId('stats-')}>
        //   <div className={styles.left}>
        //     {
        //       defaultPoll && pollAnswerIds[formattedMessageIndex]
        //         ? intl.formatMessage(pollAnswerIds[formattedMessageIndex])
        //         : obj.key
        //     }
        //   </div>
        //   <div className={styles.center}>
        //     <div className={styles.barShade} style={calculatedWidth} />
        //     <div className={styles.barVal}>{obj.numVotes || 0}</div>
        //   </div>
        //   <div className={styles.right}>
        //     {pctFotmatted}
        //   </div>
        // </div>,
        <div className={styles.pollBar} style={boxStyle} key={_.uniqueId('stats-')}>
          <div className={styles.pollLayer} style={calculatedWidth}></div>
          <div className={styles.pollContent}>
            <div className={styles.pollInline}>
              <div style={backgroundStyle} className={styles.barOption}>
                {keys[obj.id].option}
              </div>
              <span style={textStyle}>
                {
                  defaultPoll && pollAnswerIds[formattedMessageIndex]
                    ? intl.formatMessage(pollAnswerIds[formattedMessageIndex])
                    : obj.key
                }
              </span>
            </div>
            <span style={textStyle}>{pctFotmatted}</span>
          </div>
        </div>,
      );
    });

    return {
      answerList,
      userAnswers,
      pollStats,
      currentPollQuestion,
      maxKey,
    };
  }


  constructor(props) {
    super(props);

    this.state = {
      userAnswers: null,
      pollStats: null,
      currentPollQuestion: null,
      answerList: null,
      maxKey: null,
    };
  }



  render() {
    const {
      isMeteorConnected,
      intl,
      stopPoll,
      handleBackClick,
      currentPoll,
    } = this.props;

    const { userAnswers, pollStats, currentPollQuestion, answerList, maxKey } = this.state;

    let waiting;
    let userCount = 0;
    let respondedCount = 0;

    if (userAnswers) {

      userCount = userAnswers.length;
      userAnswers.map((user) => {
        const response = getResponseString(user);
        if (response === '') return user;
        respondedCount += 1;
        return user;
      });

      waiting = respondedCount !== userAnswers.length && currentPoll;
    }
    console.log("answerList", answerList, maxKey)
    return (
      <div>
        <div className={styles.createClassWrapper}>
          <h1>{intl.formatMessage(intlMessages.pollingTitleLabel)}</h1>
          <div className={styles.createBox}>
            {
              currentPollQuestion ? <h3>{currentPollQuestion}</h3> : null
            }
            {pollStats}

            {currentPoll && currentPoll.answers.length >= 0
              ? (
                <div className={styles.liveBtnDiv}>
                  <button
                    className={styles.liveFormBttn}
                    disabled={!isMeteorConnected}
                    onClick={() => {
                      Session.set('pollInitiated', false);
                      Service.publishPoll();
                      stopPoll();
                    }}
                    data-test="publishPollingLabel"
                  >
                    {intl.formatMessage(intlMessages.publishLabel)}
                  </button>

                  <button
                    className={styles.liveFormBttn}
                    disabled={!isMeteorConnected}
                    onClick={() => {
                      Session.set('pollInitiated', false);
                      Session.set('resetPollPanel', true);
                      stopPoll();
                    }}
                    data-test="cancelPollLabel">
                    {intl.formatMessage(intlMessages.cancelPollLabel)}
                  </button>
                </div>
              ) : (
                <button
                  disabled={!isMeteorConnected}
                  onClick={() => {
                    handleBackClick();
                  }}
                  label={intl.formatMessage(intlMessages.backLabel)}
                  color="primary"
                  data-test="restartPoll"
                  className={styles.createButton}>
                  {intl.formatMessage(intlMessages.pollrestartLabel)}
                </button>
              )
            }

          </div>
        </div>
        {/* <div className={styles.stats}>
          {currentPollQuestion ? <span className={styles.title}>{currentPollQuestion}</span> : null}
          <div className={styles.status}>
            {waiting
              ? (
                <span>
                  {`${intl.formatMessage(intlMessages.waitingLabel, {
                    0: respondedCount,
                    1: userCount,
                  })} `}
                </span>
              )
              : <span>{intl.formatMessage(intlMessages.doneLabel)}</span>}
            {waiting
              ? <span className={styles.connectingAnimation} /> : null}
          </div>
          {pollStats}
        </div>
        {currentPoll && currentPoll.answers.length >= 0
          ? (
            <div className={styles.buttonsActions}>
              <Button
                disabled={!isMeteorConnected}
                onClick={() => {
                  Session.set('pollInitiated', false);
                  Service.publishPoll();
                  stopPoll();
                }}
                label={intl.formatMessage(intlMessages.publishLabel)}
                data-test="publishPollingLabel"
                color="primary"
                className={styles.publishBtn}
              />
              <Button
                disabled={!isMeteorConnected}
                onClick={() => {
                  Session.set('pollInitiated', false);
                  Session.set('resetPollPanel', true);
                  stopPoll();
                }}
                label={intl.formatMessage(intlMessages.cancelPollLabel)}
                data-test="cancelPollLabel"
                className={styles.cancelBtn}
              />
            </div>
          ) : (
            <Button
              disabled={!isMeteorConnected}
              onClick={() => {
                handleBackClick();
              }}
              label={intl.formatMessage(intlMessages.backLabel)}
              color="primary"
              data-test="restartPoll"
              className={styles.btn}
            />
          )
        } */}
        <div className={styles.separator} />
        {currentPoll && !currentPoll.secretPoll
          ? (
            // <table className={styles.liveResTable}>
            //   <tbody>
            //     <tr>
            //       <th className={styles.theading}>{intl.formatMessage(intlMessages.usersTitle)}</th>
            //       <th className={styles.theading}>{intl.formatMessage(intlMessages.responsesTitle)}</th>
            //     </tr>
            //     {/* {userAnswers} */}
            //     {

            //     }
            //   </tbody>
            // </table>
            <div className={styles.userResponse}>
              {
                answerList.map((obj) => {
                  return (
                    <div className={styles.ansBox}>
                      <div className={styles.ansBoxLeft}>
                        {
                          obj.avatar ? <img></img> : <div className={styles.ansBoxAvatar}>{obj.name.charAt(0).toUpperCase()}</div>
                        }
                        <span className={styles.ansBoxName}>{obj.name}</span>
                      </div>
                      <div className={styles.ansBoxOption} style={obj.answer === maxKey ? { color: "#44CC88", backgroundColor: "#44CC881A" } : { color: "#7966FA", backgroundColor: "#7966FA1A" }}>{obj.option}</div>

                    </div>
                  )
                })
              }
            </div>
          ) : (
            currentPoll ? (<div>{intl.formatMessage(intlMessages.secretPollLabel)}</div>) : null
          )}
      </div>
    );
  }
}

export default injectIntl(LiveResult);

LiveResult.defaultProps = { currentPoll: null };

LiveResult.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  currentPoll: PropTypes.oneOfType([
    PropTypes.arrayOf(Object),
    PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.object),
      users: PropTypes.arrayOf(PropTypes.string),
    }),
  ]),
  stopPoll: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
};
