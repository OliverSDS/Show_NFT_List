
import { useMoralis } from "react-moralis";
import axios from "axios";
import {useEffect, useState} from "react";
import {X_API_KEY} from "./config";
let account_=null;

function App() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout
  } = useMoralis();

 if (account!=null)
 {
  account_= account.slice(0,5) + ".."+account.slice(38,42)
 }

 const [nft,setNFT] = useState([])

  const address =JSON.stringify(account)

  const account__ = 'https://deep-index.moralis.io/api/v2/'+address.slice(1,address.length-1)+'/nft?chain=eth&format=decimal';

  useEffect(()=>{
    if (account!=null){
      axios({
        url: account__,
        method: 'get',
        headers: {
          'accept': 'application/json',
          'X-API-Key': X_API_KEY
        }
      })
          .then(response => {
            console.log(response)
            setNFT(response.data.result) ;
          })
          .catch(err => {
            console.log(err);
          });

    }else{
      console.log("Adress Null")
    }
  },[account])

  console.log(isAuthenticated );
  console.log(account );
  console.log(nft)

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
          .then(function (user) {
            console.log("logged in user:", user);

          })
          .catch(function (error) {
            console.log(error);
          });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
    setNFT([])
  };

  const nft_component = nft.map((e,i)=>{
    const metadata =JSON.parse( e.metadata) ;
        console.log(metadata)
    return(
        <>
          <div className="col">
            <div className="card border-0 shadow-none">
              <div className="card-body text-center d-flex flex-column align-items-center p-0">
                  <img className="mb-3 fit-cover" width={130} height={130} src={metadata.image ? metadata.image:''} />
                <h5 className="fw-bold text-primary card-title mb-0"><strong>{e.name?e.name:''}</strong></h5>
                <p className="text-muted card-text mb-2">{e.symbol?e.symbol:''}</p>
              </div>
            </div>
          </div>
        </>
    )
  }

  )

  return (
      <div>
        <nav className="navbar navbar-light navbar-expand-md py-3">
          <div className="container"><a className="navbar-brand d-flex align-items-center" href="#"><span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon" style={{background: 'rgb(0,0,0)'}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
                  <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                  <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z" />
                </svg></span><span>NFT</span></a><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav me-auto">
                <li className="nav-item"><a className="nav-link active" href="#" /></li>
                <li className="nav-item"><a className="nav-link" href="#" /></li>
                <li className="nav-item"><a className="nav-link" href="#" /></li>
              </ul><button className="btn btn-primary" type="button" style={{background: 'rgb(0,0,0)'}} onClick={login}>Connect</button>
              <button className="btn btn-primary" type="button" style={{background: 'rgb(0,0,0)'}} onClick={logOut} disabled={isAuthenticating}>DisConnect</button>
            </div>
          </div>
        </nav>
        <div className="container py-4 py-xl-5">
          <div className="row mb-4 mb-lg-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>{account==null?'':account_}</h2>
              <p className="w-lg-50"> Your NFT's :</p>
            </div>
          </div>
          <div className="row gy-4 row-cols-2 row-cols-md-4">
            {nft_component}
          </div>
        </div>
      </div>
  );
}

export default App;
