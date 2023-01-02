import React from 'react';
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import LeaveMeetingComponent from './component';
import Service from './service';

const LeaveMeetingContainer = props => <LeaveMeetingComponent {...props} />;

export default withModalMounter(withTracker(({ mountModal }) => ({
  closeModal: () => {
    mountModal(null);
  },
  meetingTitle: Service.getMeetingTitle(),
}))(LeaveMeetingContainer));
