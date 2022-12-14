import moment from "moment";
import { Timestamp } from "../backend/db/firestore";

export const createTimestamp = () => {
  return Timestamp.now().toMillis().toString();
};

export const formatTime = (timestamp) => {
  return moment(parseInt(timestamp, 10)).fromNow();
};
