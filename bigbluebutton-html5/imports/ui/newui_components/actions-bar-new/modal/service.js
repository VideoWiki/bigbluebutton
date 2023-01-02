import Auth from '/imports/ui/services/auth';
import Meetings from '/imports/api/meetings';

const getMeetingTitle = () => {
  const meeting = Meetings.findOne({
    meetingId: Auth.meetingID,
  }, { fields: { 'meetingProp.name': 1, 'breakoutProps.sequence': 1 } });

  return meeting.meetingProp.name;
};

export default {
  getMeetingTitle,
};
