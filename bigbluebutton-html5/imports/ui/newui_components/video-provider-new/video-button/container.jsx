import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { injectIntl } from 'react-intl';
import { withModalMounter } from '/imports/ui/components/modal/service';
import VideoPreviewContainer from '/imports/ui/newui_components/video-preview/container';
import JoinVideoButton from './component';
import VideoService from '../service';
import Service from '/imports/ui/components/video-preview/service'

const JoinVideoOptionsContainer = (props) => {
  const {
    hasVideoStream,
    disableReason,
    intl,
    mountModal,
    ...restProps
  } = props;

  const mountVideoPreview = () => { mountModal(<VideoPreviewContainer />); };

  return (
    <JoinVideoButton {...{
      mountVideoPreview, hasVideoStream, disableReason, ...restProps,
    }}
    />
  );
};

export default withModalMounter(injectIntl(withTracker(() => ({
  hasVideoStream: VideoService.hasVideoStream(),
  disableReason: VideoService.disableReason(),
  webcamDeviceId: Service.webcamDeviceId(),
}))(JoinVideoOptionsContainer)));
