"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "../firebase"; // Ajusta la ruta a tu archivo firebase.js
import { arrayUnion, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { getAuth, signOut } from 'firebase/auth';
import Loading from "../components/Loading";


const Dashboard = () => {
  const router = useRouter();
  const auth = getAuth();
  const [data, setData] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

// Función para cerrar sesión
const handleSignOut = async () => {
  try {
    await signOut(auth);
    router.push("./")
    console.log('Se cerró sesión exitosamente');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/");
      }
    };

    checkAuth();
  }, []);
  async function fetchData() {
    if (auth.currentUser !== null) {
      const user = auth.currentUser.uid;
      const docRef = doc(firestore, "users", user);
      const docSnap = await getDoc(docRef).then((data) => setData(data.data()));
    }
  }
  async function updateDocument(e) {
    e.preventDefault()
    if (auth.currentUser !== null) {
      const user = auth.currentUser.uid;
      const docRef = doc(firestore, "users", user);
      const newTask = {
        tasks: arrayUnion({title:title, description:description, id:Date.now()}),
      };
      await updateDoc(docRef, newTask);
    }
    fetchData()
  }
  async function removeDocument(id){
    const taskCard = document.getElementById(`${id}`)
    const user = auth.currentUser.uid;
    const docRef = doc(firestore, "users", user);
    const filtered = data.tasks.filter(item => item.id !== id)
const newData = {
    tasks: filtered,
  };
  await updateDoc(docRef, newData);
  taskCard.classList.add("taskDissappear")
  setTimeout(() => {
      fetchData()
  }, 1000);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      {data != null ? (
        <div className="dashboardContainer">
        <div className="dashboard">
          {data.userDetails.map((item) => (
            <div className="dashboardUsername"><p>Bienvenidx de nuevo {item.username}!</p><button onClick={() => handleSignOut()}>Cerrar sesión</button></div>
          ))}
         <div className={"taskForm"}>
      <form onSubmit={updateDocument}>
        <div className={"formGroup"}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className={"formGroup"}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button className={"formButton"}>
          Guardar Tarea
        </button>
      </form>
    </div>
        </div>
        <div className="dashboardTasks">
           {data.tasks.map(item => (<div key={item.id} id={item.id} className="taskCard"><p className="taskTitle">Título: {item.title}</p><div className="taskDescription"><p>Descripción: {item.description}</p><span onClick={() => removeDocument(item.id)} class="material-symbols-outlined">
delete
</span></div></div>))}
        </div>
        </div>
      ) : (
        <Loading/>
      )}
    </div>
  );
};

export default Dashboard;
