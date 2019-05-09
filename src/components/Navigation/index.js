import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {Link as ScrollLink} from 'react-scroll';


import logo from '../img/logo.svg';
import locker from '../img/locker.svg';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import SVGIcon from "../img/SVGIcon";
import logoVertical from '../img/logovertical.svg';
import { NavLink } from 'react-router-dom';


//Hérna er ath hvort notandi sé skráður inn eða ekki, ef hann er skráður inn birtir hann navigation auth en ef ekki birtir hann navigation non auth.
const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (

  <div className="navigation auth">
    <div className="sidebar">{/* Sidebar with vertical logo and icons */}
      <NavLink to={ROUTES.CHATLIST}><img className="logo-vertical" src={logoVertical} alt="Logo" /></NavLink>
      {/* Container around the 3 icons */}
      <div className="icons-container">

        <NavLink className="single-icon-container" activeClassName="active-link" to={ROUTES.TELEPHONE}>
          <SVGIcon className="nav-icon" name="phone" width={24} />
        </NavLink>

        <NavLink className="single-icon-container" activeClassName="active-link" to={ROUTES.CHATLIST}>
          <SVGIcon className="nav-icon" name="message" width={24} />
        </NavLink>


        <NavLink className="single-icon-container" activeClassName="active-link" to={ROUTES.FACETOFACE}>
          <SVGIcon className="nav-icon" name="face" width={24} />
        </NavLink>

      </div>

      <NavLink className="single-icon-container" activeClassName="active-link" to={ROUTES.ACCOUNT}>
        <SVGIcon className="nav-icon" name="settings" width={24} />
      </NavLink>

      {/* Sidebar ends */}</div>
  </div>
);

<<<<<<< HEAD
class NavigationNonAuth extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {


    return (
      <nav className="navigation non-auth sticky" >
        <div className="logo-container">
          <ScrollLink to="logoScroll" smooth={true} duration={500} ><img src={logo} alt="Fara á forsíðu" /></ScrollLink>
        </div>
        <ul className="nav-ul">
          <li className="navigation-link">
             <ScrollLink to="lausnirScroll" smooth={true} duration={500} >Lausnir</ScrollLink>
          </li>
          <li className="navigation-link">
            <ScrollLink to="umOkkurScroll" smooth={true} duration={500} >Um okkur</ScrollLink>
          </li>
          <li className="navigation-link">
            <ScrollLink to="hafaSambandScroll" smooth={true} duration={500} >Hafa samband</ScrollLink>
          </li>
          <li className="navigation-link">
            <Link to={ROUTES.SIGN_IN}>Innskráning</Link>
          </li>
        </ul>
        <button className="nav-locker">
          <Link to={ROUTES.SIGN_IN}>
            <img src={locker} alt="Fara í innskráningu" />
          </Link>
          
        </button>
      </nav>
    )
  }
=======
const NavigationNonAuth = () => {
  return (
    <nav className="navigation non-auth sticky" >
      <div className="logo-container">
        <Link to={ROUTES.LANDING}> <img src={logo} alt="Fara á forsíðu" /></Link>
      </div>
      <ul className="nav-ul">
        <li className="navigation-link">
          <Link to={ROUTES.L_LAUSNIR}>Lausnir</Link>
        </li>
        <li className="navigation-link">
          <Link to={ROUTES.L_OKKARSYN}>Um okkur</Link>
        </li>
        <li className="navigation-link">
          <Link to={ROUTES.L_SAMBAND}>Hafa samband</Link>
        </li>
        <li className="navigation-link">
          <Link to={ROUTES.SIGN_IN}>Innskráning</Link>
        </li>
      </ul>
      <button className="nav-locker">
        <Link to={ROUTES.SIGN_IN}>
          <img src={locker} alt="Fara í innskráningu" />
        </Link>

      </button>
    </nav>
  )
>>>>>>> cef2930a40db3d79716f63d3c4fb784a1d6f1200
};

export default Navigation;
