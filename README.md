# Hotel_California_Waitlist_System_Mobile

This is the repository for Tutorial-6 of the module IT5007 at the National University of Singapore.

To run the Hotel California Waitlist System Mobile application on a virtual device, clone this repository to your computer:
```
git clone git@github.com:LiYiran98/Hotel_California_Waitlist_System_Mobile.git
```

The folder `Hotel-California-Waitlist-System` contains the backend system for the application. So before running the mobile application, follow the instructions in the `README.md` document inside the `Hotel-California-Waitlist-System` directory to configure the backend system. Note that you can omit the step 'Delete the Test Data', letting the test data remain in the database for test use. After configuration, you can open `localhost:3000` on the web browser to check if the server is working correctly.

To run the application, you should make sure the development environment of React Native has been set up successfully on your computer. A workable installation process on windows can refer to this document: https://dev-yakuza.posstree.com/en/react-native/install-on-windows/ Make sure the version of Node.js is `v12.6.0`. To install a specific version of Node.js, you may refer to this document: https://aijishu.com/a/1060000000097167

After setting up the environment, back to the `Hotel_California_Waitlist_System_Mobile` directory and use `npm install` to install all the dependencies:
```
npm install
```

Due to security reason, we cannot simply use `localhost` as the default hostname in the uri of ApolloClient. So before running the project, we need to replace the ip address in the file `App.js` line 29 with the ip address of your own computer. A new ApolloClient should looks like:
```
const client = new ApolloClient({ uri: 'http://{your own ip address}:3000/graphql' });
```

After that, run the project:
```
npx react-native run-android
```
You will be able to see the waitlist appear on your virtual android device.
