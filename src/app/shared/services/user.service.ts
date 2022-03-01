import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolWalletsService } from 'angular-sol-wallets';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

type User = {
  _id : string,
  address : string,
  pseudo? : string,
} | null ;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  datas : ReplaySubject<User> = new ReplaySubject();

  constructor(
    private walletsS : SolWalletsService,
    private http : HttpClient
  ) {

    this.getUser().then( user => {

      console.log('user is connected');
      this.refreshToken();

    }).catch( err => {

    });

  }

  getUser(){
    return new Promise((resolve, reject) => {

      if ( localStorage.getItem('token') ){

        this.http.get(`${environment.apiURL}/user/get`).subscribe( userDatas => {
          this.datas.next(userDatas as User);
          resolve(userDatas as User);
        }, err => {
          reject(err);
          console.log('Error geting user.');
        });
      
      }else{
        reject("No token found.");
      }
        
    });
  }

  connect(){
    return new Promise((resolve, reject) => {

      this.walletsS.connect().then( w => {

        const address = this.walletsS.getPublicKey() ;
        console.log('address', address );

        this.http.get(`${environment.apiURL}/messageSample?address=${address}`).subscribe( messageSampleR => {
          const a = async () => {
            try{
              const message = (messageSampleR as any).message ;
              const signature = await this.walletsS.signMessage(message) ;
              console.log('signed message', signature);
              const address = this.walletsS.selected?.publicKey ;
              this.http.post(`${environment.apiURL}/user/connect`, { address, signedMessage : signature}).subscribe( response => {

                this.datas.next( (response as any).user as User );
                localStorage.setItem('token', (response as any).token );
                resolve((response as any).user);

              }, err => {
                console.log('error connect');
                reject(err);
              });
            }catch(err) {
              console.log('error connect');
              reject(err);
            }
          };
          a();
        }, err => {
          console.log('error message', err);
          reject(err);
        });
      });
    });


  }
  refreshToken(){
    return new Promise<any>((resolve, reject) => {

      this.http.get(`${environment.apiURL}/user/refreshToken`).subscribe( tokenO => {

        console.log('new token', tokenO );
        localStorage.setItem('token', (tokenO as any).token  );

      }, err => {

      });

    })
  }
  disconnect(){
    this.datas.next(null);
    localStorage.removeItem('token');
  }

  update( datas : any ){

    this.http.get(`${environment.apiURL}/messageSample?code=1`).subscribe( messageSampleR => {
      const a = async () => {
        try{
          const message = (messageSampleR as any).message ;
          const signature = await this.walletsS.signMessage(message) ;
          const address = this.walletsS.selected?.publicKey ;
          this.http.post(`${environment.apiURL}/user/update`, { address, signedMessage : signature, datas}).subscribe( response => {

            console.log(response);
            this.datas.next( (response as any) as User );

          }, err => {
            console.log('error connect');
          });
        }catch(err) {
          console.log('error connect');
        }
      };
      a();
    }, err => {
      console.log('error message', err);
    });

  }

  remove(){

    this.http.get(`${environment.apiURL}/messageSample?code=2`).subscribe( messageSampleR => {
      const a = async () => {
        try{
          const message = (messageSampleR as any).message ;
          const signature = await this.walletsS.signMessage(message) ;
          const address = this.walletsS.selected?.publicKey ;
          this.http.post(`${environment.apiURL}/user/remove`, { address, signedMessage : signature}).subscribe( response => {

            this.disconnect();

          }, err => {
            console.log('error connect');
          });
        }catch(err) {
          console.log('error connect');
        }
      };
      a();
    }, err => {
      console.log('error message', err);
    });

  }

}
