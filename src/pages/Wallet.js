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
    const { email, moeda } = this.props;
    return (
      <div>
        <header data-testid="email-field">{email}</header>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
        <div>TrybeWallet</div>
        <form>
          <label htmlFor="valor">
            Valor
            <input data-testid="value-input" name="valor" type="text" />
          </label>
          <label htmlFor="despesa">
            Descrição da Despesa
            <input name="despesa" data-testid="description-input" type="text" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select name="moeda" id="moeda">
              {/* <option value={ moeda }>{moeda}</option> */}
              {/* <option value={moeda.map((item) => item)}>
                {moeda.map((item) => item)}
              </option> */}
              {moeda.map((item) => (
                <option key="item" value={ item }>{item}</option>
              ))}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de Pagamento
            <select data-testid="method-input" name="metodo" id="metodo">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartaoCredito">Cartão de crédito</option>
              <option value="cartaoDebito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select data-testid="tag-input" name="categoria" id="categoria">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    email: state.user.email,
    moeda: state.wallet.currencies,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenceProps: () => dispatch(fetchCurrence()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  moeda: PropTypes.string.isRequired,
  fetchCurrenceProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
