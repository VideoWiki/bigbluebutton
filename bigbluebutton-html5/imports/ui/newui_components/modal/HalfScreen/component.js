import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '/imports/ui/newui_components/button/component';
import cx from 'classnames';
import { defineMessages, injectIntl } from 'react-intl';
import ModalBase, { withModalState } from '../base/component';
import { styles } from './styles.scss';
import Cross from '../../Options/BreakoutRoom/Icons/Cross';

const intlMessages = defineMessages({
  modalClose: {
    id: 'app.modal.close',
    description: 'Close',
  },
  modalCloseDescription: {
    id: 'app.modal.close.description',
    description: 'Disregards changes and closes the modal',
  },
  modalDone: {
    id: 'app.modal.confirm',
    description: 'Close',
  },
  modalDoneDescription: {
    id: 'app.modal.confirm.description',
    description: 'Disregards changes and closes the modal',
  },
  newTabLabel: {
    id: 'app.modal.newTab',
    description: 'aria label used to indicate opening a new window',
  },
});

const propTypes = {
  title: PropTypes.string.isRequired,
  confirm: PropTypes.shape({
    callback: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }),
  dismiss: PropTypes.shape({
    callback: PropTypes.func,
    disabled: PropTypes.bool,
  }),
  preventClosing: PropTypes.bool,
  shouldCloseOnOverlayClick: PropTypes.bool,
};

const defaultProps = {
  shouldCloseOnOverlayClick: false,
  confirm: {
    disabled: false,
  },
  dismiss: {
    callback: () => { },
    disabled: false,
  },
  preventClosing: false,
};

class ModalHalfscreen extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAction = this.handleAction.bind(this);
  }

  handleAction(name) {
    const { confirm, dismiss, modalHide } = this.props;
    const { callback: callBackConfirm } = confirm;
    const { callback: callBackDismiss } = dismiss;
    console.log(this.props);

    let callback;

    switch (name) {
      case 'confirm':
        callback = callBackConfirm;
        break;
      case 'dismiss':
        callback = callBackDismiss;
        break;
      default:
        break;
    }

    return modalHide(callback);
  }

  render() {
    const {
      intl,
      title,
      confirm,
      dismiss,
      className,
      children,
      modalisOpen,
      preventClosing,
      updateState,
      WantCreate,
      formFillLevel,
      isInvitation,
      Validity,
      amIModerator,
      ...otherProps
    } = this.props;

    // console.log(this.props);
    const popoutIcon = confirm.icon === 'popout_window';
    let confirmAriaLabel = `${confirm.label || intl.formatMessage(intlMessages.modalDone)} `;
    if (popoutIcon) {
      confirmAriaLabel = `${confirmAriaLabel} ${intl.formatMessage(intlMessages.newTabLabel)}`;
    }

    return (
      <div>
        <header className={styles.BreakoutroomHeadingOuter}>
          <h1 className={styles.BreakoutroomHeading}>{title}</h1>
        </header>
        {isInvitation && amIModerator && formFillLevel === 1 &&
          <div className={styles.RightAlign}>
            <Button
              label="Send Invites"
              className={styles.create}
              onClick={() => updateState({
                formFillLevel: formFillLevel + 1
              })}
            />
          </div>}
        {(!isInvitation || formFillLevel >= 2) &&amIModerator&& <div className={styles.centerAlign}>
          <div className={styles.content}>
            {children}
            {WantCreate && <div className={styles.centerAlign}>
              {formFillLevel == 1 && <Button
                data-test="modalDismissButton"
                className={styles.close}
                aria-label={`${intl.formatMessage(intlMessages.modalClose)} ${title}`}
                onClick={() => this.handleAction('dismiss')}
                aria-describedby="modalDismissDescription"
                onClick={() => updateState({
                  WantCreate: false,
                  durationTime: 15,
                  numberOfRoomsIsValid: true,
                  durationIsValid: true
                })}
              >
                <Cross />
              </Button>
              }
              {formFillLevel == 1 && amIModerator&& <Button
                className={styles.create}
                label="Next"
                disabled={Validity}
                onClick={() => updateState({ formFillLevel: formFillLevel + 1 })}
              />
              }
              {formFillLevel === 2 && !isInvitation && amIModerator&& <Button
                data-test="modalConfirmButton"
                className={styles.back}
                label="Back"
                onClick={() => updateState({
                  formFillLevel: formFillLevel - 1,
                  leastOneUserIsValid: true,
                  roomNameDuplicatedIsValid: true,
                  roomNameEmptyIsValid: true
                })}
              />}
              {formFillLevel === 2 && amIModerator&& <Button
                data-test="modalConfirmButton"
                className={popoutIcon ? cx(styles.create, styles.popout) : styles.create}
                label={confirm.label || intl.formatMessage(intlMessages.modalDone)}
                aria-label={confirmAriaLabel}
                disabled={confirm.disabled}
                onClick={() => {
                  this.handleAction('confirm');
                  updateState({ formFillLevel: formFillLevel - 1 });
                }}
                aria-describedby="modalConfirmDescription"
                iconRight={popoutIcon}
              />}
            </div>}
          </div>
        </div>}
        <div id="modalDismissDescription" hidden>{intl.formatMessage(intlMessages.modalCloseDescription)}</div>
        <div id="modalConfirmDescription" hidden>{intl.formatMessage(intlMessages.modalDoneDescription)}</div>
      </div>
    );
  }
}

ModalHalfscreen.propTypes = propTypes;
ModalHalfscreen.defaultProps = defaultProps;

export default withModalState(injectIntl(ModalHalfscreen));
