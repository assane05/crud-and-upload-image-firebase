import React, { useEffect, useState } from "react";
import { fireDb } from "./firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function FirebaseFirestore() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setId] = useState("");

  const [val, setVal] = useState([]);

  const value = collection(fireDb, "demo");

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  //  fonctino pour la suppression
  const handleDelete = async (id) => {
    const deleteVal = doc(fireDb, "demo", id);
    await deleteDoc(deleteVal);
  };

  return (
    <div className="container">
      <Link to="/create">Add</Link>
      {val.map((values) => (
        <div>
          <table>
            <tr>
              <td>
                <img src={values.imageUrl} width="50" height="50" />
              </td>
              <td>{values.name1}</td>
              <td>{values.name2}</td>
              <td>
                <button onClick={() => handleDelete(values.id)}>Delete</button>
              </td>
              <td>
                <Link to={`/update/${values.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          </table>
        </div>
      ))}
    </div>
  );
}
export default FirebaseFirestore;
