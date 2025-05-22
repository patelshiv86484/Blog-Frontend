import React,{useState} from 'react'
import {createAccount,LoginDB,getcurrentuser,LogoutDB} from '../database/auth_service'
import {Link,useNavigate} from 'react-router-dom'
import {login}  from '../store/authslice'
import {Button,Logo,Input} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
function Signup() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [error,setError]=useState('')
  const {register,handleSubmit}=useForm();
  //  console.log("Reached in signup page")

    const create= async (data)=>{
      console.log(data)
       setError("")
       try {
         const data2=await createAccount(data)
         if(data2){
          const user=await getcurrentuser()//calling get currentuser because after creating account automatically it is loggedin
          if(user) dispatch(login(user));
         navigate('/')
         }
       } catch (error) {
         setError(error.message)
       }
    }
  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                </p>
                <Link to='/login'
                className="font-medium text-primary transition-all duration-200 hover:underline">
                Sign-up
                </Link>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                       <Input
                        label="userName"
                        placeholder='Enter your full name'
                        {...register('userName',{
                          required:true,
                        })}
                       />

                       <Input 
                       label="E-mail"
                       placeholder='Enter your email address'
                       type='email'
                       {...register('email',{
                        required:true,
                        validate: {
                          matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                          "Email address must be a valid address",
                      }
                       })}
                       />

                       <Input 
                       label="Password"
                       placeholder="Enter Password"
                       type="password"
                       {
                        ...register('password',{
                          required:true,
                        })
                       }
                       />

                       <Button
                       children="Create account"
                       type="submit"
                       className="w-full"
                       />
                    </div>
                </form>
            </div>
    </div>
  )
}
export default Signup