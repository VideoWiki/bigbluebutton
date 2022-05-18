import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import SettingsService from '/imports/ui/services/settings';
import Settings from './component';
import LayoutContext from '/imports/ui/components/layout/context';

import {
  getUserRoles,
  showGuestNotification,
  updateSettings,
  getAvailableLocales,
} from '/imports/ui/components/settings/service';

const SettingsContainer = (props) => {
  const layoutContext = useContext(LayoutContext);
  const { layoutContextDispatch } = layoutContext;

  return <Settings {...props} layoutContextDispatch={layoutContextDispatch} />;
};

export default withTracker(() => ({
  audio: SettingsService.audio,
  dataSaving: SettingsService.dataSaving,
  application: SettingsService.application,
  updateSettings,
  availableLocales: getAvailableLocales(),
  isModerator: getUserRoles() === 'MODERATOR',
  showGuestNotification: showGuestNotification(),
  showToggleLabel: false,
}))(SettingsContainer);
