import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import SettingsService from '/imports/ui/services/settings';
import SettingContainer from './settingcontainer';
import LayoutContext from '/imports/ui/components/layout/context';

import {
  getUserRoles,
  updateSettings,
} from '/imports/ui/components/settings/service';

const PopupContainer = (props) => {
  const layoutContext = useContext(LayoutContext);
  const { layoutContextDispatch } = layoutContext;
  return <SettingContainer {...props} layoutContextDispatch={layoutContextDispatch} />;
};

export default withTracker(() => ({
  application: SettingsService.application,
  updateSettings,
  isModerator: getUserRoles() === 'MODERATOR',
}))(PopupContainer);
