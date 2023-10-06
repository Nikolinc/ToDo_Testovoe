import "./profile.css";
import { ReactComponent as Notification } from "assets/notifications.svg";

export default function Profile() {
  return (
    <div className="component profile">
      <img
        src="https://avatars.githubusercontent.com/u/54713704?v=4"
        alt="Profile_Image"
        className="profile-image"
      />
      <p>Tsigulksy Nikita</p>
      <div className="svg">
        <Notification />
      </div>
    </div>
  );
}
