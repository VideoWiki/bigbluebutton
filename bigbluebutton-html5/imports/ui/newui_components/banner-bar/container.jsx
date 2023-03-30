import React, { useContext } from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import BannerComponent from './component';
import LayoutContext from '/imports/ui/components/layout/context';

const BannerContainer = (props) => {
  const layoutContext = useContext(LayoutContext);
  const { layoutContextState, layoutContextDispatch } = layoutContext;
  const { input, output } = layoutContextState;
  const { bannerBar } = input;
  const { hasBanner } = bannerBar;
  const { navBar } = output;

  return <BannerComponent {...{ hasBanner, layoutContextDispatch, ...props }} style={{ ...navBar }} />;
};

export default withTracker(() => ({
  color: Session.get('bannerColor') || '#0F70D7',
  text: Session.get('bannerText') || '',
}))(BannerContainer);
