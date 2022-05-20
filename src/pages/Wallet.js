import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrence, actionAddExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      moeda: '',
      metodoPagamento: '',
      tag: '',
      descricao: '',
      id: 0,
      exchangeRates: {},
    };
  }

  componentDidMount = () => {
    const { fetchCurrenceProps } = this.props;
    fetchCurrenceProps();
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = async () => {
    const { dispatchAddExpenses } = this.props;
    console.log('cliquei');
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    Object.keys(result).filter((moeda) => moeda !== 'USDT');
    console.log('result', result);
    this.setState(() => ({
      exchangeRates: result,
    }), () => {
      dispatchAddExpenses(this.state);
      this.setState((prev) => ({
        valor: '',
        moeda: '',
        metodoPagamento: '',
        tag: '',
        descricao: '',
        id: prev.id + 1,
      }));
    });
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
            <input
              data-testid="value-input"
              name="valor"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="despesa">
            Descrição da Despesa
            <input
              name="despesa"
              data-testid="description-input"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select name="moeda" id="moeda" onChange={ this.handleChange }>
              {moeda.map((item) => (
                <option key="item" value={ item }>{item}</option>
              ))}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de Pagamento
            <select
              data-testid="method-input"
              name="metodo"
              id="metodo"
              onChange={ this.handleChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartaoCredito">Cartão de crédito</option>
              <option value="cartaoDebito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select
              data-testid="tag-input"
              name="categoria"
              id="categoria"
              onChange={ this.handleChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </form>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </table>
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
  dispatchAddExpenses: (expense) => dispatch(actionAddExpense(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  moeda: PropTypes.string.isRequired,
  fetchCurrenceProps: PropTypes.func.isRequired,
  dispatchAddExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
