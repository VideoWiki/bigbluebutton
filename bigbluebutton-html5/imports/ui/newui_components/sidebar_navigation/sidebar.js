import React from "react";
import IconBox from "./IconBox";
import { LayoutContextFunc } from "../../components/layout/context";
import CustomLogo from '/imports/ui/newui_components/user-list/custom-logo/component';
import getFromUserSettings from '/imports/ui/services/users-settings';
import Service from '/imports/ui/components/user-list/service';

import BreakoutService from '/imports/ui/components/app/service';

import { styles } from "./styles";

const MySidebar = (props) => {

    const iconTypes = ["chat", "user", "document", "newbreakoutroom", "poll", "video", "presentation", "settings", "waitingusers"];
    const { layoutContextState, layoutContextDispatch, intl} = props;
    const { input } = layoutContextState;
    const showBranding = getFromUserSettings('bbb_display_branding_area', Meteor.settings.public.app.branding.displayBrandingArea);
    const CustomLogoUrl = Service.getCustomLogoUrl();
    const meetingIsBreakout = BreakoutService.meetingIsBreakout();
    console.log("meeting", meetingIsBreakout)

    return (<div className={styles.OuterSideBox}>
        {
          showBranding
            && CustomLogoUrl
            ? <CustomLogo CustomLogoUrl={CustomLogoUrl} /> : null
        }
        {/* <div className={styles.LogoBox}>
            <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/logo.svg" />
        </div> */}
        <div className={styles.IconOuter}>
            {iconTypes.map((item, id) => (
                item=="newbreakoutroom" ?
                !meetingIsBreakout && <IconBox key={id} intl={intl} icon={item} {...input} 
                contextDispatch={layoutContextDispatch} 
                />
                :
                <IconBox key={id} intl={intl} icon={item} {...input} 
                contextDispatch={layoutContextDispatch} 
                />
            ))}
        </div>
    </div>);
}
export default LayoutContextFunc.withConsumer(MySidebar);