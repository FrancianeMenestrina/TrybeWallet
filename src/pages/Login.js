import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setUserEmail } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailIsValid: false,
      passwordIsValid: false,
    };
  }

  validarInputs = (name, value) => {
    // validar email
    if (name === 'email') {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value);
    } if (name === 'password') {
      // validar pass
      const MAX_LENGTH = 6;
      return value.length >= MAX_LENGTH;
    }
  };

  handleChange = ({ target }) => {
    const isValidInput = this.validarInputs(target.name, target.value);
    this.setState({
      [target.name]: target.value,
      [`${target.name}IsValid`]: isValidInput,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, sendUserEmail } = this.props;
    const { email } = this.state;
    sendUserEmail(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, emailIsValid, passwordIsValid } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <div>Login</div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ this.handleChange }
          name="email"
          value={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ this.handleChange }
          name="password"
          value={ password }
        />
        <button type="submit" disabled={ !(emailIsValid && passwordIsValid) }>
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendUserEmail: (email) => dispatch(setUserEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendUserEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
