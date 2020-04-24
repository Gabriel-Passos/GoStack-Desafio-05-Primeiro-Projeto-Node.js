import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new Error('Você não possui saldo suficiente.');
    }

    if (type === 'income' || type === 'outcome') {
      const transactionsRepository = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transactionsRepository;
    }

    throw new Error('Tipo inválido.');
  }
}

export default CreateTransactionService;
