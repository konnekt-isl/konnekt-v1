import React  from 'react';
import SVGIcon from "../img/SVGIcon";


export default class SideBar extends React.Component {
    render() {
        return(
             
        <div className="sidebar">{/* Sidebar with vertical logo and icons */}
        <img className="logo-vertical" src={logoVertical} alt="Logo" />
          {/* Container around the 3 icons */}
            <div className="icons-container">
                <div className="single-icon-container">
                <SVGIcon name="phone" width={24}/>
                </div>
                <div className="single-icon-container">
                <SVGIcon name="message" width={24} />
                </div>
                <div className="single-icon-container">
                <SVGIcon name="face" width={24} />
                </div>
            </div>
            <div className="single-icon-container">
              <SVGIcon name="settings" width={24} />
            </div>
            {/* Sidebar ends */}</div>
        )
    }
}