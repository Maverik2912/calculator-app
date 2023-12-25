export type WithIdOrNever<T> = (T extends {id: string} ? T : never);
