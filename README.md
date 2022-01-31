# SOLANA ANGULAR BASE PROJECT WITH AUTHENTIFICATION

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## DESCRIPTION

It provide a basic authentification frontend working with Sol Wallet and signed messages for connecting, updating or removing a user assigned to a Solana publickey.
<br>use [angular-sol-wallets]("https://www.npmjs.com/package/angular-sol-wallets") in npm 
<br>It need a api providing the folowing routes and behavior: 

## Work with the API

### 1 - connect

<ul>
<li>get a message for authentification:
<br>get => /messageSample</li>
<li>sign the message and send the signature and the address to the server and store the result as datas and token.
<br>post { signedMessage : signature, address : address } => /user/connect</li>
</ul>

<em>Note: connecting is supposed to automatically create a new user if not exist.</em>

### 2 - update user

<ul>
<li>get a message for update user.
<br>get => /messageSample?code=1</li>
<li>sign the message and request an update with the token in "authorization" header used with a HTTP interceptor
<br>post => { signedMessage : signature, address : address, datas : userUpdateDatas } => /user/update</li>
</ul>

### 3 - remove user

<ul>
<li>get a message for remove user.
<br>get => /messageSample?code=2</li>
<li>sign the message and request an update with the token in "authorization" header used with a HTTP interceptor
<br>post => { signedMessage : signature, address : address } => /user/update</li>
</ul>

## User managment

the userService provide datas in a ReplaySubject.
<br>It will get the user datas at app's launch if a valid token is in localstorate as "token".

<br>Provide the folowing functions:

<br>connect()
<br>disconnect()
<br>update()
<br>remove()

## Example 

The AppComponent show a minimalist example of usage with the possibiliy of connecting, updating a pseudo, removing and signAndSendTransfer.