import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private firestore: Firestore) {}

  addClient(client: Client) {
    const clientsCollection = collection(this.firestore, 'clients'); // trabajar con la colección clients
    return addDoc(clientsCollection, client); // guarda el objeto que recibe
  }

  getClients(): Observable<Client[]> {
    const clientsCollection = collection(this.firestore, 'clients');
    return collectionData(clientsCollection, {
      idField: 'id',
    }) as Observable<Client[]>;
  }
}
