import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../store/slices/userSlice";
import "./Auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  const { isSuccess, isLogged, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    let asd = { email, password };
    dispatch(authUser(asd));
  };

  return (
    <div class="registration-cssave">
      <form onSubmit={onSubmit}>
        <div class="form-group">
          <input
            class="form-control item"
            type="email"
            name="email"
            required
            maxlength="30"
            minlength="4"
            id="username"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <input
            class="form-control item"
            type="password"
            name="password"
            maxlength="30"
            minlength="6"
            id="password"
            placeholder="password"
            required
          />
        </div>
        <div class="form-group">
          <button
            class="btn btn-primary btn-block create-account"
            type="submit"
          >
            Войти
          </button>
          <button
            class="btn btn-primary btn-block create-account"
            type="submit"
          >
            <Link to={"/register"}>Регистрация</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
