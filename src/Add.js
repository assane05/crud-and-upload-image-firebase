import React, { useEffect, useState } from "react";
import { fireDb, storage } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function FirebaseFirestore() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setId] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [val, setVal] = useState([]);

  const value = collection(fireDb, "demo");

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  const handleCreateAndUpload = async () => {
    if (!fname || !lname) {
      toast.error("champ requis");
      return;
    }

    if (imageUpload === null) {
      toast.error("ajouter unne image");
      return;
    }

    const imageRef = storageRef(storage, `products/${uuid()}`);

    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(value, { name1: fname, name2: lname, imageUrl: url });

      setFname("");
      setLname("");
      setImageUpload(null);

      toast.success("ajouté avec succes");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="container pt-5">
      <div className="mb-3">
        <input
          className="form-control p-2"
          label="Image"
          placeholder="Choose image"
          accept="image/png,image/jpeg"
          type="file"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control p-2"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          placeholder="First Name"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control p-2"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          placeholder="Last Name"
        />
      </div>
      <button onClick={handleCreateAndUpload} className="btn btn-primary">
        Create
      </button>
      <Link to="/">
        <button className="btn btn-success">Voir la liste</button>
      </Link>
    </div>
  );
}

export default FirebaseFirestore;
