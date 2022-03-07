export interface FormResult {
    _id: string;
    deleted: boolean;
}
export type FormHandler<Result> =
    | {
          onCreated: (data: Result) => void;
          onDeleted: (data: Result) => void;
          onUpdated: (data: Result) => void;
      }
    | ((data: Result) => void);
