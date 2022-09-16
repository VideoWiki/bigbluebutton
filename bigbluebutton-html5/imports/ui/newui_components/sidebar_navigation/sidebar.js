import React, {useContext} from "react";
import IconBox from "./IconBox";
import { LayoutContextFunc } from "../../components/layout/context";
import CustomLogo from '/imports/ui/newui_components/user-list/custom-logo/component';
import getFromUserSettings from '/imports/ui/services/users-settings';
import Service from '/imports/ui/components/user-list/service';

import BreakoutService from '/imports/ui/components/app/service';
import PresenterService from '/imports/ui/components/actions-bar/service'
import PollingService from '/imports/ui/components/polling/service';
import { withTracker } from 'meteor/react-meteor-data';
import PollService from '/imports/ui/components/poll/service';
import LayoutContext from '/imports/ui/components/layout/context';

import { styles } from "./styles";

const MySidebar = (props) => {

    const iconTypes = ["chat", "user", "document", "newbreakoutroom", "poll", "video", "presentation", "settings", "waitingusers"];
    const layoutContext = useContext(LayoutContext);
    const { layoutContextState, layoutContextDispatch, intl } = layoutContext;
    const { input } = layoutContextState;
    const showBranding = getFromUserSettings('bbb_display_branding_area', Meteor.settings.public.app.branding.displayBrandingArea);
    const CustomLogoUrl = Service.getCustomLogoUrl();
    const meetingIsBreakout = BreakoutService.meetingIsBreakout();

    const hasBreakoutRoom = Service.hasBreakoutRoom()

    const amIPresenter = PresenterService.amIPresenter()
    const amIModerator = PresenterService.amIModerator()

    const {
        pollExists, handleVote, poll, handleTypedVote,
    } = props;

    //can be implemented if required
    // console.log("polling",pollExists, poll)

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
            {iconTypes.map((item, id) => {
                if(item=="newbreakoutroom"){
                    if(!meetingIsBreakout){
                        if(amIModerator){
                            return (
                                <IconBox key={id} intl={intl} icon={item} {...input} 
                                contextDispatch={layoutContextDispatch} 
                                />
                            )
                        }else if(hasBreakoutRoom){
                            return (
                                <IconBox key={id} intl={intl} icon={item} {...input} 
                                contextDispatch={layoutContextDispatch} 
                                />
                            )
                        }
                        
                    }
                }else if(item=="video" || item=="presentation"){
                    // item=="poll" || 
                    if(amIPresenter){
                        return (
                            <IconBox key={id} intl={intl} icon={item} {...input} 
                            contextDispatch={layoutContextDispatch} 
                            />
                        )
                    }
                }
                // else if(item=="poll"){
                //     if(amIPresenter || pollExists || ){
                //         return (
                //             <IconBox key={id} intl={intl} icon={item} {...input} 
                //             contextDispatch={layoutContextDispatch} 
                //             />
                //         )
                //     }
                // }
                else{
                    return (
                        <IconBox key={id} intl={intl} icon={item} {...input} 
                        contextDispatch={layoutContextDispatch} 
                        />
                    )
                }
            })}
        </div>
    </div>);
}

export default withTracker(() => {
    const {
      pollExists, handleVote, poll, handleTypedVote,
    } = PollingService.mapPolls();
    const { pollTypes } = PollService;
  
    if(poll && poll?.pollType){
      const isResponse = poll.pollType === pollTypes.Response;
      Meteor.subscribe('polls', isResponse);
    }
  
    return ({
      pollExists,
      handleVote,
      handleTypedVote,
      poll,
      pollAnswerIds: PollService.pollAnswerIds,
      pollTypes,
      isDefaultPoll: PollService.isDefaultPoll,
      isMeteorConnected: Meteor.status().connected
    });
  })(MySidebar);

// export default LayoutContextFunc.withConsumer(MySidebar);