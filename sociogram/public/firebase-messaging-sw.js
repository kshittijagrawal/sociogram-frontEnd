importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig2 = {
  apiKey: "AIzaSyAms2o7UXga55RC80gWbblyYC0o27JFPe0",
  authDomain: "pushnotification-e8b94.firebaseapp.com",
  projectId: "pushnotification-e8b94",
  storageBucket: "pushnotification-e8b94.appspot.com",
  messagingSenderId: "208170573038",
  appId: "1:208170573038:web:bfdba70ef87765a9fbe7ff",
  measurementId: "G-C00FLY3MZG",
};
firebase2.initializeApp(firebaseConfig2);
const messaging = firebase2.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
