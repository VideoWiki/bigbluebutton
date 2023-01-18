import React from 'react';
import cx from 'classnames';
import Button from '/imports/ui/components/button/component';
import Toggle from '/imports/ui/components/switch/component';
import LocalesDropdown from '/imports/ui/components/locales-dropdown/component';
import { defineMessages, injectIntl } from 'react-intl';
import BaseMenu from '../../settings/submenus/base/component';
import { styles } from './styles';
import VideoService from '/imports/ui/components/video-provider/service';
import { ACTIONS, LAYOUT_TYPE } from '/imports/ui/components/layout/enums';
import CustomTemplate from '../icons/CustomTemplate'
import LayoutIcon from '../icons/LayoutIcon'
import SmartTemplate from '../icons/SmartTemplate'
import Popup from './Popup';

const MIN_FONTSIZE = 0;
const SHOW_AUDIO_FILTERS = (Meteor.settings.public.app
  .showAudioFilters === undefined)
  ? true
  : Meteor.settings.public.app.showAudioFilters;

const intlMessages = defineMessages({
  applicationSectionTitle: {
    id: 'app.submenu.application.applicationSectionTitle',
    description: 'Application section title',
  },
  animationsLabel: {
    id: 'app.submenu.application.animationsLabel',
    description: 'animations label',
  },
  audioFilterLabel: {
    id: 'app.submenu.application.audioFilterLabel',
    description: 'audio filters label',
  },
  fontSizeControlLabel: {
    id: 'app.submenu.application.fontSizeControlLabel',
    description: 'label for font size ontrol',
  },
  increaseFontBtnLabel: {
    id: 'app.submenu.application.increaseFontBtnLabel',
    description: 'label for button to increase font size',
  },
  increaseFontBtnDesc: {
    id: 'app.submenu.application.increaseFontBtnDesc',
    description: 'adds descriptive context to increase font size button',
  },
  decreaseFontBtnLabel: {
    id: 'app.submenu.application.decreaseFontBtnLabel',
    description: 'label for button to reduce font size',
  },
  decreaseFontBtnDesc: {
    id: 'app.submenu.application.decreaseFontBtnDesc',
    description: 'adds descriptive context to decrease font size button',
  },
  languageLabel: {
    id: 'app.submenu.application.languageLabel',
    description: 'displayed label for changing application locale',
  },
  currentValue: {
    id: 'app.submenu.application.currentSize',
    description: 'current value label',
  },
  languageOptionLabel: {
    id: 'app.submenu.application.languageOptionLabel',
    description: 'default change language option when locales are available',
  },
  noLocaleOptionLabel: {
    id: 'app.submenu.application.noLocaleOptionLabel',
    description: 'default change language option when no locales available',
  },
  paginationEnabledLabel: {
    id: 'app.submenu.application.paginationEnabledLabel',
    description: 'enable/disable video pagination',
  },
  layoutOptionLabel: {
    id: 'app.submenu.application.layoutOptionLabel',
    description: 'layout options',
  },
  customLayout: {
    id: 'app.layout.style.custom',
    description: 'label for custom layout style',
  },
  smartLayout: {
    id: 'app.layout.style.smart',
    description: 'label for smart layout style',
  },
  presentationFocusLayout: {
    id: 'app.layout.style.presentationFocus',
    description: 'label for presentationFocus layout style',
  },
  videoFocusLayout: {
    id: 'app.layout.style.videoFocus',
    description: 'label for videoFocus layout style',
  },
  presentationFocusPushLayout: {
    id: 'app.layout.style.presentationFocusPush',
    description: 'label for presentationFocus layout style (push to all)',
  },
  videoFocusPushLayout: {
    id: 'app.layout.style.videoFocusPush',
    description: 'label for videoFocus layout style (push to all)',
  },
  smartPushLayout: {
    id: 'app.layout.style.smartPush',
    description: 'label for smart layout style (push to all)',
  },
  customPushLayout: {
    id: 'app.layout.style.customPush',
    description: 'label for custom layout style (push to all)',
  },

  savebuttonLabel: {
    id: 'app.settings.main.save.label',
    description: 'setting save button label',
  }
});

class Application extends BaseMenu {
  static setHtmlFontSize(size) {
    document.getElementsByTagName('html')[0].style.fontSize = size;
  }

  constructor(props) {
    super(props);

    this.state = {
      settingsName: 'application',
      settings: props.settings,
      isLargestFontSize: false,
      isSmallestFontSize: false,
      showSelect: false,
      fontSizes: [
        '12px',
        '14px',
        '16px',
        '18px',
        '20px',
      ],
    };
    this.saveSetting = this.saveSetting.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => { };
  }

  saveSetting() {
    const { changeSetting } = this.props
    changeSetting();
  }

  handleSelectChange(fieldname, e) {
    const obj = this.state;
    obj.settings[fieldname] = e;
    this.handleUpdateSettings('application', obj.settings);
  }

  renderChangeLayout() {
    const { intl, isModerator } = this.props;
    const { settings } = this.state;

    return (
      <Popup isModerator={isModerator} handleSelectChange={this.handleSelectChange} selectedLayout={settings.selectedLayout} />
      // Spinner Modal
      // <>
      //     <div className={styles.layoutArrow}></div>
      //     <div className={styles.layoutPopup}>
      //         <h4>Layout</h4>
      //         {/* <select
      //             className={styles.selectLayout}
      //             onChange={(e) => this.handleSelectChange('selectedLayout', e)}
      //             id="layoutList"
      //             value={settings.selectedLayout}
      //         >
      //             {
      //                 Object.values(LAYOUT_TYPE)
      //                     .map((layout) => <option key={layout} value={layout}>{intl.formatMessage(intlMessages[`${layout}Layout`])}</option>)
      //             }
      //         </select> */}
      //         <label htmlFor="selectLayoutCheckbox" className={styles.selectLayoutLabel} key="select-layout-checkbox">
      //           <input
      //             type="checkbox"
      //             id="selectLayoutCheckbox"
      //             className={styles.freeJoinCheckbox}
      //             // onChange={this.setFreeJoin}
      //             // checked={freeJoin}
      //             // aria-label={intl.formatMessage(intlMessages.freeJoinLabel)}
      //           />
      //           <p>Note: Only Moderator can select the all option to change the layout for all the users in the meeting</p>
      //         </label>
      //         <div className={styles.layoutCenter}>
      //             <div className={styles.layLeft}>
      //                 <SmartTemplate />
      //                 <p>Smart Layout</p>
      //             </div>
      //             <div className={styles.layRight}>
      //                 <CustomTemplate />
      //                 <p>Custom Layout</p>
      //             </div>
      //         </div>
      //     </div>
      // </> 
    )
  }

  render() {
    return (
      <>
        {this.renderChangeLayout()}
      </>
    );
  }
}

export default injectIntl(Application);