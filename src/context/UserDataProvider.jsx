import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "../apiService";
import { UserDataContext } from "./UserDataContext";

const UserDataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    if (!user?.email) {
      setUserData(null);
      return;
    }

    try {
      const data = await apiFetch(`/users/email?email=${encodeURIComponent(user.email)}`);
      setUserData(data || {});
    } catch (error) {
      console.error("Failed to load user data:", error);
      setUserData({});
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.email]);

  const userDataInfo = {
    userData,
    fetchUserData,
  };

  return (
    <UserDataContext.Provider value={userDataInfo}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
