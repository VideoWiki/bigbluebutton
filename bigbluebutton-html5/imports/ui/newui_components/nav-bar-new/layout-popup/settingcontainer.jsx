import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import Application from './component';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withModalMounter } from '../../modal/service';
import { styles } from './styles.scss';

const intlMessages = defineMessages({
    appTabLabel: {
        id: 'app.settings.applicationTab.label',
        description: 'label for application tab',
    },
    audioTabLabel: {
        id: 'app.settings.audioTab.label',
        description: 'label for audio tab',
    },
    videoTabLabel: {
        id: 'app.settings.videoTab.label',
        description: 'label for video tab',
    },
    usersTabLabel: {
        id: 'app.settings.usersTab.label',
        description: 'label for participants tab',
    },
    SettingsLabel: {
        id: 'app.settings.main.label',
        description: 'General settings label',
    },
    CancelLabel: {
        id: 'app.settings.main.cancel.label',
        description: 'Discard the changes and close the settings menu',
    },
    CancelLabelDesc: {
        id: 'app.settings.main.cancel.label.description',
        description: 'Settings modal cancel button description',
    },
    SaveLabel: {
        id: 'app.settings.main.save.label',
        description: 'Save the changes and close the settings menu',
    },
    SaveLabelDesc: {
        id: 'app.settings.main.save.label.description',
        description: 'Settings modal save button label',
    },
    notificationLabel: {
        id: 'app.submenu.notification.SectionTitle', // set menu label identical to section title
        description: 'label for notification tab',
    },
    dataSavingLabel: {
        id: 'app.settings.dataSavingTab.label',
        description: 'label for data savings tab',
    },
    savedAlertLabel: {
        id: 'app.settings.save-notification.label',
        description: 'label shown in toast when settings are saved',
    },
    on: {
        id: 'app.switch.onLabel',
        description: 'label for toggle switch on state',
    },
    off: {
        id: 'app.switch.offLabel',
        description: 'label for toggle switch off state',
    },

    settingsTitleLabel: {
        id: 'app.settings.titleLabel',
        description: 'Settings title label'
    },
    applicationTitleLabel: {
        id: 'app.submenu.application.applicationSectionTitle',
        description: 'Application Title Label',
    },
    notificationTitlelabel: {
        id: 'app.settings.notificationTab.label',
        description: 'Notification Title Label'
    },
    datasavingsTitlelabel: {
        id: 'app.settings.datasavingsTab.label',
        description: 'Data Savings Title Label'
    },
    guestpolicyTitlelabel: {
        id: 'app.userList.userOptions.guestPolicyLabel',
        description: 'Guest Policy Title Label'
    },
    lockviewersTitlelabel: {
        id: 'app.lock-viewers.title',
        description: 'Lock Viewers Title Label'
    },
});

const propTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    application: PropTypes.shape({
        chatAudioAlerts: PropTypes.bool,
        chatPushAlerts: PropTypes.bool,
        userJoinAudioAlerts: PropTypes.bool,
        userLeaveAudioAlerts: PropTypes.bool,
        userLeavePushAlerts: PropTypes.bool,
        guestWaitingAudioAlerts: PropTypes.bool,
        guestWaitingPushAlerts: PropTypes.bool,
        paginationEnabled: PropTypes.bool,
        fallbackLocale: PropTypes.string,
        fontSize: PropTypes.string,
        locale: PropTypes.string,
        microphoneConstraints: PropTypes.objectOf(Object),
    }).isRequired,
    updateSettings: PropTypes.func.isRequired,
};

class SettingComponent extends Component {

    constructor(props) {
        super(props);

        const { application } = props;

        this.state = {
            current: {
                application: _.clone(application),
            },
            saved: {
                application: _.clone(application),
            },
        };

        this.changeSetting = this.changeSetting.bind(this);
        this.updateSettings = props.updateSettings;
        this.handleUpdateSettings = this.handleUpdateSettings.bind(this);
    }

    handleUpdateSettings(key, newSettings) {
        const settings = this.state;
        settings.current[key] = newSettings;
        this.setState(settings);
        this.changeSetting();
    }

    displaySettingsStatus(status) {
        const { intl } = this.props;

        return (
            <span className={styles.toggleLabel}>
                {status ? intl.formatMessage(intlMessages.on)
                    : intl.formatMessage(intlMessages.off)}
            </span>
        );
    }

    changeSetting() {
        const {
            intl,
        } = this.props;
        const {
            current,
        } = this.state;

        this.updateSettings(current, intl.formatMessage(intlMessages.savedAlertLabel));

        /* We need to use mountModal(null) here to prevent submenu state updates,
        *  from re-opening the modal.
        */
        // mountModal(null);
    }

    rendersettinglayout() {
        const {
            intl,
            isModerator,
            layoutContextDispatch,
        } = this.props;

        const {
            current,
        } = this.state;
        
        return (
            <Application
                handleUpdateSettings={this.handleUpdateSettings}
                changeSetting={this.changeSetting}
                settings={current.application}
                layoutContextDispatch={layoutContextDispatch}
                isModerator={isModerator}
            />
        )
    }

    render() {
        return (
            <>
                {
                    this.rendersettinglayout()
                }
            </>
        );
    }
}

SettingComponent.propTypes = propTypes;
export default withModalMounter(injectIntl(SettingComponent));
