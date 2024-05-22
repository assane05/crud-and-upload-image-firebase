import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fireDb } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Edit() {
  const { id } = useParams();
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [pin, setpin] = useState("");
  const [country, setcountry] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(fireDb, "User", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setname(data.name);
        setaddress(data.address);
        setcity(data.city);
        setpin(data.pin);
        setcountry(data.country);
      } else {
        console.log("il n'y a pas de document à afficher !");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    const docRef = doc(fireDb, "User", id);
    await updateDoc(docRef, {
      name: name,
      address: address,
      city: city,
      pin: pin,
      country: country,
    });
    setname("");
    setaddress("");
    setcity("");
    setpin("");
    setcountry("");
  };

  return (
    // <div className="container">
    //   <input value={name} onChange={(e) => setname(e.target.value)} />
    //   <input value={address} onChange={(e) => setaddress(e.target.value)}/>
    //   <button onClick={handleUpdate}>Update</button>
    //   <Link to="/">Voir la liste</Link>
    // </div>
    <div class="login-box">
    <h2>Edit ETUDIANT</h2>
    <form>
      <div class="user-box">
         <input value={name} onChange={(e) => setname(e.target.value)} />
      </div>
      <div class="user-box">
       <input value={address} onChange={(e) => setaddress(e.target.value)}/>
      </div>

      <div class="user-box">
      <input value={city} onChange={(e) => setcity(e.target.value)}/>
      </div>
      <div class="user-box">
      <input value={pin} onChange={(e) => setpin(e.target.value)}/>
      </div>

      <div class="user-box">
      <input value={country} onChange={(e) => setcountry(e.target.value)}/>
      </div>
    </form>
    <div className="col-lg-12">
      <Link to="/">
    <button onClick={handleUpdate}>Mettre a jour</button>
    </Link>
       <Link to="/"><button>Back</button></Link>
    </div>
  </div>
  );
}

export default Edit;
