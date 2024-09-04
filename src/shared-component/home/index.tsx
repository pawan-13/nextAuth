'use client'

import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token' && event.newValue === null) {
        setToken(null);
        router.push('/Login');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  useEffect(() => {
    if (!token) {
      router.push('/Login');
    }
  }, [token, router])
    
    return (
        <>
            <div style={{textAlign:"center",fontWeight:"bold",color:"red",marginTop:"1rem",fontSize:"1.5rem"}}>Welcome to the Home</div>
            <p style={{textAlign:"center",fontWeight:"500",color:"grey",maxWidth:"600px",margin:"auto"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam unde, consequatur, amet suscipit nam beatae laudantium quo similique ipsa, reprehenderit ea qui rem eaque minima! Incidunt optio nisi quibusdam tenetur!</p>
        </>
    )
}
export default Home;