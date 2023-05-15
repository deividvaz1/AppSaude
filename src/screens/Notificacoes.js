import React, { useContext } from 'react'
import { Notification } from '../components/Notification';
import { FlatList, View, Text, ScrollView } from 'native-base'
import { AuthContext } from '../contexts/AuthContext';

export default function Notificacoes() {
      
    return (
      <>
      <ScrollView bg={"white"}>
        <View backgroundColor='#DB4D37' height={55} alignItems='center' paddingY={2} flexDirection='row' borderBottomRadius={15} justifyContent='center'>
          <Text fontSize={20} color='white'>Notificações</Text>
        </View>
        <View bg="white" w="100%" flex={1} alignItems="center">
        <Notification  />
        </View>
        </ScrollView>
      </>
    );
  }