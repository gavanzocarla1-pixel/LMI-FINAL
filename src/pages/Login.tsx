import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message.replace("Firebase:", "").trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">{isRegister ? "Create Account" : "Login"}</h2>
      <p className="page-subtitle">LMI - Library Management System</p>

      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="error" style={{ background: "#fce8e6", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>{error}</div>}

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@lmi.edu" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", padding: "13px" }}>
          {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px" }}>
          {isRegister ? "Already have an account? " : "No account yet? "}
          <span style={{ color: "#800000", fontWeight: 700, cursor: "pointer" }} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login here" : "Register here"}
          </span>
        </p>
      </form>
    </div>
  );
}