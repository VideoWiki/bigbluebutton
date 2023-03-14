import { withTracker } from 'meteor/react-meteor-data';
import { getModal } from '/imports/ui/components/modal/service';

export default withTracker(() => ({
  modalComponent: getModal(),
}))(({ modalComponent }) => modalComponent);
