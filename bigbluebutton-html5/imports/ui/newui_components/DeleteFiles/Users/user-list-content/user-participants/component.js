import React, { Component } from 'react';
import { defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import { styles } from '../styles.scss';
import _ from 'lodash';
import { findDOMNode } from 'react-dom';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import MyUserListItemContainer from './user-list-item/container';
import MyUserOptionsContainer from './user-option/container';
import Settings from '/imports/ui/services/settings';

const propTypes = {
  compact: PropTypes.bool,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setEmojiStatus: PropTypes.func.isRequired,
  clearAllEmojiStatus: PropTypes.func.isRequired,
  roving: PropTypes.func.isRequired,
  requestUserInformation: PropTypes.func.isRequired,
};

const defaultProps = {
  compact: false,
};

const intlMessages = defineMessages({
  usersTitle: {
    id: 'app.userList.usersTitle',
    description: 'Title for the Header',
  },
});

const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

class MyUserParticipants extends Component {
  constructor() {
    super();

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      keyMapper: () => 1,
    });

    this.state = {
      selectedUser: null,
      isOpen: false,
      scrollArea: false,
    };

    this.userRefs = [];

    this.getScrollContainerRef = this.getScrollContainerRef.bind(this);
    this.rove = this.rove.bind(this);
    this.changeState = this.changeState.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.handleClickSelectedUser = this.handleClickSelectedUser.bind(this);
    this.selectEl = this.selectEl.bind(this);
  }

  componentDidMount() {
    document.getElementById('user-list-virtualized-scroll')?.getElementsByTagName('div')[0]?.firstElementChild?.setAttribute('aria-label', 'Users list');

    const { compact } = this.props;
    if (!compact) {
      this.refScrollContainer.addEventListener(
        'keydown',
        this.rove,
      );

      this.refScrollContainer.addEventListener(
        'click',
        this.handleClickSelectedUser,
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsEqual = _.isEqual(this.props, nextProps);
    const isStateEqual = _.isEqual(this.state, nextState);
    return !isPropsEqual || !isStateEqual;
  }

  selectEl(el) {
    if (!el) return null;
    if (el.getAttribute('tabindex')) return el?.focus();
    this.selectEl(el?.firstChild);
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedUser } = this.state;
    if (selectedUser) {
      const { firstChild } = selectedUser;
      if (!firstChild.isEqualNode(document.activeElement)) {
        this.selectEl(selectedUser);
      }
    }
  }

  componentWillUnmount() {
    this.refScrollContainer.removeEventListener('keydown', this.rove);
    this.refScrollContainer.removeEventListener('click', this.handleClickSelectedUser);
  }

  getScrollContainerRef() {
    return this.refScrollContainer;
  }

  rowRenderer({
    index,
    parent,
    style,
    key,
  }) {
    const {
      compact,
      setEmojiStatus,
      users,
      requestUserInformation,
      currentUser,
      meetingIsBreakout,
    } = this.props;
    const { scrollArea } = this.state;
    const user = users[index];
    const isRTL = Settings.application.isRTL;
    console.log(currentUser);
    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        columnIndex={0}
        parent={parent}
        rowIndex={index}
      >
        <span
          style={style}
          key={key}
          id={`user-${user.userId}`}
        >
          <MyUserListItemContainer
            {...{
              compact,
              setEmojiStatus,
              requestUserInformation,
              currentUser,
              meetingIsBreakout,
              scrollArea,
              isRTL,
            }}
            user={user}
            getScrollContainerRef={this.getScrollContainerRef}
          />  
        </span>
      </CellMeasurer>
    );
  }

  handleClickSelectedUser(event) {
    let selectedUser = null;
    if (event.path) {
      selectedUser = event.path.find(p => p.className && p.className.includes('participantsList'));
    }
    this.setState({ selectedUser });
  }

  rove(event) {
    const { roving } = this.props;
    const { selectedUser, scrollArea } = this.state;
    const usersItemsRef = findDOMNode(scrollArea.firstChild);
    roving(event, this.changeState, usersItemsRef, selectedUser);
  }

  changeState(ref) {
    this.setState({ selectedUser: ref });
  }

  render() {
    const {
      intl,
      users,
      compact,
      clearAllEmojiStatus,
      currentUser,
      meetingIsBreakout,
      setEmojiStatus,
      requestUserInformation
    } = this.props;
    const { isOpen, scrollArea } = this.state;
    const isRTL = Settings.application.isRTL;

    return (
      <div className={styles.userListColumn}>
        {/* {
          !compact
            ? (
              <div className={styles.container}>
                <h2 className={styles.smallTitle}>
                  {intl.formatMessage(intlMessages.usersTitle)}
                  &nbsp;(
                  {users.length}
                  )
                </h2>
                <MyUserOptionsContainer/>
              </div>
            )
            : <hr className={styles.separator} />
        } */}
        <div className={styles.userListHeader}>
          <h3>{intl.formatMessage(intlMessages.usersTitle)} ({users.length})</h3>
        </div>
        <div
          id={'user-list-virtualized-scroll'}
          aria-label="Users list"
          role="region"
          className={styles.virtulizedScrollableList}
          tabIndex={0}
          ref={(ref) => {
            this.refScrollContainer = ref;
          }}
        >
        {users.map((item,id)=>(
            <MyUserListItemContainer
            key={id}
            id={`user-${item.userId}`}
            {...{
                compact,
                setEmojiStatus,
                requestUserInformation,
                currentUser,
                meetingIsBreakout,
                scrollArea,
                isRTL,
            }}
            user={item}
            getScrollContainerRef={this.getScrollContainerRef}
            />  
            ))}
            </div>
            </div>
            );
        }
    }
    
    MyUserParticipants.propTypes = propTypes;
    MyUserParticipants.defaultProps = defaultProps;

export default MyUserParticipants;
