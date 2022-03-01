import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SolWalletsService } from 'angular-sol-wallets';
import { environment } from 'src/environments/environment';
import { SocketService } from './shared/services/socket.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(
    private walletsS : SolWalletsService,
    public userS : UserService,
    private socketS : SocketService
  ){

    this.walletsS.autoConnect = true ;
    this.walletsS.setEnabledWallets(["Phantom"]);

  }
  connect(){
    this.userS.connect().then( co =>{
      this.socketS.connect();
    });
  }
  disconnect(){
    this.userS.disconnect();
    this.socketS.disconnect();
  }
  update(){
    const pseudo = (document.querySelector("#pseudo") as HTMLInputElement).value ;
    this.userS.update({ pseudo });
  }
  sendTransaction(){
      this.walletsS.signAndSendTransfer( this.walletsS.selected!.publicKey!.toString(), 0.1).then( signature => {
        console.log(signature);
      });
  }



}
