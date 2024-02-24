import { useState, useEffect } from "react";
import {db} from "../firebase-config";
import {collection, getDocs} from "firebase/firestore";
import "./Home.css";

export default function Contact() {
  

  const [contact, setContact] = useState([]);
  const contactCollectionRef = collection(db, "contact");

  useEffect(() => {
    
    const getContact = async () => {
      const data = await getDocs(contactCollectionRef);
      setContact(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getContact();
  }, [])

  return ( 
    <div className="contact-list">
        <div className="aux">
            <h1 className="contact-title">Contact</h1>
            <div >
                {contact.map((ct) => {
                return (
                    <div className="contact-elements">
                    {" "}
                    <h1>Company: &nbsp;&nbsp;&nbsp; {ct.company}</h1>
                    <h1>Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ct.address}</h1>
                    <h1>Phone: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ct.phone}</h1>
                    <h1>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ct.email}</h1>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
   );
}