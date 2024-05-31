/**
 * Domain models
 */

type Transaction = {
  ID: string;
  UserID: string;
  Mutation: number;
  Balance: number;
  Type: "deposit" | "charge";
  DepositID: string;
  ChargeID: string;
  CreatedAt: string;
  UpdatedAt: string;
};

type TransactionData = {
  ID: string;
  UserID: string;
  Amount: number;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
};

/**
 * Request and response types
 */

type InitDepositResponse = {
  data: {
    ID: string;
    UserID: string;
    Amount: number;
    Token: string;
    RedirectURL: string;
    CreatedAt: string;
    UpdatedAt: string;
  };
  message: string;
};

type GetMutationsResponse = Transaction[];

type GetDepositResponse = {
  data: TransactionData;
};

type GetMutationResponse = Transaction;

type GetChargeResponse = {
  data: {
    ID: string;
    ContainerID: string;
    UserID: string;
    TotalCpuUsage: number;
    TotalMemoryUsage: number;
    TotalNetIngressUsage: number;
    TotalNetEgressUsage: number;
    Timestamp: string;
    TotalCost: number;
  };
  message: string;
};
