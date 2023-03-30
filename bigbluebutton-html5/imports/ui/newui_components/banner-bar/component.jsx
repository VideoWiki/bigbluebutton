import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NotificationsBar from '/imports/ui/newui_components/notifications-bar/component';
import { styles } from './styles';
import { ACTIONS } from '/imports/ui/components/layout/enums';

const BannerBar = ({
  text, color, hasBanner: propsHasBanner, layoutContextDispatch, style, main
}) => {
  useEffect(() => {
    const localHasBanner = !!text;

    if (localHasBanner !== propsHasBanner) {
      layoutContextDispatch({
        type: ACTIONS.SET_HAS_BANNER_BAR,
        value: localHasBanner,
      });
    }
  }, [text, propsHasBanner]);

  if (!text) return null;

  return (
    // <NotificationsBar color={color}>
    //   <span className={styles.bannerTextColor}>
    //     {/* {text} */}
    //   </span>
    // </NotificationsBar>
    <div color={color} className={styles.bannerBar}
      style={
        main === 'new'
          ? {
            left: style.left,
            width: style.width,
          }
          : {
            position: 'relative',
            width: '100%',
          }
      }>
      <div className={styles.bannerBarWrapper}>
        <span className={styles.bannerTextColor}>
          {text}
        </span>
      </div>
    </div>
  );
};

BannerBar.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default BannerBar;
