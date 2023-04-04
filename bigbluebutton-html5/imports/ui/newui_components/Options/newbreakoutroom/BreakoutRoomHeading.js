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

function BreakoutroomHeading(props)
{
    const {intl} = props;
    
    return (<div className={styles.BreakoutroomHeadingOuter}>
        <h3 className={styles.BreakoutroomHeading}>{intl.formatMessage(intlMessages.breakoutRoomTitle)}</h3>
        </div>);
}
BreakoutroomHeading.propTypes = propTypes;
export default injectIntl(BreakoutroomHeading);