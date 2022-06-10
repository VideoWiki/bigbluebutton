import React from "react";
import IconBox from "./IconBox";
import { LayoutContextFunc } from "../../components/layout/context";
import { styles } from "./styles";

const MySidebar = (props) => {

    const iconTypes = ["chat", "user", "document", "newbreakoutroom", "poll", "video", "presentation", "settings", "waitingusers"];
    const { layoutContextState, layoutContextDispatch, intl} = props;
    const { input } = layoutContextState;

    return (<div className={styles.OuterSideBox}>
        <div className={styles.LogoBox}>
            <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/logo.svg" />
        </div>
        <div className={styles.IconOuter}>
            {iconTypes.map((item, id) => (
                <IconBox key={id} intl={intl} icon={item} {...input} 
                contextDispatch={layoutContextDispatch} 
                />
            ))}
        </div>
    </div>);
}
export default LayoutContextFunc.withConsumer(MySidebar);