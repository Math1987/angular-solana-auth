import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SolWalletsService } from 'angular-sol-wallets';
import { environment } from 'src/environments/environment';
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
    public userS : UserService
  ){

  }
  connect(){
    this.userS.connect();
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
