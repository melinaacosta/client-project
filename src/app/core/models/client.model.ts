export interface Client {
  id?: string; // El id es opcional porque Firestore lo genera automáticamente.
  name: string;
  lastName: string;
  age: number;
  birthDate: string;
}
