import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert } from "react-native";

const confirmPopUp = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(
      "Error!",
      "Found a user with same user id on this device, do you want login again?",
      [
        {
          text: "Yes",
          onPress: () => resolve(true),
          style: "default",
        },
        {
          text: "No",
          onPress: () => resolve(false),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  });
};
export const userCreatedSuccessPopUp = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(
      "signup Successfull",
      "User created successfully, press 'Ok' to redirect to Login page.",
      [
        {
          text: "Ok",
          onPress: () => resolve(true),
          style: "default",
        },
      ],
      { cancelable: true }
    );
  });
};
const loginFalsePopUp = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(
      "Login failed",
      messages.user.returnMessage,
      [
        {
          text: "Ok",
          onPress: () => resolve(true),
          style: "default",
        },
      ],
      { cancelable: true }
    );
  });
};
const loginFalsePopUp01 = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(
      "Login failed",
      messages.user.returnMessage,
      [
        {
          text: "Ok",
          onPress: () => resolve(true),
          style: "default",
        },
        {
          text: "No",
          onPress: () => resolve(false),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  });
};

const loginInfoSavePopUp = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(
      "Are you sure?",
      "Do you want to save the login credientials?",
      [
        {
          text: "Ok",
          onPress: () => resolve(true),
          style: "default",
        },
        {
          text: "No",
          onPress: () => resolve(false),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  });
};

interface CREATE_USER {
  userName: string;
  userID: string;
  password: string;
  confirmPassword: string;
}
interface LOGIN_USER {
  userID: string;
  password: string;
}

export const userController = {
  createUser: async ({
    userName,
    userID,
    password,
    confirmPassword,
  }: CREATE_USER) => {
    try {
      if (!userName || !userID || !password || !confirmPassword) {
        messages.user.returnMessage = "empty values are not allowed.";
        return false;
      }
      if (userName.trim().length > 14 || userName.trim().length < 6) {
        messages.user.returnMessage =
          "username should between 6-14 characters.";
        return false;
      }
      if (userID.length > 14 || userID.length < 6) {
        messages.user.returnMessage = "user ID should between 6-14 characters.";
        return false;
      }
      if (password.trim() !== confirmPassword.trim()) {
        messages.user.returnMessage = "password didn't matched!";
        return false;
      }

      const alreadyLoggedin = await AsyncStorage.getItem("face");

      console.log(alreadyLoggedin);

      if (
        alreadyLoggedin !== null &&
        alreadyLoggedin === `bilbribvief2jf2j9cwu${userID.trim()}bibr672u`
      ) {
        const userRes = await confirmPopUp();
        if (userRes) {
          await AsyncStorage.multiRemove(["face", "pair", "userName"]);
          return false;
        } else {
          messages.user.returnMessage =
            "user exists, try signing up with a different id.";
          return false;
        }
      }

      if (alreadyLoggedin === `bilbribvief2jf2j9cwu${userID.trim()}bibr672u`) {
        await AsyncStorage.multiRemove(["face", "pair", "userName"]);
        messages.user.status = "signupClashed";
        messages.user.returnMessage = "please login again!";
        return false;
      }
      await AsyncStorage.multiSet([
        ["face", `bilbribvief2jf2j9cwu${userID.trim()}bibr672u`],
        ["pair", `vyv9Beb2${password.trim()}cv228cvei1ubc;bec`],
        ["userName", userName.toString().trim()],
      ]);
      messages.user.status = "signupOk";
      return true;
    } catch (error) {
      console.log(error);
      messages.user.status = "signupNot";
      return false;
    }
  },
  loginUser: async ({ userID, password }: LOGIN_USER) => {
    try {
      // const resetTimer = 15000;
      // let loginTry = 0;
      if (!userID || !password) {
        messages.user.returnMessage = "empty values are not allowed.";
        return false;
      }

      if (userID.trim().length > 14 || userID.trim().length < 6) {
        messages.user.returnMessage = "user ID should between 6-14 characters.";
        return false;
      }
      const pass = await AsyncStorage.multiGet(["face", "pair", "userName"]);
      // if (messages.user.status === "loginOk") {
      //   messages.user.returnMessage =
      //     "Already logged in, would you like to logout n' again?";
      //   const userResponse = await loginFalsePopUp01();
      //   if (userResponse) {
      //     await AsyncStorage.multiRemove(["face", "pair", "userName"]);
      //     messages.user.status = "loginNot";
      //     messages.user.returnMessage = "success";
      //     return false;
      //   }
      //   else{
      //     return true;
      //   }
      // }

      if(pass !== null){
        messages.user.returnMessage = `Welcome ${pass[2][1]}`
        return true;
      }

      // verifyyyyyyyyy
      if (pass[0][1] === null || pass[0][0] === null) {
        messages.user.status = "loginNot";
        messages.user.returnMessage = "no user exists";
        return false;
      }
      if (pass[0][1] !== `bilbribvief2jf2j9cwu${userID.trim()}bibr672u`) {
        messages.user.status = "loginNot";
        messages.user.returnMessage = "no user found with this ID";
        return false;
      }
      if (pass[1][1] !== `vyv9Beb2${password}cv228cvei1ubc;bec`) {
        // loginTry += 1;
        messages.user.returnMessage = "incorrect password";
        await loginFalsePopUp();
        return false;
        // return (messages.user.returnMessage = `login attempt(s) ${loginTry} (${(loginTry -= 1)}left)`);
      }

      // login attemps logic

      //   if (loginTry >= 4) {
      //     messages.user.returnMessage = "too many tries";
      //     messages.user.status = "stop";
      //     return (messages.user.returnMessage = `try again in ${
      //       resetTimer / 1000
      //     }s`);
      //   }
      //  setTimeout(() => {
      //   messages.user.status = "stop";
      //   }, resetTimer);

      messages.user.status = "loginOk";
      messages.user.returnMessage = "login success!";
      return true;
    } catch (error) {
      console.log(error);
      messages.user.status = "loginNot";
      messages.user.returnMessage = "please try again";
      return false;
    }
  },
  alreadyLoggedIn:async()=>{
    const pass = await AsyncStorage.multiGet(["face", "pair", "userName"]);
      if(pass !== null){
        return true;
      }
      else{
        return false;
      }
  },
  logoutUser: async () => {
    try {
      const user = await AsyncStorage.getItem("face");
      if (user === null) {
        messages.user.returnMessage = "unauthorised action!";
        return false;
      }
      const userRes = await loginInfoSavePopUp();
      if (userRes) {
        messages.user.returnMessage ='logout success'
        return true};
      await AsyncStorage.multiRemove(["face", "pair", "userName"]);
      messages.user.status = "logoutOk";
      messages.user.returnMessage = "logout success";
      return true;
    } catch (error) {
      console.log(error);
      messages.user.status = "logoutNot";
      return false;
    }
  },
};

interface MESSAGE {
  error: {
    emptyField: string;
    userUnavailable: string;
    incorrectID: string;
    incorrectPassword: string;
  };
  user: {
    status:
      | "loginOk"
      | "loginNot"
      | "loginClashed"
      | "signupOk"
      | "signupNot"
      | "signupClashed"
      | "logoutOk"
      | "logoutNot"
      | "";
    returnMessage: string;
  };
}

export let messages: MESSAGE = {
  error: {
    emptyField: "*Required",
    userUnavailable: "user not found",
    incorrectID: "Incorrect username or ID",
    incorrectPassword: "password didn't matched",
  },
  user: {
    status: "",
    returnMessage: "",
  },
};
