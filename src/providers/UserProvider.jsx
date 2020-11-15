import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../service/firebase";

//Creates initial user to avoid null errors
const initUser = {
  firstName: "",
  lastName: "",
  papers: [],
};

//export const UserContext = createContext({ user: initUser});

class UserProvider extends Component {
  state = {
    user: initUser,
  };

  //When the component mounts or if auth state changes, generate User document from firestore and set state to user
  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth); //think problem is here with await
      this.setState({ user: user });
    });
  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
//Creates user context
export const UserContext = createContext({ user: UserProvider });

export default UserProvider;
