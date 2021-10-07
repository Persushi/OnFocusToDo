import React, { useState } from 'react'
import guest from '../../assets/guest.png'
import padlock from '../../assets/padlock.ico'
import user from '../../assets/user.ico'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.css'
import { postLogin } from '../../actions'

const Login = ({ postLogin, isLogged, error }) => {
    const [loginData, setLoginData] = useState({ user: "", password: "" })
    /* useEffect(() => { un codigo para agregar colores aleatorios en cada render
        numero = Math.floor(Math.random() * 10)
        switch (numero) {
            case 1: setColor("gray"); break;
            case 2: setColor("red"); break;
            case 3: setColor("blue"); break;
            case 4: setColor("aquamarine"); break;
            case 5: setColor("transparent"); break;
            case 6: setColor("gray"); break;
            case 7: setColor("yellow"); break;
            case 8: setColor("orange"); break;
            case 9: setColor("green"); break;
            default: break;
        }
    }, [value]) */
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        postLogin(loginData.user, loginData.password)
    }
    return (
        isLogged ? <Redirect to="/home" /> :
            <div className='loginContainer'>
                <img className='guest' src={guest}></img>
                {error && <label className='formError'>incorrect user name/password combination</label>}
                <form onSubmit={handleSubmit}>
                    <div className='form'><img src={user} className='ico' /><input name="user" className='formInput' placeholder="Username" onChange={handleChange}></input></div>
                    <div className='form'><img src={padlock} className='ico' /><input name="password" className='formInput' placeholder="Password" type="password" onChange={handleChange}></input></div>
                    <button type="submit" className="login">LOGIN</button>
                </form>

            </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        postLogin: (user, password) => {
            dispatch(postLogin(user, password))
        }
    }
}
const mapStateToProps = state => {
    return {
        isLogged: state.isLogged,
        error: state.error
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)