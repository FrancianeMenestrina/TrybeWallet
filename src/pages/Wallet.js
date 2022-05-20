import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrence, actionAddExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
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
    Object.keys(result).filter((currency) => currency !== 'USDT');
    console.log('result', result);
    this.setState(() => ({
      exchangeRates: result,
    }), () => {
      dispatchAddExpenses(this.state);
      this.setState((prev) => ({
        value: 0,
        currency: '',
        method: '',
        tag: '',
        description: '',
        id: prev.id + 1,
      }));
    });
  };

  calculaDespesa = (despesas) => {
    const subtotal = despesas.reduce((total, despesaAtual) => {
      const valorDespesa = despesaAtual.value;
      const cotacao = despesaAtual.exchangeRates[despesaAtual.currency].ask;
      const conversao = valorDespesa * cotacao;
      return conversao + total;
    }, 0);
    return subtotal.toFixed(2);
  };

  render() {
    const { email, currencies, despesas } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <header data-testid="email-field">{email}</header>
        <p data-testid="total-field">{this.calculaDespesa(despesas)}</p>
        <p data-testid="header-currency-field">BRL</p>
        <div>TrybeWallet</div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              name="value"
              type="text"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da Despesa
            <input
              name="description"
              data-testid="description-input"
              type="text"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select name="currency" id="currency" onChange={ this.handleChange }>
              {currencies.map((item) => (
                <option key={ item } value={ item }>{item}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento
            <select
              data-testid="method-input"
              name="method"
              id="method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select
              data-testid="tag-input"
              name="tag"
              id="categoria"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
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

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  despesas: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCurrenceProps: () => dispatch(fetchCurrence()),
  dispatchAddExpenses: (expense) => dispatch(actionAddExpense(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.string.isRequired,
  fetchCurrenceProps: PropTypes.func.isRequired,
  dispatchAddExpenses: PropTypes.func.isRequired,
  despesas: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
