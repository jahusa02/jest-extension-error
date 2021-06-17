export interface RequestModel {
  user: {
    id: string;
  };
}

export interface ResponseModel {
  agent: {
    id: string;
    firstName: string;
    lastName: string;
    locale: string;
  };
}
