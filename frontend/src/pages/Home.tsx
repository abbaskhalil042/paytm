import User, { type UserProps } from "@/components/User";
import { axiosInstance } from "@/config/axiosInstance";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState<UserProps[]>([]);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/user/all-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.data;
      console.log("User data:", data);
      setUser(data.users);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <User user={user} />
    </div>
  );
};

export default Home;
