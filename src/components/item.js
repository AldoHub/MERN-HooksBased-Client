import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const Item = (props) => {
    const [id, setId] = useState("");
    const [productName, setproductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [routeRedirect, setRedirect] = useState("");   
    
    function getItem(){
        fetch("http://localhost:8000/item/" + props.match.params.id)
        .then(res => {
            return res.json();
        }).then(response => {
            setId(response.item._id);
            setproductName(response.item.name);
            setDescription(response.item.description);
            setPrice(response.item.amount);
            setImage(response.item.image);
            
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getItem();
    }, []);


   const updateItem = (e) => {
        e.preventDefault();
        //update the item
        const item = {
          name : productName,
          description : description,
          image: image,
          amount: price
        }
        const options = { 
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
             body: JSON.stringify(item)
        
        } 
       
        fetch("http://localhost:8000/item/"+ props.match.params.id, options)
        .then(res => {
          console.log(res);
          setRedirect(true);
        });
      }
    
    const deleteItem = () => {
      let confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if(confirmDelete){
        const options = { 
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: props.match.params.id})
        
        } 

        console.log(props.match.params.id)
        
        fetch("http://localhost:8000/item/"+ props.match.params.id, options)
        .then(res => {
          console.log(res);
          setRedirect(true);
        })
      }else{
        console.log("Item was not deleted")
      }
    
    }
    
    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }
    

  return (
   
      <React.Fragment>
          <section >
          <div className="banner"></div>
          <h2>Update an item</h2>

      <div className="itemCreation">
          <form onSubmit={updateItem} >
           <div className="control">
            <label htmlFor="name">Product Name: </label>
            <input type="text" name="name"  onChange={e => setproductName(e.target.value)} value={productName} />
            </div>

            <div className="control">
            <label htmlFor="description">Product Description: </label>
            <textarea name="description" onChange={e => setDescription(e.target.value)} value={description} >
            </textarea>
            </div>

            <div className="control">
            <label htmlFor="price">Product Price: </label>
            <input type="number" name="price" onChange={e => setPrice(e.target.value)} value={price} />
            </div>
            
            <div className="control">
            <label htmlFor="image">Product Image: </label>
            <input type="text" name="image" onChange={e => setImage(e.target.value)} value={image} />
            </div>
            
            <input type="submit" value="Update post" />
         </form>

   
          <div className="preview">
          
           <img src={image} alt="product" />
            <p>Product Name: <strong> {productName}</strong></p>
            <p>Product Description: <strong> {description}</strong> </p>
            <p>Product Price: <strong> {price} </strong></p>
            <button className="delete" onClick={deleteItem} >Delete this Item</button>
          </div>
       
        </div>
 
         </section>

      </React.Fragment>
   
    );
}


export default Item;
