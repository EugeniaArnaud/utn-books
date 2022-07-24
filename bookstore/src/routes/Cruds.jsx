import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import axiosClient from "../utils/http.client";
import { useParams } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";


const Cruds = () => {
  const navigate = useNavigate();
// const [book, setBook] = useState();
//   useEffect(() => {
//     fetchBook(params.id).then((res) => {
//       console.log(res, "lalal");
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
//     //  );
//     console.log(book, "cambio el libro");
//   },[book]);

  let params = useParams();


  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      email: "",
      file: "",
    },
 
    // validationSchema: yup.object({
    //   name: yup
    //     // .string()
    //     // .max(50, "Must be 50 characters or less")
    //     // .required("Required"),
    //   author: yup
    //   //   .string()
    //   //   .max(50, "Must be 50 characters or less")
    //   //   .required("Required"),
    //   // price: yup.number().required("Required"),
    // }),

    onSubmit: (values) => {
       


      const formData = new FormData();
      const config = {
        headers: {
            'content-type': 'multipart/form-data', "accept": "application/json"
        }
      }
      formData.append("file", values.file);
      formData.append("name", values.name);
      formData.append("author", values.author);
      formData.append("price", values.price);
    

      
      
      const updateBook = async ( id, name, author, price, file ) => {
        const res = await axiosClient.patch(`https://utn-books.herokuapp.com/books/${id}`, formData, config, {
          id,
          name,
          author,
          price,
          file
        });
        if (res.status === 200) {
          alert("Book added"); 
          navigate("https://utn-books.herokuapp.com/homecrud");       
        }        
        
      }
      const { name, author, price, file } =       values;
      const { id } = params;      
      updateBook(id, name, author, price, file);
    

      //     //PARA IMAGENES: https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/

      //   const addBook = async (name, author, price, file ) =>{
      //     const res = await axiosClient.post("/books", {
      //       name,
      //       author,
      //       price,
      //       file
      //     });
      //     console.log(res);
      //   }
      //   const { name, author, price, file } = values;
      //   addBook(name, author, price, file);

      //   //PARA IMAGENES: https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/

      // //   axiosClient.post("/users/register", values ).then((res) => {
      // //   console.log(res)
      // // })
      // //   // const { userName, email, password } = values;
      // //   // register(userName, email, password);
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

        <div class="input-container ic2">
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

        <div class="input-container ic2">
          <label className="placeholder" htmlFor="file">
            Select Image
          </label>
          <input onChange={(e)=> formik.setFieldValue('file',e.target.files[0])}
            placeholder="File"
            className="input"
            id="file"
            name="file"
            type="file"
            // {...formik.getFieldProps("file")}
          />

          {/* {formik.touched.file && formik.errors.file && (
            <div className="errors">{formik.errors.file}</div>
          )} */}
        </div>

        <input className="submit" type="submit" />
      </form>
    </main>
  );
};

export default Cruds;
