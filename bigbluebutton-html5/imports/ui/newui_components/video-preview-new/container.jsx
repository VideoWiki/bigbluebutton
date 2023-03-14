import React from 'react';
import { withModalMounter } from '/imports/ui/components/modal/service';
import { withTracker } from 'meteor/react-meteor-data';
import Service from './service';
import VideoPreview from './component';
import VideoService from '/imports/ui/components/video-provider/service';
import AudioService from '/imports/ui/newui_components/audio-new/service.js'

const VideoPreviewContainer = (props) => <VideoPreview {...props} />;

const {
  toggleMuteMicrophone,
} = AudioService;

export default withTracker(() => ({
  startSharing: (deviceId) => {
    // mountModal(null);
    VideoService.joinVideo(deviceId);
  },
  stopSharing: (deviceId) => {
    // mountModal(null);
    if (deviceId) {
      const streamId = VideoService.getMyStreamId(deviceId);
      if (streamId) VideoService.stopVideo(streamId);
    } else {
      VideoService.exitVideo();
    }
  },
  sharedDevices: VideoService.getSharedDevices(),
  isCamLocked: VideoService.isUserLocked(),
  // closeModal: () => mountModal(null),
  webcamDeviceId: Service.webcamDeviceId(),
  hasVideoStream: VideoService.hasVideoStream(),
  handleToggleMuteMicrophone: () => toggleMuteMicrophone(),
}))(VideoPreviewContainer);
