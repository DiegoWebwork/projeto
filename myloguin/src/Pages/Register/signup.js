import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import "./signup.css";
import { signup } from '../../Component/ReduxContainer/apiCall';
import app from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function Signup() {
  const dispatch = useDispatch();
  const {isFetching  , error} = useSelector((state)=>state.user);
  const user = useSelector((state)=>state.user);
  const [email , setEmail] = useState('');
  const [phonenumber , setphonenumber] = useState('');
  const [username , setusername] = useState('');
  const [password , setpassword] = useState('');
  const [file , setfile] = useState(null);
  const userDetails = user.user;
  const navigator = useNavigate();
  const handleClick = (e)=>{
    e.preventDefault();
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage , fileName);
    
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on('state_changed', 
  (snapshot) => {
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
   
  }, 
  () => {
  
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      signup(dispatch ,{email , password , username , phonenumber , profile:downloadURL});
      })
    });

  }
console.log(userDetails?.Status)
  if(userDetails?.Status==='Pending'){
    navigator("/verify/email");
  }
  return (
  <div style={{id:'mainContainerForsignup', background: "linear-gradient(0deg, lightblue, #90caf9)" }}>
    <div className='mainContainerForsignup'>
      <div className='submainContainer'>
        <div style={{flex:1 , marginLeft:150  , marginBottom:"170px"}}>
          <p className='logoText'>PrimeFest</p>
          <p className='introtext'>Organize seus eventos e compartilhe com a maior database da america latina</p>
        </div>
        <div style={{flex:3}}>
          <p className='createaccountTxt'>Criar conta</p>
          <input type="file" name="file" id="file" onChange={(e)=>setfile(e.target.files[0])} />
          <input type="text" placeholder='Usuario' onChange={(e)=>setusername(e.target.value)} className='inputText' />
          <input type="text" placeholder='Celular' onChange={(e)=>setphonenumber(e.target.value)} className='inputText' />
          <input type="email" name="" id="" placeholder='email' onChange={(e)=>setEmail(e.target.value)} className='inputText' />
          <input type="password" placeholder='senha' name="" onChange={(e)=>setpassword(e.target.value)} id="" className='inputText' />
          <button className='btnforsignup' onClick={handleClick}>junte-se</button>
          <Link to={"/"}>
          <p style={{textAlign:'start' , marginLeft:"30.6%" }}>já tem uma conta?</p>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}
