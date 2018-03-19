import React from "react";

export class SearchPage extends React.Component {
  render() {
    return (
      <div class="topcorner">
          <p><b>Project Name</b>: {{ name }}</p>
          <p><b>Student Names</b>:</p>
          {% for netid in netids %}
            {{netid}}<br>
          {% endfor %}
      </div>
      <form class="form-inline global-search">
          <h1 style="font-size: 55px; font-family:Futura; color: #4285F4">
              C
              <font color=#EA4335>S</font>
              <font color=#FBBC05>4</font>
              3
              <font color=#34A853>0</font>
              <font color=#EA4335>0</font>
          </h1>

          <br><br>

          <div class="form-group">
              <input id="input" type="text" name="search" class="form-control" placeholder="Your Input">
          </div>
          <button type="submit" class="btn btn-info"> Go! </button>
      </form>
      <form class="form-inline global-search">
      {% if data %}
          <h1>{{output_message}}</h1>
          {% for d in data %}
              <br>
              <p>{{d}}</p>
          {% endfor %}
      {% endif %}
      </form>
    );
  }
}
