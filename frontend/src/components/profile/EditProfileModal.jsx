import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import toast from "react-hot-toast";

function EditProfileModal({ userData, onClose, onSave }) {
  const [form, setForm] = useState({
    name: userData.name || "",
    phone: userData.phone || "",
  });

  async function handleSave() {
    try {
      const user = auth.currentUser;

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: form.name,
          phone: form.phone,
          email: user.email,
        },
        { merge: true }
      );

      toast.success("Profile Updated");

      onSave({
        ...userData,
        ...form,
      });

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white rounded-2xl p-8 w-[400px]">

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full border rounded-lg p-3 mb-6"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProfileModal;