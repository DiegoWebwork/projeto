import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "./login.css"
import { useState } from 'react';
import { login } from '../../Component/ReduxContainer/apiCall';
export default function Login() {
  const dispatch = useDispatch();
  const {isFetching  , error} = useSelector((state)=>state.user);
  const [email , setemail]= useState('');
  const [password , setPassword] = useState('');
const handleClick = (e)=>{
  e.preventDefault();
  login(dispatch ,{email , password});
}
  return (
  <div style={{ background: "linear-gradient(0deg, lightblue, #90caf9)" }}>
    <div className='mainContainerForsignup'>
      <div className='submainContainer'>
        <div style={{flex:1 , marginLeft:150  , marginBottom:"170px"}}>
          <p className='logoText'>PrimeFest</p>
          <p className='introtext'>Organize seus eventos e compartilhe com a maior database da america latina</p>
        </div>
        <div style={{flex:3}}>
          <p className='createaccountTxt'>Junte-se</p>
          <input type="email" name="" id="email" placeholder='Email' onChange={(e)=>setemail(e.target.value)} className='inputText' />
          <input type="password" placeholder='******' name="" onChange={(e)=>setPassword(e.target.value)} id="password" className='inputText' />
          <button className='btnforsignup' onClick={handleClick}>Entrar</button>
          <Link to={"/forgot/password"}>
          <p style={{textAlign:'start' , marginLeft:"30.6%" }}>esqueci minha senha</p>
          </Link>
          <Link to={"/signup"}>
          <p style={{textAlign:'start' , marginLeft:"30.6%" }}>Deseja juntar-se?</p>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}
