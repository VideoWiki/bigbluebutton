import React, { useEffect, useState, useContext } from "react";
import Poll from "./Icons/poll";
import BreakoutRoom from "./Icons/breakout_room";
import Document from "./Icons/document";
import Settings from "./Icons/settings";
import User from "./Icons/user";
import Video from "./Icons/video";
import Chat from "./Icons/chat";
import { withTracker } from 'meteor/react-meteor-data';
import { ACTIONS } from "../../components/layout/enums";
import { styles } from "./styles";
import ExternalPresentation from "./Icons/external_presentation";
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import UserListService from '/imports/ui/newui_components/user-list/service';
import GuestUsers from '/imports/api/guest-users/';
import Auth from '/imports/ui/services/auth';
import Waitinguser from "./Icons/waitinguser";
import userListService from '/imports/ui/components/user-list/service';
import NoteService from '/imports/ui/components/note/service';
import { ChatContext } from '/imports/ui/components/components-data/chat-context/context';
import { GroupChatContext } from '/imports/ui/components/components-data/group-chat-context/context';
import { UsersContext } from '/imports/ui/components/components-data/users-context/context';
import TakePresenter from "./Icons/take_presenter";
import PresenterService from '/imports/ui/components/actions-bar/service'
// import WaitingUserService from '/imports/ui/components/waiting-users/service';

const intlMessages = defineMessages({
    chatLabel: {
        id: 'app.chat.label',
        description: 'Aria-label for Chat Section',
    },
    usersTitle: {
        id: 'app.userList.usersTitle',
        description: 'Title for the Header',
    },
    notesTitle: {
        id: 'app.userList.notesTitle',
        description: 'Title for the notes list',
    },
    breakoutTitle: {
        id: 'app.createBreakoutRoom.title',
        description: 'breakout title',
    },
    pollingTitleLabel: {
        id: 'app.poll.pollingTitleLabel',
        description: 'Polling Title Label'
    },
    sharevideoTitleLabel: {
        id: 'app.externalVideo.titleLabel',
        description: 'share video title label',
    },
    presentationTitleLabel: {
        id: 'app.presentationUploder.presentationLabel',
        description: 'presentation title label',
    },
    SettingsLabel: {
        id: 'app.settings.main.label',
        description: 'General settings label',
    },
    waitinguserTitle: {
        id: 'app.userList.guest.waitingUsers',
        description: 'Label for the waiting users',
    },
});

const propTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired,
    }).isRequired
};

function PresenterIcon(props) {

    const { sidebarContent, icon, contextDispatch, intl, meetingIsBreakout, handleTakePresenter, amIPresenter } = props;
    const { sidebarContentPanel } = sidebarContent;
    // const users = UserListService.getUsers();
    // const [userCount, setUserCount] = useState(UserListService.getUsers().length);
    // let userCount = UserListService.getUsers().length;
    // useEffect(()=>{
    //     setUserCount(UserListService.getUsers().length);
    //     console.log("updateUser", UserListService.getUsers().length)
    // },[UserListService.getUsers])

    function updateSelectedFeature() {
        if (sidebarContentPanel === icon) {
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
                value: "none"
            });
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
                value: false
            });
        }
        else {
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
                value: icon
            });
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
                value: true
            });
        };
    }

    // const usingChatContext = useContext(ChatContext);
    // const usingUsersContext = useContext(UsersContext);
    // const usingGroupChatContext = useContext(GroupChatContext);
    // const { chats: groupChatsMessages } = usingChatContext;
    // const { users } = usingUsersContext;
    // const { groupChat: groupChats } = usingGroupChatContext;

    // const checkUnreadMessages = ({
    //     groupChatsMessages, groupChats, users, idChatOpen,
    // }) => {
    //     const activeChats = userListService.getActiveChats({ groupChatsMessages, groupChats, users });
    //     const hasUnreadMessages = activeChats
    //         .filter((chat) => chat.userId !== idChatOpen)
    //         .some((chat) => chat.unreadCounter > 0);

    //     return hasUnreadMessages;
    // };

    // const hasUnreadNotes = NoteService.hasUnreadNotes(sidebarContentPanel);
    // const hasUnreadMessages = checkUnreadMessages(
    //     { groupChatsMessages, groupChats, users: users[Auth.meetingID] },
    // );

    const takePresenter = ()=> {
        if (!amIPresenter) {
            handleTakePresenter()
            const rectangle = document.getElementById('iconGroup');
            rectangle.style.height = '174px'
        }
    }

    useEffect(()=>{
        if(amIPresenter){
            const rectangle = document.getElementById('iconGroup');
            rectangle.style.height = '174px'
        }else{
            const rectangle = document.getElementById('iconGroup');
            rectangle.style.height = '58px'
        }
    },[amIPresenter])

    return (
        <div className={styles.sidebar}>
            {/* Icon height 58px */}
            {icon === "takepresenter" &&
                <div className={`${styles.pIcon}`} onClick={takePresenter}>
                    <div className={`${styles.sidebarIcon} ${sidebarContentPanel === icon ? styles.selectedBox : styles.IconShadow}`}>
                        <TakePresenter
                            sidebarContentPanel={sidebarContentPanel}
                        />
                        <div className={styles.sideTooltipWrapper}>
                            <div className={styles.sidebarTipArrow}></div>
                            <div className={styles.sidebarTooltip}><span>Take Presenter</span></div>
                        </div>
                    </div>
                </div>
            }
            {icon === "video" &&
                <div className={`${styles.pIcon}`} onClick={() => updateSelectedFeature()} >
                    <div className={`${styles.sidebarIcon} ${sidebarContentPanel === icon ? styles.selectedBox : styles.IconShadow}`}>
                        <Video
                            sidebarContentPanel={sidebarContentPanel}
                        />
                        <div className={styles.sideTooltipWrapper}>
                            <div className={styles.sidebarTipArrow}></div>
                            <div className={styles.sidebarTooltip}><span>{intl.formatMessage(intlMessages.sharevideoTitleLabel)}</span></div>
                        </div>
                    </div>
                </div>
            }
            {icon === "presentation" &&
                <div className={`${styles.pIcon}`} onClick={() => updateSelectedFeature()} >
                    <div className={`${styles.sidebarIcon} ${sidebarContentPanel === icon ? styles.selectedBox : styles.IconShadow}`}>
                        <ExternalPresentation
                            sidebarContentPanel={sidebarContentPanel}
                        />
                        <div className={styles.sideTooltipWrapper}>
                            <div className={styles.sidebarTipArrow}></div>
                            <div className={styles.sidebarTooltip}><span>{intl.formatMessage(intlMessages.presentationTitleLabel)}</span></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

// export default IconBox;
PresenterIcon.propTypes = propTypes;
export default withTracker(() => {

    const guestUsers = GuestUsers.find({
        meetingId: Auth.meetingID,
        guest: true,
        approved: false,
        denied: false,
    }).fetch();

    const authenticatedUsers = GuestUsers.find({
        meetingId: Auth.meetingID,
        authenticated: true,
        guest: false,
        approved: false,
        denied: false,
    }).fetch();

    const amIPresenter = PresenterService.amIPresenter()
    const amIModerator = PresenterService.amIModerator()

    return ({
        guestUsers,
        authenticatedUsers,
        users: UserListService.getUsers(),
        amIPresenter: amIPresenter,
        amIModerator: amIModerator,
    });
})(injectIntl(PresenterIcon));