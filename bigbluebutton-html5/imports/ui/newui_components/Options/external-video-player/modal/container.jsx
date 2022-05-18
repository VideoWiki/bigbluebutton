import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import ExternalVideoModal from './component';
import { startWatching, getVideoUrl } from '/imports/ui/components/external-video-player/service';

const ExternalVideoModalContainer = props => <ExternalVideoModal {...props} />;
console.log("modal called")
export default withTracker(() => {
  return {
    startWatching,
    videoUrl: getVideoUrl(),
  }
})(ExternalVideoModalContainer);
