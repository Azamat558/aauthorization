import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!!isSuccess) {
    navigate("/auth");
  }
  const onSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const age = event.target.age.value;

    let obj = { email, password, name, age };
    dispatch(registerUser(obj))
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
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group">
          <input
            class="form-control item"
            type="name"
            name="name"
            required
            maxlength="30"
            minlength="4"
            id="username"
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <input
            class="form-control item"
            type="number"
            name="age"
            required
            maxlength="30"
            // minlength="4"
            id="username"
            placeholder="Age"
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
            <Link to={"/auth"}>Авторизация</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
