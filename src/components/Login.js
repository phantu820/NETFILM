import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import "../style/login.css";
import user from "../data/user.json";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navbar.js";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const users = window.localStorage.getItem("users");
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  console.log(usersList);
  if (localStorage.getItem("id")) {
    navigate("../");
  }
  useEffect(() => {
    if (users.length > 0) {
      setUsersList(JSON.parse(users));
    } else {
      setUsersList(JSON.parse(user));
    }
  }, [users]);
  const handleLogin = (event) => {
    event.preventDefault();
    const userValid = usersList.find(
      (user) => user.email == email && user.password == password
    );
    if (userValid) {
      swal({
        title: "Đăng nhập thành công",
        icon: "success",
        button: "OK",
      }).then(() => {
        localStorage.setItem("id", userValid.id);
        navigate("../");
      });
    } else {
      return swal({
        title: "Đăng nhập thất bại",
        text: "Email hoặc mật khẩu không đúng",
        icon: "error",
        button: "OK",
      });
    }
  };
  const handleFacebook = (data) => {
    const currentUser = usersList.find((user) => user.id == data.id);
    if (currentUser) {
      localStorage.setItem("id", currentUser.id);
      navigate("../");
    } else {
      const newUser = {
        id: parseInt(data.id),
        email: data.email,
        fullname: data.name,
      };
      window.localStorage.setItem(
        "users",
        JSON.stringify([...usersList, newUser])
      );
      localStorage.setItem("id", parseInt(data.id));
      navigate("../");
    }
  };
  return (
    <>
      <Navigation />
      <div className="login">
        <form onSubmit={handleLogin} className="login-form">
          <h1>Đăng nhập</h1>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p>
            Nếu chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
          </p>
          <button type="submit" className="submit-btn">
            Đăng nhập
          </button>
          <div>
            <LoginSocialFacebook
              appId="517656187007538"
              onResolve={(response) => {
                console.log(response);
                handleFacebook(response.data);
              }}
            >
              <FacebookLoginButton />
            </LoginSocialFacebook>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
