import React from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import axiosClient from '../utils/http.client'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

//validación "artesanal" previo al uso de YUP
// const validate = (values) => {
//   const errors = {};
//   if (!values.firstName) {
//     errors.firstName = "Required";
//   } else if (values.firstName.length > 15) {
//     errors.firstName = "Must be 15 characters or less"
//   }
//   if (!values.password) {
//     errors.password = "Required";
//   } else if (values.password.length > 20) {
//     errors.password = "Must be 20 characters or less"
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//     errors.email = "Invalid email adress"
//   }
//   return errors
// }

const Register = () => {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: ""
    },
    //aquí insertábamos la función que contiene las validaciones "artesanales"
    // validate,
    validationSchema: yup.object({
      userName: yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      password: yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: yup.string()
        .email("Invalid email adress")
        .required("Required"),
    }),
    onSubmit: (values) => {
            const register = async (name, email, password) =>{
        const res = await axiosClient.post("https://utn-books.herokuapp.com/users/register", {
          name,
          email,
          password
        });
        if (res.statusText === "Created") {
          alert("User created successfully");
          login(name, password);
        }        
      }
      const { userName, email, password } = values;
      register(userName, email, password);
    //   axiosClient.post("/users/register", values ).then((res) => {
    //   console.log(res)
    // })
    //   // const { userName, email, password } = values;
    //   // register(userName, email, password);
    }
  })
  return (
    <main className="container">
     
        <form className='form' onSubmit={formik.handleSubmit}>
        <div className="title">Welcome</div>
        <div className="subtitle">Let's create your account!</div>
        <div className="input-container ic2">
          <label className="placeholder" htmlFor="email"></label>
          <input
          placeholder='Email'
          autoFocus
            className='input'
            id='email'
            name='email'
            type="text"
            {...formik.getFieldProps("email")}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <div className= "errors">{formik.errors.email}</div>}
          </div>
        <div className="input-container ic1">
          <label className="placeholder" htmlFor="userName"></label>
          <input
          placeholder='Username'
           
            className='input'
            id='userName'
            name='userName'
            type="userName"
            {...formik.getFieldProps("userName")}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.firstName}
          />

          {formik.touched.userName && formik.errors.userName && <div className= "errors">{formik.errors.userName}</div>}
          </div>
          <div class="input-container ic1">
          <label className="placeholder" htmlFor="password"></label>
          <input
          placeholder='Password'
            className='input'
            id='password'
            name='password'
            type="password"
            {...formik.getFieldProps("password")}
          //  onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.password} 
          />

          {formik.touched.password && formik.errors.password && <div className= "errors">{formik.errors.password}</div>}
          </div>
         
          <input className="submit" type='submit' />

        </form>
     
    </main>
  )
}

export default Register