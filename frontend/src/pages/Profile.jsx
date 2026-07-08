import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import EditProfileModal from "../components/profile/EditProfileModal";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData({
          name: docSnap.data().name || "",
          email: user.email,
          phone: docSnap.data().phone || "",
        });
      } else {
        setUserData({
          name: "",
          email: user.email,
          phone: "",
        });
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">

      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-lg p-10">

          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* Avatar */}

            <img
              src={`https://ui-avatars.com/api/?name=${
                userData.name || userData.email
              }&background=000&color=fff&size=200`}
              alt="Profile"
              className="w-40 h-40 rounded-full shadow-lg"
            />

            {/* User Info */}

            <div className="flex-1">

              <h1 className="text-4xl font-bold">
                {userData.name || "No Name Added"}
              </h1>

              <p className="text-gray-500 text-lg mt-3">
                📧 {userData.email}
              </p>

              <p className="text-gray-500 text-lg mt-2">
                📱 {userData.phone || "No Phone Added"}
              </p>

              <button
                onClick={() => setShowEdit(true)}
                className="mt-8 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Edit Profile
              </button>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer hover:shadow-xl transition">
            <h2 className="text-xl font-bold">📦</h2>
            <p className="mt-3 font-semibold">My Orders</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer hover:shadow-xl transition">
            <h2 className="text-xl font-bold">❤️</h2>
            <p className="mt-3 font-semibold">Wishlist</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer hover:shadow-xl transition">
            <h2 className="text-xl font-bold">📍</h2>
            <p className="mt-3 font-semibold">Addresses</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer hover:shadow-xl transition">
            <h2 className="text-xl font-bold">⚙️</h2>
            <p className="mt-3 font-semibold">Settings</p>
          </div>

        </div>

      </div>

      {showEdit && (
        <EditProfileModal
          userData={userData}
          onClose={() => setShowEdit(false)}
          onSave={setUserData}
        />
      )}

    </section>
  );
}

export default Profile;