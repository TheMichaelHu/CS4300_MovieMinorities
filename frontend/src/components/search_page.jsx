import React from "react";

export class SearchPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      netids: [
        "Celine Choo: cc972",
        "Lavanya Aprameya: la334",
        "Lev Akabas: la286",
        "Michael Hu: mh2386",
        "Raghav Batra: rb698",
      ],
      name: "Chatalytics: Turn Your Friends into Numbers",
    };
  }

  renderNetids() {
    return (
      <div className="netids">
      {
        this.state.netids.map(netid => {
          return (
            <div key={netid}>
              {netid} <br />
            </div>
          )
        })
      }
     </div>
    );
  }

  render() {
    return (
      <div>
        <div className="topcorner">
            <p><b>Project Name</b>: {this.state.name}</p>
            <p><b>Student Names</b>:</p>
            {this.renderNetids()}
        </div>
        <form className="form-inline global-search">
            <h1 style={{
                fontSize: "55px",
                fontFamily: "Futura",
                color: "#4285F4",
              }}>
                C&nbsp;
                <font color="#EA4335">S&nbsp;</font>
                <font color="#FBBC05">4&nbsp;</font>
                3&nbsp;
                <font color="#34A853">0&nbsp;</font>
                <font color="#EA4335">0</font>
            </h1>

            <br /><br />

            <div className="form-group">
                <input id="input" type="text" name="search" className="form-control" placeholder="Your Input" />
            </div>
            <button type="submit" className="btn btn-info"> Go! </button>
        </form>
        <form className="form-inline global-search">

        </form>
      </div>
    );
  }
}
