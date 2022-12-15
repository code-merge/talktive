export default {
  setup() {
    if (!("Notification" in window)) {
      console.log("Browser Dosent Support Notifications.");
    } else if (Notification.permission === "granted") {
      return;
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permission Granted");
        }
      });
    }
  },

  showNotification({ title, body }) {
    new Notification(title, { body });
  },
};
