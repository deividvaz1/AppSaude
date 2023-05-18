# Aplicativo Saúde
## (Finalizado) - 03/05/2023
### Este projeto é aplicativo genérico para planos de saúde, permite enviar informações de um cartão virtual por NFC e recebe notificações personalizadas!

Foi criado um protótipo de website para o Saúde Web, acessível em:
https://github.com/deividvaz1/Web-Notification

O website está hospedado no Vercel. Você pode acessá-lo por meio do link: : 
https://web-notification-phi.vercel.app/

## Sobre o App!

<div align="center">
<img src="/src/assets/IPE-App.gif" width="270" height="555">
</div>

A ideia do app é simples, substituir um cartão físico, acessar as informações do usuário e  permitir as opções do site dentro do celular pessoal!

O Cartão vai permitir NFC(Aproximação), as informações são obtidas por API e mostradas na tela.

O Desenvolvimento foi feito em React que usa linguagem de JavaScript. É necessário buscar entender o Expo GO, React, Native Base, Firebase, APIs e o funcionamento do NFC!

O projeto foi finalizado até o nível de protótipo e foi assumido pela PROCERGS para o desenvolvimento do produto final! Se vc quiser testar o aplicativo, basta baixar o [APK](/Apk%20Donwload/application-e2c8e862-80e5-4b41-a43e-585c4c562cfd.apk).

Se vc deseja clonar este projeto é importante saber que alguns arquivos precisam ser alterados e outros foram removidos para garantir a segurança das informações!

- [x] ~~android/app/google-services.json~~
- [x] firebase.js
- [x] src/screens/Login.js
- [x] src/screens/Registro.js

## Build: 
Criar local.properties na pasta android:  sdk.dir=C:\\Users\\SEU_USUÁRIO\\appData\\Local\\Android\\Sdk

## Build Preview
Para criar a preview pelo EAS precisei remover "org.gradle.java.home=C:\\Program Files\\Java\\jdk-19" da última linha de código do arquivo gradle.properties!
Caso isso corrompa o funcionamento futuro, basta reescrever no arquivo android.

## O que falta?

Atualizamos as cores e o app funciona sem conectar as APIs!
- [x] logo
- [x] Android Manifest
- [x] Imagens/Assets
- [X] Verificar Cores
- [x] Adicionar alterações no usuário no FB
- [x] Código do IPE notificações
- [x] Criar usuário e mensagens
- [x] Expo go e o project ID
- [x] Firebase
- [x] Confirmar se a mensagem em background funciona no apk!!
