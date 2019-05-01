import React,{ useEffect, useState } from 'react';
import defaultImage from "../assets/images.png";
import { Redirect } from 'react-router';

const AddItem = () =>  {

   const [productName, setproductName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [image, setImage] = useState("");
   const [routeRedirect, setRedirect] = useState("");   

   const createItem = (e) => {
    e.preventDefault();
    const item = {
      name : productName,
      description :  description,
      image: image,
      amount: price
    }
  
    const options = { 
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
         body: JSON.stringify(item)
    
    } 

    if(description && image && productName && price ){
      fetch("http://localhost:8000/items", options)
      .then(res => {
        console.log(res);
        setRedirect(true);
      })
    }else {
      console.log("The form is not valid to be sent")
    }

  }



    const isImgReady = image;
    let imagePreview;

    if(isImgReady) {
      imagePreview = <img src={image} alt="product "/>
    }else {
      imagePreview = <img src={defaultImage} alt="default preview"/>
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }

    return (
      <React.Fragment>
          <section >
          <div className="banner"></div>
          <h2>Create a new item</h2>

      <div className="itemCreation">
          <form onSubmit={createItem}>
           <div className="control">
            <label htmlFor="name">Product Name: </label>
            <input type="text" name="name" onChange={e => setproductName(e.target.value)} />
            </div>

            <div className="control">
            <label htmlFor="description">Product Description: </label>
            <textarea name="description" onChange={e => setDescription(e.target.value)} ></textarea>
            </div>

            <div className="control">
            <label htmlFor="price">Product Price: </label>
            <input type="number" name="price" onChange={e => setPrice(e.target.value)} />
            </div>
            
            <div className="control">
            <label htmlFor="image">Product Image: </label>
            <input type="text" name="image" onChange={e => setImage(e.target.value)} />
            </div>
            
            <input type="submit" value="create post" />
         </form>

          <div className="preview">
          
            {imagePreview}
            <p>Product Name: <strong> {productName}</strong></p>
            <p>Product Description: <strong> {description}</strong> </p>
            <p>Product Price: <strong> {price} </strong></p>
            
          </div>

        </div>

         </section>


      </React.Fragment>
    );
 
}

export default AddItem;
