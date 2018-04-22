import React from "react";
import Paper from 'material-ui/Paper';

import '../styles/footer';

export class Footer extends React.PureComponent {
  render() {
    return (
      <Paper className="footer">
        <p>Copyright 2018 Movie Minorities Team | All Rights Reserved</p>
        <p style={{fontSize: 15}}>Michael Hu (mh2386), Lavanya Aprameya (la334), Lev Akabas (la286), Raghav Batra (rb698)</p>
      </Paper>
    );
  }

}
