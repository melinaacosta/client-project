import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private firestore: Firestore) {}

  addClient(client: Client) {
    const clientsCollection = collection(this.firestore, 'clients'); // trabajar con la colección clients
    return addDoc(clientsCollection, client); // guarda el objeto que recibe
  }
}
