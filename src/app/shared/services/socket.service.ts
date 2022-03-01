import { Injectable } from '@angular/core';
import * as Socket from "socket.io-client" ;
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket : Socket.Socket | null = null ;

  constructor() { 

  }
  connect(){


    this.socket = Socket.io(`${environment.apiURL}`, {
      extraHeaders: {
        Authorization: localStorage.getItem("token")!
      }
    });
    this.socket.connect();



    //@ts-ignore
    this.socket?.emit('message', "Can you confirm me my publicKey please?", res => {

      console.log('pubkey from server', res );

    });


  }
  disconnect(){

    this.socket?.disconnect() ;

  }


}
