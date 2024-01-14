export interface Customer {
  name: string;
  hostname: string;
}

export interface CustomerRepository {
  getCustomerByHostname(hostname: string): Promise<Customer>;
}
