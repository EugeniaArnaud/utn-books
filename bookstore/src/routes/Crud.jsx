import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useEffect } from "react";
import axiosClient from "../utils/http.client";
import { useParams } from "react-router-dom"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Crud = () => {
  const navigate = useNavigate();
// const [book, setBook] = useState();
//   useEffect(() => {
//     fetchBook(params.id).then((res) => {//      
//        setBook(res);
//     }); 
//   },[params]);
//   useEffect(() => {
//     // formik.setValues(
//     //   {
//     //     name: book.name,
//     //     author: book.author,
//     //     email: book.email,
//     //     file: book.file
//     //   }
//     //  );//   
//   },[book]);

  let params = useParams();


  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      email: "",
      file: "",
    },
 
    validationSchema: yup.object({
      name: yup
        .string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      author: yup
        .string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      price: yup.number().required("Required"),
    }),

    onSubmit: (     values    ) => {

      // const formData = new FormData();
      // const config = {
      //   headers: {
      //       'content-type': 'multipart/form-data', "accept": "application/json"
      //   }
      // }
      // formData.append("file", values.file);
      // formData.append("name", values.name);
      // formData.append("author", values.author);
      // formData.append("price", values.price);

    //   axiosClient.post("/books", {
    //     name,
    //     author,
    //     price   
    //   }).then((res) => {       
    //     navigate("/");   }
    //   ).catch((err) => {
    //     console.log(err);   }
    //   );    
    //  const { name, author, price } =   values;
     

        const addBook = async (name, author, price ) =>{
          const res = await axiosClient.post("/books", {
            name,
            author,
            price
            
          });
          if (res.status === 200) {
                alert("Book added"); 
                navigate("/homecrud");       
              }        
        }
        const { name, author, price } = values;
        addBook(name, author, price);
      
    },
  });


  return (
    
    <main className="container">
      
      <form className="crud-form" onSubmit={formik.handleSubmit}>
        <div className="title">Books form</div>
        <div className="subtitle">Add or modify a book</div>

        <div className="input-container ic1">
          <label className="placeholder" htmlFor="name">
            Name
          </label>
          <input
            placeholder="Name"
            className="input"
            id="name"
            name="name"
            type="name"
            {...formik.getFieldProps("name")}
          />

          {formik.touched.name && formik.errors.name && (
            <div className="errors">{formik.errors.name}</div>
          )}
        </div>

        <div className="input-container ic2">
          <label className="placeholder" htmlFor="author">
            Author
          </label>
          <input
            placeholder="Author"
            className="input"
            id="author"
            name="author"
            type="author"
            {...formik.getFieldProps("author")}
          />

          {formik.touched.author && formik.errors.author && (
            <div className="errors">{formik.errors.author}</div>
          )}
        </div>

        <div class="input-container ic2">
          <label className="placeholder" htmlFor="price">
            Price
          </label>
          <input
            placeholder="Price"
            className="input"
            id="price"
            name="price"
            type="number"
            min="0"
            value="10"
            {...formik.getFieldProps("price")}
          />

          {formik.touched.price && formik.errors.price && (
            <div className="errors">{formik.errors.price}</div>
          )}
        </div>

        {/* <div class="input-container ic2">
          <label className="placeholder" htmlFor="file">
            Select Image
          </label>
          <input onChange={(e)=> formik.setFieldValue('file',e.target.files[0])}
            placeholder="File"
            className="input"
            id="file"
            name="file"
            type="file"
          
          />

       
        </div> */}

        <input className="submit" type="submit" />
      </form>
    </main>
  );
};

export default Crud;
