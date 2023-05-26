import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import injectWbResizeEvent from '/imports/ui/components/presentation/resize-wrapper/component';
import Button from '/imports/ui/components/button/component';
import withShortcutHelper from '/imports/ui/components/shortcut-help/service';
import { Meteor } from 'meteor/meteor';
import ChatLogger from '/imports/ui/components/chat/chat-logger/ChatLogger';
import { styles } from './styles.scss';
import MessageFormContainer from './message-form/container';
import TimeWindowList from './time-window-list/container';
import ChatDropdownContainer from './chat-dropdown/container';
import { PANELS, ACTIONS } from '../../components/layout/enums';
import { UserSentMessageCollection } from './service';
import { Session } from 'meteor/session';

import Auth from '/imports/ui/services/auth';
import Share from "./Icons/share";
import Cross from './Icons/Cross';
import BackIcon from './Icons/BackIcon';
import { useState } from 'react';
import PrivateMessageContainer from './private-window-list/container';
import CopyPopupContainer from './copy-popup/container'
import { useEffect } from 'react';
import AddUser from './Icons/AddUser';

const CHAT_CONFIG = Meteor.settings.public.chat;
const PUBLIC_CHAT_ID = CHAT_CONFIG.public_id;
const ELEMENT_ID = 'chat-messages';

const CHAT_ENABLED = Meteor.settings.public.chat.enabled;

const intlMessages = defineMessages({
  closeChatLabel: {
    id: 'app.chat.closeChatLabel',
    description: 'aria-label for closing chat button',
  },
  hideChatLabel: {
    id: 'app.chat.hideChatLabel',
    description: 'aria-label for hiding chat button',
  },
  copyLinkLabel: {
    id: 'app.tooltip.copyLinkLabel',
    description: 'Copy Link Label',
  },
  copiedLabel: {
    id: 'app.tooltip.copiedLabel',
    description: 'Link Copied Label',
  },
  titlePrivate: {
    id: 'app.chat.titlePrivate',
    description: 'Private chat title',
  },
});

const Chat = (props) => {
  const {
    chatID,
    title,
    messages,
    partnerIsLoggedOut,
    isChatLocked,
    actions,
    intl,
    shortcuts,
    isMeteorConnected,
    lastReadMessageTime,
    hasUnreadMessages,
    scrollPosition,
    amIModerator,
    meetingIsBreakout,
    timeWindowsValues,
    dispatch,
    count,
    layoutContextDispatch,
    syncing,
    syncedPercent,
    lastTimeWindowValuesBuild,

    currentClosedChats,
    startedChats,
    compact,
    activeChatsCount,
  } = props;

  const userSentMessage = UserSentMessageCollection.findOne({ userId: Auth.userID, sent: true });
  const HIDE_CHAT_AK = shortcuts.hideprivatechat;
  const CLOSE_CHAT_AK = shortcuts.closeprivatechat;
  ChatLogger.debug('ChatComponent::render', props);

  const [publicChatActive, setPublicChatActive] = useState(true);
  const [isPrivateFormActive, setPrivateFormActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (chatID != PUBLIC_CHAT_ID) {
      setPublicChatActive(false);
      // setPrivateFormActive(true);
    }
  })

  const changeChatTab = (tab) => {
    if (tab == "public") {
      setPublicChatActive(true);
      layoutContextDispatch({
        type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
        value: true,
      });
      layoutContextDispatch({
        type: ACTIONS.SET_ID_CHAT_OPEN,
        value: PUBLIC_CHAT_ID,
      });
      layoutContextDispatch({
        type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
        value: PANELS.CHAT,
      });
    } else {
      setPublicChatActive(false);
      setPrivateFormActive(false);
    }
  }

  const togglePrivateMessageForm = () => {
    setPrivateFormActive(!isPrivateFormActive);
  }

  const copyLink = () => {
    let joinUrl = Auth._logoutURL;
    navigator.clipboard.writeText(joinUrl.substring(0, joinUrl.length - 6));
    const p = document.getElementById("shareUrlIcon");
    p.innerText = intl.formatMessage(intlMessages.copiedLabel);
  }


  window.addEventListener('click', function (e) {
    const ele = document.getElementById('addUser')
    if (ele && !ele.contains(e.target) && !e.target.id) {
      setIsOpen(false)
    }
  });

  return (
    <div
      data-test={chatID !== PUBLIC_CHAT_ID ? 'privateChat' : 'publicChat'}
      className={styles.chatWidth}
    >
      {/* height: 62.72px -- 56.72px */}
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderWrapper}>
          <div className={`${styles.chTab} ${publicChatActive ? styles.chTabOn : styles.chTabOff}`}
            onClick={() => changeChatTab("public")}>
            <h3>Public Chat</h3>
          </div>
          <div className={`${styles.chTab} ${publicChatActive ? styles.chTabOff : styles.chTabOn}`}
            onClick={() => changeChatTab("private")}>
            <h3>Private Chat</h3>
            <span>{activeChatsCount - 1}</span>
          </div>
        </div>
        {
          !meetingIsBreakout &&
          <div className={styles.shareUrlIcon} id="addUser">
            {
              Session.get('participantUrl') == null ?
                <div className={styles.copyLinkWrap} onClick={copyLink}>
                  <Share />
                  <div className={styles.sideTooltipWrapper} >
                    <div className={styles.sidebarTipArrow}></div>
                    <div className={styles.sidebarTooltip}><p id="shareUrlIcon">{intl.formatMessage(intlMessages.copyLinkLabel)}</p></div>
                  </div>
                </div>
                :
                <>
                  <AddUser />
                  <CopyPopupContainer />
                </>
            }
          </div>
        }
      </div>

      {/* <div className={styles.ChatHeadingOuter}>
        <div className={styles.CustomInline}>
          <div
            data-test="chatTitle"
            className={styles.ChatHeading}>
            {
              chatID !== PUBLIC_CHAT_ID ? intl.formatMessage(intlMessages.titlePrivate, { 0: title }) : title
            }
          </div>
          {
            chatID == PUBLIC_CHAT_ID && !meetingIsBreakout &&
            <div className={styles.shareUrlIcon} onClick={copyLink}><Share />
              <div className={styles.sideTooltipWrapper}>
                <div className={styles.sidebarTipArrow}></div>
                <div className={styles.sidebarTooltip}><p id="shareUrlIcon">{intl.formatMessage(intlMessages.copyLinkLabel)}</p></div>
              </div>
            </div>
          }
        </div>
        <div className={styles.cutButton}>
          {
            chatID !== PUBLIC_CHAT_ID
              ? (
                <>
                  <button
                    onClick={() => {
                      layoutContextDispatch({
                        type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
                        value: true,
                      });
                      layoutContextDispatch({
                        type: ACTIONS.SET_ID_CHAT_OPEN,
                        value: PUBLIC_CHAT_ID,
                      });
                      layoutContextDispatch({
                        type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
                        value: PANELS.CHAT,
                      });
                    }}
                    aria-label={intl.formatMessage(intlMessages.closeChatLabel, { 0: title })}
                    label={intl.formatMessage(intlMessages.closeChatLabel, { 0: title })}
                    accessKey={CLOSE_CHAT_AK}
                  ><MinimizeIcon /></button>

                  <button
                    onClick={() => {
                      actions.handleClosePrivateChat(chatID);
                      layoutContextDispatch({
                        type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
                        value: true,
                      });
                      layoutContextDispatch({
                        type: ACTIONS.SET_ID_CHAT_OPEN,
                        value: PUBLIC_CHAT_ID,
                      });
                      layoutContextDispatch({
                        type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
                        value: PANELS.CHAT,
                      });
                    }}
                    aria-label={intl.formatMessage(intlMessages.closeChatLabel, { 0: title })}
                    label={intl.formatMessage(intlMessages.closeChatLabel, { 0: title })}
                    accessKey={CLOSE_CHAT_AK}
                  ><Cross /></button>
                </>
              )
              : (
                null
              )
          }
        </div>
      </div> */}

      {
        publicChatActive ?
          <div className={styles.messageList}>
            <TimeWindowList
              id={ELEMENT_ID}
              chatId={chatID}
              handleScrollUpdate={actions.handleScrollUpdate}
              {...{
                partnerIsLoggedOut,
                lastReadMessageTime,
                hasUnreadMessages,
                scrollPosition,
                messages,
                currentUserIsModerator: amIModerator,
                timeWindowsValues,
                dispatch,
                count,
                syncing,
                syncedPercent,
                lastTimeWindowValuesBuild,
                userSentMessage,
              }}
            />
            {/* height: 106px */}
            <MessageFormContainer
              {...{
                title,
              }}
              chatId={chatID}
              chatTitle={title}
              chatAreaId={ELEMENT_ID}
              disabled={isChatLocked || !isMeteorConnected}
              connected={isMeteorConnected}
              locked={isChatLocked}
              partnerIsLoggedOut={partnerIsLoggedOut}
            />
          </div>
          :
          CHAT_ENABLED ?
            isPrivateFormActive ?
              <div className={styles.messageList}>
                <div className={styles.ChatHeadingOuter}>
                  <div className={styles.CustomInline}>

                    <div className={styles.cutButton}>
                      {
                        chatID !== PUBLIC_CHAT_ID
                          ? (
                            <button
                              onClick={togglePrivateMessageForm}
                              aria-label={intl.formatMessage(intlMessages.closeChatLabel, { 0: title })}
                              label={intl.formatMessage(intlMessages.closeChatLabel, { 0: title })}
                              accessKey={CLOSE_CHAT_AK}
                            ><BackIcon /></button>
                          )
                          : (
                            null
                          )
                      }
                    </div>

                    <div
                      data-test="chatTitle"
                      className={styles.ChatHeading}>
                      {title}
                    </div>
                    {
                      chatID == PUBLIC_CHAT_ID && !meetingIsBreakout &&
                      <div className={styles.shareUrlIcon} onClick={copyLink}>
                        <Share />
                        <div className={styles.sideTooltipWrapper}>
                          <div className={styles.sidebarTipArrow}></div>
                          <div className={styles.sidebarTooltip}><p id="shareUrlIcon">{intl.formatMessage(intlMessages.copyLinkLabel)}</p></div>
                        </div>
                      </div>
                    }
                  </div>

                </div>
                <TimeWindowList
                  id={ELEMENT_ID}
                  chatId={chatID}
                  handleScrollUpdate={actions.handleScrollUpdate}
                  {...{
                    partnerIsLoggedOut,
                    lastReadMessageTime,
                    hasUnreadMessages,
                    scrollPosition,
                    messages,
                    currentUserIsModerator: amIModerator,
                    timeWindowsValues,
                    dispatch,
                    count,
                    syncing,
                    syncedPercent,
                    lastTimeWindowValuesBuild,
                    userSentMessage,
                  }}
                />
                {/* height: 106px */}
                <MessageFormContainer
                  {...{
                    title,
                  }}
                  chatId={chatID}
                  chatTitle={title}
                  chatAreaId={ELEMENT_ID}
                  disabled={isChatLocked || !isMeteorConnected}
                  connected={isMeteorConnected}
                  locked={isChatLocked}
                  partnerIsLoggedOut={partnerIsLoggedOut}
                />
              </div>
              :
              <PrivateMessageContainer
                {...{
                  compact,
                  intl,
                  roving,
                  currentClosedChats,
                  startedChats,
                  togglePrivateMessageForm,
                }}
              /> : null
      }
    </div >
  );
};

export default memo(withShortcutHelper(injectWbResizeEvent(injectIntl(Chat)), ['hidePrivateChat', 'closePrivateChat']));

const propTypes = {
  chatID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortcuts: PropTypes.objectOf(PropTypes.string),
  partnerIsLoggedOut: PropTypes.bool.isRequired,
  isChatLocked: PropTypes.bool.isRequired,
  isMeteorConnected: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    handleClosePrivateChat: PropTypes.func.isRequired,
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  shortcuts: [],
};

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;
