import React from 'react'
import {Card} from 'react-bootstrap';


import {Link} from 'react-router-dom'
 
const Product=({val})=> {
    let v=val._id
    //console.log(22222)
    //console.log(v)
    return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/movie/${v}`}>
            <Card.Img src={val.front_pic} />
      </Link>
      
      <Card.Body>
           
        <Card.Title as="div">
            <strong> {val.genre}</strong>
        </Card.Title>
          
   

      <Card.Text as='div'>
        <div className='my-3'>
        {/* <Rating value={val.rating_id} text={`${val.genre} reviews`} color={'yellow'}/> */}
        </div>
      </Card.Text>
    
      <Link to={`/movie/${v}`}>
      <Card.Text as='h3'> 
       {val.name}        
      </Card.Text>
      </Link>

     </Card.Body>

    </Card>
    )
}

export default Product;
