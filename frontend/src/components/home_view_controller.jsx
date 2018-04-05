import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { HeaderVc } from "./header_view_controller";
import { Section } from "./section";
import { SearchBar } from "./search_bar";

import { grey900 } from 'material-ui/styles/colors';

import '../styles/home_view_controller';

export class HomeVc extends React.Component {
  render() {
    return (
      <div className="home-vc">
        <div className="logo-wrapper">
          <HeaderVc />
        </div>
        <div className="home-content">
          <div className="hero">
            <h1 className="hero-text">
              Something about demographics
            </h1>
            <SearchBar />
          </div>
          <Section title="What is this?">
            <p>A project, idk.</p>
          </Section>
          <Section title="Why are there more sections?" >
            <p>The footer ain't sticky</p>
          </Section>
        </div>
      </div>
    );
  }
}

HomeVc.propTypes = {
  router: PropTypes.objectOf(PropTypes.object),
};

HomeVc.defaultProps = {
  router: {},
};
