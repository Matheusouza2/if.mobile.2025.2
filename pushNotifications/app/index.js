import { useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "../services/registerForPushNotificationAsync";
import * as Notifications from "expo-notifications";
import { Button, View } from "react-native";

export default function App() {
  const [pushToken, setPushToken] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notificação recebida:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((received) => {
        console.log("O usuário clicou na notificação", received);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function sendPushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação de teste",
        body: "Esta é uma notificação enviada do aplicativo!",
      },
      trigger: null,
    });
  }

  return (
    <View>
      <Button title="Enviar notificação" onPress={sendPushNotification} />
    </View>
  );
}
