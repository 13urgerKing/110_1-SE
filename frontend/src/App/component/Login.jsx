import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'
import logo from './../../welcome.png'
import { useHistory } from 'react-router-dom'
import './Login.css'
import {
  TextField,
  Button,
} from '@material-ui/core'

export default function Login() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    button: {
      '& > *': {
        margin: theme.spacing(3),
      },
    },
  }));


  const classes = useStyles()
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const login = () => {
    if (username === "" || password === "") {
      alert("帳號密碼不能為空")
    } else {
      let payload = {
        username: username,
        password: password
      }
      Axios.post(`http://localhost:9100/pvs-api/auth/login`, payload)
        .then((response) => {
          localStorage.setItem("jwtToken", response.data)
          goToSelect()
        })
        .catch((e) => {
          alert(e.response.data)
          console.error(e)
        })
    }
  }

  const register = () => {
    if (username === "" || password === "") {
      alert("帳號密碼不能為空")
    } else {
      let payload = {
        username: username,
        password: password
      }
      Axios.post(`http://localhost:9100/pvs-api/member`, payload)
        .then((response) => {
          alert(response.data)
        })
        .catch((e) => {
          alert(e.response.data)
          console.error(e)
        })
    }
  }

  const goToSelect = () => {
    history.push("/select")
  }

  return (
    <div class={classes.root}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextField
          id="username"
          label="Username"
          type="text"
          variant="outlined"
          background
          onChange={(e) => { setUsername(e.target.value) }}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          background
          onChange={(e) => { setPassword(e.target.value) }}
        />

        <div class={classes.button}>
          <Button variant="contained" onClick={login} style={{ width: '90px' }} color="primary">
            Login
          </Button>
          <Button variant="contained" onClick={register} style={{ width: '90px' }} color="primary">
            Register
          </Button>
        </div>
      </header>
    </div>
  )
}
