import React from 'react';
import Main from './components/Main';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import About from "./components/About";
import Contact from "./components/Contact";
import UserProvider from './providers/UserProvider';
import MessagingFunction from './components/MessagingFunction';
import PaperProvider from './providers/PaperProvider';
import PasswordReset from './components/PasswordReset';
import EditProfile from './components/EditProfile';
import Loading from './resources/loading';

export default function App() {
  return (
    <UserProvider>
    <PaperProvider>
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <SignInPage />
          </Route>
          <Route path="/about">
            <AboutPage/>
            <MessagingPage/>
          </Route>
          <Route path="/contact">
            <ContactPage/>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <Route path="/passwordReset">
            <PasswordResetPage />
          </Route>
          <Route path="/editProfile">
            <EditProfilePage />
          </Route>
          <Route path="/loading">
            <LoadingPage />
          </Route>
        </Switch>
      </div>
    </Router>
    </PaperProvider>
    </UserProvider>
  );
}
// You can think of these components as "pages"
// in your app.

function AboutPage() {
  return (
    <div>
      <About/>
    </div>
  );
}

function MessagingPage() {
  return (
    <div>
      <MessagingFunction/>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <Contact/>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <Main />
    </div>
  );
}

function SignUpPage(){
  return(
    <div>
      <SignUp />
    </div>
  );
}

function SignInPage(){
    return(
      <div>
        <SignIn />
      </div>
    );
}

function PasswordResetPage(){
  return(
    <PasswordReset />
  )
}


function EditProfilePage(){
  return(
    <EditProfile />
  )
}

function LoadingPage (){
  return (
    <Loading />
  )
}
