import { Amplify } from "aws-amplify";
import "./App.css";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import SongList from "./components/SongList";

import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App({ signOut, user }) {
  console.log(user);
  return (
    <div className="App">
      <header className="App-Header">
        <h1>WELCOME TO SPOOKIFY {user.attributes.email}</h1>
        <button onClick={signOut}>Sign out</button>
      </header>
      <SongList />
    </div>
  );
}

export default withAuthenticator(App);
