import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Heading,
  Text,
  HStack,
  Button,
  Modal,
  IconButton,
} from "native-base";
import app_sim_saude from "../assets/app_sim_saude.png";
import { AuthContext } from "../contexts/AuthContext.js";
import firestore from "@react-native-firebase/firestore";
import { PanGestureHandler } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableHighlight, Linking } from "react-native";

export function Notification() {
  const { userUid } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    fetchData(); // Carrega as notificações iniciais
    const interval = setInterval(fetchData, 10000); // Consulta a cada 5 segundos

    return () => {
      clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
    };
  }, []);

  const fetchData = async () => {
    try {
      const usersRef = firestore()
        .collection("users")
        .doc(userUid)
        .collection("Mensagens")
        .orderBy("enviadoEm", "desc");

      const querySnapshot = await usersRef.get();
      const data = querySnapshot.docs.map((doc) => doc.data());
      setNotifications(data);
    } catch (error) {
      console.log("Erro ao obter os documentos:", error);
    }
  };

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setShowModal(false);
  };

  const deleteNotification = async (notification) => {
    try {
      const usersRef = firestore()
        .collection("users")
        .doc(userUid)
        .collection("Mensagens");

      const querySnapshot = await usersRef
        .where("enviadoEm", "==", notification.enviadoEm)
        .get();

      querySnapshot.forEach(async (doc) => {
        await doc.ref.delete();
        console.log("Notificação excluída:", doc.id);
      });

      fetchData(); // Recarrega as notificações após a exclusão
    } catch (error) {
      console.log("Erro ao excluir a notificação:", error);
    }
  };

  return (
    <>
      {notifications.length === 0 ? (
        <Text
          style={{
            fontSize: 20,
            margin: 20,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          Não há notificações disponíveis! Acesse o nosso site:                        https://web-notification-phi.vercel.app/                                                   
        </Text>
      ) : (
        notifications.map((notification) => (
          <Box
            key={notification.enviadoEm}
            width="90%"
            shadow={3}
            bg="gray.200"
            borderRadius={20}
            p={5}
            my="3"
          >
            <HStack marginBottom={3}>
              <Avatar
                borderWidth={1}
                borderColor="gray.300"
                bg="white"
                marginRight={5}
                source={app_sim_saude}
              ></Avatar>
              <Heading marginTop={3} color="gray.500" fontSize={18}>
                SAÚDE
              </Heading>
              <IconButton
                icon={
                  <MaterialCommunityIcons name="delete" size={24} color="red" />
                }
                onPress={() => deleteNotification(notification)}
                ml="auto"
              />
            </HStack>
            <Text
              fontWeight="bold"
              fontSize={16}
              color={"gray.500"}
              marginBottom={1}
            >
              {notification.titulo}
            </Text>
            <Text
              textAlign="justify"
              color={"gray.800"}
              height={69}
              flexWrap="nowrap"
            >
              {notification.pergunta}
            </Text>
            <Button
              p={0}
              m={0}
              h={18}
              alignItems="center"
              bgColor="gray.200"
              onPress={() => openModal(notification)}
              alignSelf="flex-end"
              _text={{ color: "#DB4D37" }}
            >
              Ler mais...
            </Button>
          </Box>
        ))
      )}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        _backdrop={{ _dark: { bg: "coolGray.800" }, bg: "warmGray.50" }}
      >
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>{selectedNotification?.titulo}</Modal.Header>
          <Modal.Body>{selectedNotification?.pergunta}</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}