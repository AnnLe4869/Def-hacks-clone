import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import Header from "../../common/header/AppBarHeader";
import LogIn from "./login/LogIn";

import { Redirect, Route, Switch } from "react-router-dom";
import EmailInput from "./email/EmailInput";
import EmailVerification from "./email/EmailVerification";

export default function Auth() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Switch>
          <Route path="/auth" exact component={LogIn} />
          <Route path="/auth/email" exact component={EmailInput} />
          <Route
            path="/auth/email/verification"
            component={EmailVerification}
          />
          <Redirect to="/auth" />
        </Switch>
      </Container>
    </>
  );
}
