import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/AppBarHeader";
import EmailInput from "./email/EmailInput";
import LogIn from "./root/LogIn";

export default function Auth() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Switch>
          <Route path="/auth" exact component={LogIn} />
          <Route path="/auth/email" exact component={EmailInput} />

          <Redirect to="/auth" />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}
