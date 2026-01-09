<div align="center">

<h1>🔔 NotifyMe</h1>
<p><strong>Local & Push Notifications in React Native with Expo</strong></p>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=22&pause=1000&color=6C63FF&center=true&vCenter=true&width=650&lines=Local+Notifications;Push+Notifications;Expo+Notifications;Schedule+&+Handle;User+Interaction" />
</a>

<br />

<p>
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Notifications-Expo-yellow?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Platform-iOS_%7C_Android-success?style=for-the-badge" />
</p>

</div>

---

## 🎨 App Focus

<div align="center">

<table>
<tr>
<td align="center">⏰<br/><b>Local Notifications</b><br/>Schedule & display<br/>Foreground & background</td>
<td align="center">📲<br/><b>Push Notifications</b><br/>Expo push tokens<br/>Send & receive</td>
<td align="center">🔔<br/><b>User Interaction</b><br/>Handle taps<br/>Custom alerts</td>
<td align="center">⚙️<br/><b>Permissions</b><br/>Request & verify<br/>Android & iOS</td>
</tr>
</table>

</div>

---

## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,js,vscode,git,github" />

</div>

- React Native + Expo
- Expo Notifications API
- React Hooks (`useEffect`)
- TouchableOpacity & Alert
- Fetch API (Push Notifications)

---

## ✨ Features

- ⏰ Schedule **local notifications**
- 📲 Send **push notifications** using Expo Push Token
- 🔔 Handle **incoming notifications** in foreground & background
- ⚙️ Request permissions on iOS & Android
- 🛠️ Configurable **Android notification channels**
- 🖥️ Handle **user interaction** with notifications

---

## 📸 Preview

<div align="center">

<img 
  src="assets/preview/preview.gif" 
  width="320" 
  style="
    border-radius:16px;
    border:1px solid #e5e7eb;
    box-shadow:0 10px 30px rgba(0,0,0,0.15);
  " 
/>

<br/><br/>

<p>
  <sub>
    Schedule, receive, and handle notifications on iOS & Android
  </sub>
</p>

</div>

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/Shivam56291/NotifyMe
cd NotifyMe

# Install dependencies
npm install
# or
yarn install

# Start Expo
npx expo start
```

## 🔥 Expo Push Notifications

1️⃣ Get device token:

```js
const token = await Notifications.getExpoPushTokenAsync();
console.log(token);
```

2️⃣ Send notification via API:

```js
fetch("https://exp.host/--/api/v2/push/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    to: "ExponentPushToken[YOUR_DEVICE_TOKEN]",
    title: "Test Notification",
    body: "This is a test",
  }),
});
```

3️⃣ Quick testing tool:

```js
https://expo.dev/notifications
```

- #### Open on Android/iOS device via Expo Go or a custom development client
- #### Scan QR code and test Schedule Notification & Send Push Notification buttons

<div align="center"> <p>Built by <strong>Shivam</strong></p> <p>Learning & implementing local and push notifications in React Native</p> </div>
