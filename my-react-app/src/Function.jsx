import { useState } from "react";

// Add these state variables and the register function
// ✨ เพิ่มตรงนี้ก่อน return()
/*
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const register = async () => {
  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) alert("✅ Register success!");
    else alert("❌ " + data.message);
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
*/

// Add these state variables and the login function
/*
import { useState } from "react";

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful!");
      console.log("User data:", data);
      // 🔹 จะเก็บ token หรือ redirect ก็ทำตรงนี้ได้
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong");
  }
};
*/

// Add these state variables and the playSong function
/*
const [songUrl, setSongUrl] = useState("");

const playSong = async () => {
  try {
    const res = await fetch(`http://localhost:3000/song/1`); // 🔹 ดึงเพลง id=1 (แก้ได้)
    const data = await res.json();

    if (res.ok) {
      setSongUrl(data.url); // เก็บ URL เพลงใน state
    } else {
      alert("Song not found");
    }
  } catch (err) {
    console.error(err);
    alert("Error loading song");
  }
};
*/