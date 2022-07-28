import React from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    
    },
      validationSchema: yup.object({
      userName: yup.string()        
        .required("Required"),
      password: yup.string()        
        .required("Required"),      
    }),
    onSubmit: (values) => {    
      const { userName, password } = values;
      login(userName, password);
    }
  })

  
  return (
    <main className="container">
     
        <form className='form' onSubmit={formik.handleSubmit}>
        <div className="title">Login</div>
        <div className="subtitle">Login to your account!</div>
           <div className="input-container ic1">
          <label className="placeholder" htmlFor="userName"></label>
          <input
          placeholder='Email'
            autoFocus
            className='input'
            id='userName'
            name='userName'
            type="userName"
            {...formik.getFieldProps("userName")}
          
          />
          {formik.touched.userName && formik.errors.userName && <div className= "errors">{formik.errors.userName}</div>}
          </div>

          <div className="input-container ic1">
          <label className="placeholder" htmlFor="password"></label>
          <input
          placeholder='Password'
            className='input'
            id='password'
            name='password'
            type="password"
            {...formik.getFieldProps("password")}
      
          />

          {formik.touched.password && formik.errors.password && <div className= "errors">{formik.errors.password}</div>}
          </div>
         
         
          <input className="submit" type='submit' />

        </form>
     
    </main>
  )
}

export default Login