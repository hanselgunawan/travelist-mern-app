import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import DropdownCity from "./DropdownCity/DropdownCity";
import LoginNav from "./LoginNav/LoginNav";

let textCenter = {
    textAlign:"center"
};

let logoStyle = {
    fontSize:40
};

let marginTop = {
    marginTop:10
};

let navStyle = {
    height:60
};

const Header = () =>
    <nav className="navbar navbar-default navbar-inverse" style={navStyle}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <div className="navbar-header" style={textCenter}>
                        <a className="navbar-brand" style={logoStyle}>LOGO</a>
                    </div>
                </div>
                <div className="col-lg-9" style={marginTop}>
                    <SearchBar />
                </div>
                <div className="col-lg-1">
                    {/*<DropdownCity />*/}
                    <ul className="nav navbar-nav navbar-right">
                        <LoginNav />
                    </ul>
                </div>
            </div>
        </div>
    </nav>

export default Header;
