import { upperCase, lowerCase, numbers, symbols } from "./codes";
import copy from "./assets/copy.png";
import generate from "./assets/generate.png";
import { useState } from "react";

function PasswordGenerator() {

    const [length,setLength] = useState(8);
    const [upper,setUpper] = useState(true);
    const [lower,setLower] = useState(true);
    const [number,setNumber] = useState(true);
    const [symbol,setSymbol] = useState(true);
    const[passwordInput , setPasswordInput] = useState("")

    function passwordGenerate(){
      let password = "";

      // step count number of checkbox is check

      let checkCount = 0;
      upper === true ? checkCount += 1 : null;
      lower === true ? checkCount += 1 : null;
      number === true ? checkCount += 1 : null;
      symbol === true ? checkCount += 1 : null;
      // console.log(checkCount)

      let count = Math.floor(length / checkCount);
      // console.log(count)

      let remainder = length % checkCount;
      // console.log(remainder)

      upper === true ? password += getRandomCode(upperCase,count): null;
      lower === true ? password += getRandomCode(lowerCase,count): null;
      number === true ? password += getRandomCode(numbers,count) : null;
      symbol === true ? password += getRandomCode(symbols,count) : null;

      // edge case for reminder 
      if(upper === true){
        password += getRandomCode(upperCase,remainder);
      }else if(lower === true){
        password += getRandomCode(lowerCase,remainder);
      }else if(number === true){
        password += getRandomCode(numbers,remainder);
      }else if(symbol === true){
        password += getRandomCode(symbols,remainder);
      }

      

      setPasswordInput(password);
    }



    const getRandomCode = (data,count)=>{
       let result= "";
       for(let i=0;i<count;i++){
          let randomIdx = Math.floor(Math.random() * data.length);
          result += data[randomIdx];
       }
       return result;
    }

    function copyPassword(){
       navigator.clipboard.writeText(passwordInput);
       setPasswordInput("");
    }


  return (
    <>
      <div className="container">
        <div className="main">
          <h1>
            Generate a <br />
            <span>Random Password</span>
          </h1>
          <div className="input-box">
            <input
              type="text"
              purpose="password"
              placeholder="Password"
               value={passwordInput}
              disabled
            />
            <img src={copy} alt="" onClick={copyPassword}/>
          </div>
          <div className="pass-length">
            <p>Select Password length(**8-50 characters**)</p>
            <input type="number" min={8} max={50} id="num"  onChange={(e)=> setLength(e.currentTarget.value)}  value={length}/>
          </div>
          <div className="checkbox">
            <div>
              <input type="checkbox" id="Upper"  onChange={()=> setUpper(!upper)} checked={upper}/>
              <label>Include Upper case</label>
            </div>
            <div>
              <input type="checkbox" id="Lower" onChange={()=>setLower(!lower)} checked={lower}/>
              <label>Include Lower case</label>
            </div>
            <div>
              <input type="checkbox" id="Number" onChange={()=>setNumber(!number)}  checked={number}/>
              <label>Include Number</label>
            </div>
            <div>
              <input type="checkbox" id="Symbol" onChange={()=>setSymbol(!symbol)} checked={symbol}/>
              <label>Include Symbols</label>
            </div>
          </div>
          <button className="btn" onClick={passwordGenerate}><img src={generate} alt="" />Generate Password</button>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
