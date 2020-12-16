import React from "react";
import Modal from "react-modal";
import { wrap, MD5, isValidEmail, isErrorWithCode } from "./utils";
const errors = require("./errors");
import customStyles from "./ModalStyles";

interface LogRegProps {
  isOpen: boolean;
  setIsOpen: Function;
}

function RegModal(props: LogRegProps) {
  const { isOpen, setIsOpen } = props;
  const [login, setLogin] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [anotherPassword, setAnotherPassword] = React.useState("");

  function signup() {
    const emitError = alert;
    if (password !== anotherPassword) {
      emitError("Пароли не совпадают!");
      return;
    }
    if (!isValidEmail(login)) {
      emitError("Неверный email!");
      return;
    }
    if (password.length < 8) {
      emitError("Пароль должен состоять минимум из 8 знаков");
      return;
    }
    const sendData = {
      login,
      name,
      password: MD5(password),
    };
    let opts = { method: "post", body: JSON.stringify(sendData) };
    const checkError = (error) => {
      if (isErrorWithCode(error, errors.BUSY_LOGIN)) {
        alert("Пользователь с таким логином уже существует!");
        return;
      } else {
        alert("Вы успешно зарегистрировались.");
        setIsOpen(false);
        return;
      }
    };
    fetch("/api/signup", opts)
      .then((data) => data.json())
      .then((data) => checkError(data));
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={wrap(setIsOpen, false)}
        style={customStyles}
        /*contentLabel="Example Modal"  (?) */
      >
        <button onClick={wrap(setIsOpen, false)}>закрыть</button>
        <h2>Регистрация</h2>
        <p>Email</p>
        <input onChange={(e) => setLogin(e.target.value)} type="text" /> <br />
        <p>Имя</p>
        <input onChange={(e) => setName(e.target.value)} type="text" /> <br />
        <p>Пароль</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />{" "}
        <br />
        <p>Повторите пароль</p>{" "}
        <input
          onChange={(e) => setAnotherPassword(e.target.value)}
          type="password"
        />
        <br /> <br />
        <button onClick={signup}>Зарегестрироваться</button>
      </Modal>
    </>
  );
}

function LogModal(props: LogRegProps) {
  const { isOpen, setIsOpen } = props;
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const check = (data) => {
    if (isErrorWithCode(data, errors.INVALID_LOGIN)) {
      alert("Неправильный логин и/или пароль");
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      alert("Вы успешно авторизировались");
      setIsOpen(false);
    }
  };
  function recoverPassword() {
    const sendData = {
      login,
    };
    let opts = { method: "post", body: JSON.stringify(sendData) };
    fetch("/api/recover", opts).then((data) => {
      console.log(data);
      if (isErrorWithCode(data, errors.INVALID_LOGIN)) {
        alert("Неправильный логин");
      } else {
        alert(
          "Письмо с информацией о восстановлении пароля отправлено Вам на почту",
        );
        setIsOpen(false);
      }
    });
  }
  function signin() {
    const sendData = {
      login,
      password: MD5(password),
    };
    let opts = { method: "post", body: JSON.stringify(sendData) };
    fetch("/api/signin", opts)
      .then((data) => data.json())
      .then((data) => check(data));
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        /*onAfterOpen={afterOpenModal} */
        onRequestClose={wrap(setIsOpen, false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={wrap(setIsOpen, false)}>закрыть</button>
        <h2>Вход</h2>
        <p>Пожалуйста, введите свой логин и пароль</p>
        <p>Логин</p>
        <input onChange={(e) => setLogin(e.target.value)} type="text" /> <br />
        <p>Пароль</p>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
        <br />
        <button onClick={signin}>Войти</button>
        <p>Забыли пароль?</p>
        <button onClick={recoverPassword}>Восстановить</button>
      </Modal>
    </>
  );
}
export { RegModal, LogModal };