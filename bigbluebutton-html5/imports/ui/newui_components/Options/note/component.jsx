import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import injectWbResizeEvent from '/imports/ui/components/presentation/resize-wrapper/component';
import Button from '/imports/ui/components/button/component';
import NoteService from '/imports/ui/components/note/service';
import { styles } from './styles';
import { PANELS, ACTIONS } from '/imports/ui/components/layout/enums';

const intlMessages = defineMessages({
  hideNoteLabel: {
    id: 'app.note.hideNoteLabel',
    description: 'Label for hiding note button',
  },
  title: {
    id: 'app.note.title',
    description: 'Title for the shared notes',
  },
  tipLabel: {
    id: 'app.note.tipLabel',
    description: 'Label for tip on how to escape iframe',
  },
});

const propTypes = {
  isLocked: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  isRTL: PropTypes.bool.isRequired,
};

const Note = ({
  isLocked,
  intl,
  isRTL,
  layoutContextDispatch,
  isResizing,
}) => {
  const [noteURL, setNoteURL] = useState();

  useEffect(() => {
    NoteService.getNoteId().then((response) => {
      console.log("response ", response)
      setNoteURL(NoteService.buildNoteURL(response));
    });
  }, [isLocked, isRTL]);

  useEffect(() => () => NoteService.setLastRevs(), []);
  console.log("url ", noteURL)
  return (
    <div
      data-test="note"
      className={styles.note}
    >
      {/* <header className={styles.header}>
        <div
          data-test="noteTitle"
          className={styles.title}
        >
          <Button
            onClick={() => {
              layoutContextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
                value: false,
              });
              layoutContextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
                value: PANELS.NONE,
              });
            }}
            data-test="hideNoteLabel"
            aria-label={intl.formatMessage(intlMessages.hideNoteLabel)}
            label={intl.formatMessage(intlMessages.title)}
            icon={isRTL ? 'right_arrow' : 'left_arrow'}
            className={styles.hideBtn}
          />
        </div>
      </header> */}
      <div className={styles.noteBox}>
        <div className={styles.noteboxWrapper}>
          <div className={styles.noteboxHeading}>
            <h3>{intl.formatMessage(intlMessages.title)}</h3>
          </div>
          <div className={styles.noteboxBottom}>
            <iframe
              title="etherpad"
              src={noteURL}
              aria-describedby="sharedNotesEscapeHint"
              style={{
                pointerEvents: isResizing ? 'none' : 'inherit',
              }}
            />
            <span id="sharedNotesEscapeHint" className={styles.hint} aria-hidden>
              {intl.formatMessage(intlMessages.tipLabel)}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

Note.propTypes = propTypes;

export default injectWbResizeEvent(injectIntl(Note));
