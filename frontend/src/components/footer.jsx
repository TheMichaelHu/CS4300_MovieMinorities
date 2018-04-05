import React from "react";
import Paper from 'material-ui/Paper';

import '../styles/footer';

export class Footer extends React.PureComponent {
  render() {
    return (
      <Paper className="footer">
        <p>Copyright 2018 Movie Minorities Team | All Rights Reserved</p>
      </Paper>
    );
  }

}
