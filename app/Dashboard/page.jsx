"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, firestore } from '../firebase'; // Ajusta la ruta a tu archivo firebase.js
import { doc, getDoc } from 'firebase/firestore';
const Dashboard = () => {
    const [data, setData] = useState()
  const router = useRouter();
  useEffect(() => {
      const checkAuth = async () => {
          const user = auth.currentUser;
          if (!user) {
              router.push('/');
            }
        };
        
        checkAuth();
  }, []);
  async function fetchData() {
    if (auth.currentUser !== null) {
        const user = auth.currentUser.uid  
        const docRef = doc(firestore, "users", user);
        const docSnap = await getDoc(docRef).then(data => setData(data.data()))
    }
}
useEffect(() => {
    fetchData()
    console.log(data)
}, [])
  


return (
    <div>
      <h2>Dashboard</h2>
       {data != null ? <div>{data.userDetails.map(item => (<div>{item.username}</div>))}</div> : <div>Loading...</div>} 
    </div>
  );
};

export default Dashboard;