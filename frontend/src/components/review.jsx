import React from "react";
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import '../styles/review';

export class Review extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showReview: false,
    }

    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({showReview: !this.state.showReview});
  }

  renderReview() {
    if (!this.state.showReview) {
      return null;
    }

    return (
      <div className="review-display">
        {this.props.movie.imdb_reviews[0]}
      </div>
    );
  }

  render() {
    if (this.props.movie.imdb_reviews.length == 0) {
      return null;
    }

    return (
      <div className="review">
        <span className="fa fa-comments" /> <b>Review Sentiment</b>: {this.props.movie.imdb_review_sentiment}
        <FlatButton
          style={{marginLeft: 10}}
          label={this.state.showReview ? "Hide Example" : "Show Example"}
          onClick={this.toggleShow} />
        {this.renderReview()}
      </div>
    );
  }
}

Review.propTypes = {
  movie: PropTypes.object,
};

Review.defaultProps = {
  movie: {},
}
