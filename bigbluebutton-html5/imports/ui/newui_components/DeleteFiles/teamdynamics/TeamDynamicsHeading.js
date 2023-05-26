import React from "react";
import {styles} from "./styles.scss";
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

const intlMessages = defineMessages({
    breakoutRoomTitle: {
      id: 'app.createBreakoutRoom.title',
      description: 'modal title',
    },
});

const propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

function TeamDynamicsHeading(props)
{
    const {intl} = props;
    
    return (<div className={styles.BreakoutroomHeadingOuter}>
        {/* <h3 className={styles.BreakoutroomHeading}>{intl.formatMessage(intlMessages.breakoutRoomTitle)}</h3> */}
        <h3 className={styles.BreakoutroomHeading}>Team Dynamics</h3>
        </div>);
}
TeamDynamicsHeading.propTypes = propTypes;
export default injectIntl(TeamDynamicsHeading);