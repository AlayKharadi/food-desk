import React from "react";
import './aboutus.css';
import Pic1 from '../Images/Pic1.jpeg'
const Aboutus = () => {
    return (
      <div id="about" className="about-page">
        
                <div>
                <h5 className="w3-center w3-padding-64">

             <span className="w3-tag w3-wide"></span></h5>
<h1>
<nav>
  <center><a href="" className="w3-block" style={{ "text-decoration": "underline", "color": "black" }}>ABOUT US </a></center>
</nav>
</h1>


<div className="text-centre w3-panel w3-leftbar w3-light-grey">
  <div style={{maxWidth:"100%",marginLeft:'25%',marginRight:'25%',textDecorationStyle:"double"}}>
  <div className="w3-panel w3-leftbar w3-light-grey">
    <div style={{'text-align':'center','fontSize':'17px'}}>
    <center><p>
    Our technology platform connects customers,restaurant partners and delivery partners,serving their multiple needs.Customers use our platform discover cafe, read and write customer generated reviews and view and order food delivery and make payments  . On the other hand, we provide cafe partners with industry-specific marketing tools which enable them to engage and acquire customers to grow their business while also providing a reliable and efficient last mile delivery service.
    <br/>
    <b><br/>"Use products from nature for what it's worth - but never too early, nor too late." <br/>Fresh is the new sweet.<br/>
    Chef, Coffeeist and Owner: Shreena Kapadiya</b>
    <img src={Pic1} style={{ width: '80%', maxWidth: '700px' }} className="w3-margin-top" />
    
      </p></center></div>
  </div>


</div>


                </div>
        
        </div>
        </div>
       
      
    );
  };
  export default Aboutus;