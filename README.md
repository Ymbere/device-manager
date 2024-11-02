# How to run

In order to run this app you will need to have the back-end server for the APP, you can get it here [Device Manager Back-End](https://github.com/NinjaRMM/devicesTask_serverApp), download the app on your machine and start it.

Its recommended to change the default port where the Back-End runs on the file `libs/middlewares.js` or create a .env variable that contains the PORT.

To run the Back-End copy and run the following command

```bash
npm run start
```

Download the Front-End project to your machine and start it, depending on which port your Back-End in running you will need to change it on `src/consts.ts` and update the `BASE_API_URL` variable which contain the URL to where the Front-End will request.

To run the Front-End copy and run the following command

```bash
npm run start
```
# Demo

https://github.com/user-attachments/assets/6c7f450c-d66b-429a-a88f-f1a956249fea

