import React, { Component } from 'react';
import { withModalMounter } from '/imports/ui/components/modal/service';
import Modal from '/imports/ui/components/modal/simple/component';
import Button from '/imports/ui/components/button/component';
import ExternalVideoService from '/imports/ui/components/external-video-player/service';
import Service from '/imports/ui/components/actions-bar/service';

import { defineMessages, injectIntl } from 'react-intl';
import { isUrlValid } from '/imports/ui/components/external-video-player/service';

import { styles } from './styles';

const intlMessages = defineMessages({
  start: {
    id: 'app.externalVideo.start',
    description: 'Share external video',
  },
  stop: {
    id: 'app.externalVideo.stop',
    description: 'Stop sharing',
  },
  urlError: {
    id: 'app.externalVideo.urlError',
    description: 'Not a video URL error',
  },
  input: {
    id: 'app.externalVideo.input',
    description: 'Video URL',
  },
  urlInput: {
    id: 'app.externalVideo.urlInput',
    description: 'URL input field placeholder',
  },
  title: {
    id: 'app.externalVideo.title',
    description: 'Modal title',
  },
  close: {
    id: 'app.externalVideo.close',
    description: 'Close',
  },
  note: {
    id: 'app.externalVideo.noteLabel',
    description: 'provides hint about Shared External videos',
  },

  sharevideoTitleLabel: {
    id: 'app.externalVideo.titleLabel',
    description: 'share video title label',
  },
  sharenowLabel: {
    id: 'app.externalVideo.sharenowLabel',
    description: 'share now label',
  },
});

class ExternalVideoModal extends Component {
  constructor(props) {
    super(props);

    const { videoUrl } = props;

    this.state = {
      url: videoUrl,
      sharing: videoUrl,
    };

    this.startWatchingHandler = this.startWatchingHandler.bind(this);
    this.updateVideoUrlHandler = this.updateVideoUrlHandler.bind(this);
    this.renderUrlError = this.renderUrlError.bind(this);
    this.updateVideoUrlHandler = this.updateVideoUrlHandler.bind(this);
  }

  startWatchingHandler() {
    const {
      startWatching,
      closeModal,
    } = this.props;

    const { url } = this.state;

    startWatching(url.trim());
    closeModal();
  }

  updateVideoUrlHandler(ev) {
    this.setState({ url: ev.target.value });
  }

  renderUrlError() {
    const { intl } = this.props;
    const { url } = this.state;

    const valid = (!url || url.length <= 3) || isUrlValid(url);

    return (
      !valid
        ? (
          <div className={styles.urlError}>
            {intl.formatMessage(intlMessages.urlError)}
          </div>
        )
        : null
    );
  }

  stopExternalVideo() {
    ExternalVideoService.stopWatching()
    console.log("stoped")
  }

  render() {
    const { intl, closeModal } = this.props;
    const { url, sharing } = this.state;
    const startDisabled = !isUrlValid(url);

    return (
      <div className={styles.extPlayerDiv}>
        {/* <header data-test="videoModalHeader" className={styles.header}>
          <h3 className={styles.title}>{intl.formatMessage(intlMessages.title)}</h3>
        </header> */}
        <div className={styles.shareVidTitle}>
          <h3>{intl.formatMessage(intlMessages.sharevideoTitleLabel)}</h3>
        </div>

        <div className={styles.shareVidDiv}>
          <div className={styles.content}>
            <div className={styles.videoUrl}>
              <h4>{intl.formatMessage(intlMessages.input)}</h4>
              <label htmlFor="video-modal-input">
                <input
                  id="video-modal-input"
                  onChange={this.updateVideoUrlHandler}
                  name="video-modal-input"
                  placeholder={intl.formatMessage(intlMessages.urlInput)}
                  disabled={sharing}
                  aria-describedby="exernal-video-note"
                />
              </label>

            </div>
            {
              Service.isSharingVideo() ?
                <button className={styles.startBtn} onClick={this.stopExternalVideo}>
                  {intl.formatMessage(intlMessages.stop)}
                </button>
                :
                <button
                  className={styles.startBtn}
                  // label={intl.formatMessage(intlMessages.start)}
                  onClick={this.startWatchingHandler}
                  disabled={startDisabled}
                >{intl.formatMessage(intlMessages.sharenowLabel)}</button>
            }

            <div className={styles.externalVideoNote} id="external-video-note">
              {intl.formatMessage(intlMessages.note)}
            </div>
            <div>
              {this.renderUrlError()}
            </div>
          </div>
        </div>
      </div>
      // <Modal
      //   overlayClassName={styles.overlay}
      //   className={styles.modal}
      //   onRequestClose={closeModal}
      //   contentLabel={intl.formatMessage(intlMessages.title)}
      //   hideBorder
      // >

      // </Modal>
    );
  }
}

export default injectIntl(withModalMounter(ExternalVideoModal));
