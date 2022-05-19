import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrence } from '../actions';

class Wallet extends React.Component {
  componentDidMount = () => {
    const { fetchCurrenceProps } = this.props;
    fetchCurrenceProps();
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <header data-testid="email-field">
          { email }
        </header>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
        <div>TrybeWallet</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { email: state.user.email };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenceProps: () => dispatch(fetchCurrence()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrenceProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
