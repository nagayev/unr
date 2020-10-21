import React from "react";
import Modal from "react-modal";
import { wrap,MD5,isValidEmail } from "./utils";

const customStyles = {
  content: {
    color: "black",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface MapModalInterface {
  modalIsOpen: boolean;
  setIsOpen: Function;
  modalCoords: number[];
}

interface LogRegProps {
  isOpen: boolean;
  setIsOpen: Function;
}

function InfoFromDBModal(props: MapModalInterface) {
  const { modalIsOpen, setIsOpen, modalCoords } = props;

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        /*onAfterOpen={afterOpenModal} */
        onRequestClose={wrap(setIsOpen, false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/*<h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={wrap(setIsOpen, false)}>закрыть</button>
        <div>Кажется, об этом объекте никто не писал.</div>
        <div>Станьте первым!</div>
        <div>
          Объект с координатами ({modalCoords[0]});({modalCoords[1]}){" "}
        </div>
      </Modal>
    </>
  );
}
function LogModal(props: LogRegProps) {
  const { isOpen, setIsOpen } = props;
  const [login,setLogin] = React.useState('');
  const [password,setPassword] = React.useState('');
  const check = (data) => {
    //TODO: check
    localStorage.setItem('token',data);
  }
  function signin(){
    const sendData = {
      login,
      password:MD5(password)
    }
    setIsOpen(false);
    let opts = {method:'post',body:JSON.stringify(sendData)}
    fetch('/api/signin',opts).then(data=>data.json()).then(data=>check(data));
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
        <input onChange={(e)=>setLogin(e.target.value)} type="text" /> <br />
        <p>Пароль</p>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" />
        <br />
        <button onClick={signin}>Войти</button>
      </Modal>
    </>
  );
}
function RegModal(props: LogRegProps) {
  const { isOpen, setIsOpen } = props;
  const [login,setLogin] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [anotherPassword,setAnotherPassword] = React.useState('');

  function signup(){
    if(password!==anotherPassword){
      alert('Пароли не совпадают!');
      return;
    }
    if(!isValidEmail(login)){
      alert('Неверный email!');
      return;
    }
    const sendData = {
      login,
      password:MD5(password)
    }
    setIsOpen(false);
    let opts = {method:'post',body:JSON.stringify(sendData)}
    //FIXME: tmp, debug only
    const tmp = (d) => {
      console.log(d);
    }
    fetch('/api/signup',opts).then(data=>data.json()).then(data=>tmp(data));
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
        <input onChange={(e)=>setLogin(e.target.value)} type="text" /> <br />
        <p>Пароль</p>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" /> <br />
        <p>Повторите пароль</p> <input onChange={(e)=>setAnotherPassword(e.target.value)} type="password" />
        <br />
        <button onClick={signup}>Зарегестрироваться</button>
      </Modal>
    </>
  );
}
function UserModal(props){
  const {isOpen,setIsOpen} = props;
  const logOut = () => {
    localStorage.removeItem('token');
    setIsOpen(false);
    location.reload();
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
        <h1>Marat Nagayev</h1>
        <p>+50 Пенза, Россия</p>
        <ul>
          <li>1 место среди авторов (+50)</li>
          <li>5 публикаций</li>
          <li>3 комментария</li>
        </ul>
        <p onClick={logOut}>выйти</p>
      </Modal>
    </>
  );
}
function Sorry(props) {
  const { isOpen, setIsOpen } = props;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={wrap(setIsOpen, false)}
        style={customStyles}>
        <button onClick={wrap(setIsOpen, false)}>закрыть</button> <br />
        Sorry, English version are coming
      </Modal>
    </>
  );
}
export {
  InfoFromDBModal,
  LogModal,
  RegModal,
  Sorry,
  UserModal
};