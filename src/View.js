import React, { useEffect, useState } from "react";
import { fireDb } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";

function View() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(fireDb, "User", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    getUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>User Details</h2>
      <div>
        <strong>ID:</strong> {id}
      </div>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Address:</strong> {user.address}
      </div>
      <div>
        <strong>City:</strong> {user.city}
      </div>
      <div>
        <strong>PIN:</strong> {user.pin}
      </div>
      <div>
        <strong>Country:</strong> {user.country}
      </div>
      <Link to="/" className="btn btn-primary">
        Back
      </Link>
    </div>
  );
}

export default View;