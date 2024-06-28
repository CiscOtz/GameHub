import React, { useState } from 'react';
import './App.css'; // Asegúrate de tener este archivo en tu proyecto de Reac
import facebookIcon from './3225194_app_facebook_logo_media_popular_icon.png';
import googleIcon from './2993685_brand_brands_google_logo_logos_icon.png';
import twitterIcon from './11244080_x_twitter_elon musk_twitter new logo_icon.png';

const Login = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="hero">
            <div className="form-box">
                <div className="button-box">
                    <div id="btn" className={isLoginView ? "visible" : "hidden"}></div>
                    <button className="toggle-btn" onClick={() => setIsLoginView(true)}>Iniciar sesión</button>
                    <button className="toggle-btn" onClick={() => setIsLoginView(false)}>Registrarse</button>
                </div>
                <div className="social-icons">
                <img src={facebookIcon} alt="Facebook" />
                <img src={googleIcon} alt="Google" />
                <img src={twitterIcon} alt="Twitter" />
                </div>
                <form id="login" className={`input-group ${isLoginView ? "visible" : "hidden"}`}>
                    <input type="text" className="input-field" placeholder="Ingresar nombre" required />
                    <input type="password" className="input-field" placeholder="Ingresar contraseña" required />
                    <input type="checkbox" className="check-box" /><span>Recordar contraseña</span>
                    <button type="submit" className="submit-btn">Iniciar sesión</button>
                </form>
                <form id="register" className={`input-group ${isLoginView ? "hidden" : "visible"}`}>
                    <input type="text" className="input-field" placeholder="Ingresar nombre" required />
                    <input type="email" className="input-field" placeholder="Ingresar correo" required />
                    <input type="password" className="input-field" placeholder="Ingresar contraseña" required />
                    <input type="checkbox" className="check-box" /><span>Estoy de acuerdo con los términos y condiciones</span>
                    <button type="submit" className="submit-btn">Registrarme</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
