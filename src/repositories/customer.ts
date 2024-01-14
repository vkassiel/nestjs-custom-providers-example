import { Customer, CustomerRepository } from './customer-repository';

export class InMemoryCustomerRepository implements CustomerRepository {
  async getCustomerByHostname(hostname: string): Promise<Customer> {
    const CUSTOMERS = [
      {
        name: 'Sky Net',
        hostname: 'skynet',
      },
      {
        name: 'Umbrella Corp',
        hostname: 'umbrellacorp',
      },
    ] satisfies Customer[];

    const customer = CUSTOMERS.find(
      ({ hostname: customerHostname }) => customerHostname === hostname,
    );
    return customer;
  }
}
