declare type str = string;
declare type bool = boolean;
declare type num = number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Any = any;

declare interface InTags {
  tags: Array<{key: number; label: string}>;
  banner: {
    id?: number,
    tags?: Array<{id: number; label: string}>;
    createdAt?: number,
    updatedAt?: number,
    title?: string,
    imageUrl?: string,
    thumbnailUrl?: string,
  }
}

declare interface InAppState {
  navCollapsed: boolean;
  pathname: string;
  width: number;
  locale: 'EN' | 'ES';
  mode: 'light' | 'dark';
}

declare interface MainStorage {
  auth: {
    userToken: string;
    dateLogin: string;
    userType: string;
    loader: boolean;
    dataUser: {
      id: string;
      points: number;
      email: string;
      name: string;
      language: 'EN' | 'ES';
      plan: 'BASIC' | 'MEDIUM' | 'PREMIUN';
    };
  };
  app: InAppState;
}

declare type IterableObject = {
  [a: string]: object | string | number;
};

declare module '*.png' {
  const value: string;
  export default value;
}

declare interface PromiseAcc {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}
