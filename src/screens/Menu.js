import { View } from 'native-base'
import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JanelaPerfil from '../screens/JanelaPerfil.js'
import Home from '../screens/Home';
import Notificacoes from './Notificacoes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();

export default function Menu({ navigation }) {
    const [numberNotifications, setNumberNotifications] = useState(0);
    const { userUid } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRef = firestore()
                    .collection("users")
                    .doc(userUid)
                    .collection("Mensagens");

                const querySnapshot = await usersRef.get();
                const n = querySnapshot.size; // Obtém o número de documentos retornados
                setNumberNotifications(n);
            } catch (error) {
                console.log("Erro ao obter as notificações:", error);
            }
        };

        fetchData(); // Obtém as notificações iniciais

        const unsubscribe = firestore()
            .collection("users")
            .doc(userUid)
            .collection("Mensagens")
            .onSnapshot(() => {
                fetchData(); // Atualiza o número de notificações quando houver alterações
            });

        return () => {
            unsubscribe(); // Cancela a inscrição no snapshot quando o componente for desmontado
        };
    }, []);
      

    return (
        <View style={{ flex: 1, }}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'JanelaPerfil') {
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                        } else if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Notificações') {
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#DB4D37',
                    tabBarInactiveTintColor: '#667466',
                })}
           
            >
                <Tab.Screen
                    name="JanelaPerfil"
                    component={JanelaPerfil}
                    options={{
                        title: 'Perfil',
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: 'Home',
                        headerShown: false
                    }}
                />
               <Tab.Screen
                    name="Notificações"
                    component={Notificacoes}
                    options={{
                        title: 'Notificações',
                        headerShown: false,
                        tabBarBadge: numberNotifications > 0 ? numberNotifications : null
                    }}
                />

            </Tab.Navigator>
        </View>
    )
}