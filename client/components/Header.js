import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import DropdownCity from "./DropdownCity/DropdownCity";
import LoginNav from "./LoginNav/LoginNav";
import "./Header.css"
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Label} from 'semantic-ui-react';

let textCenter = {
    textAlign:"center",
    marginTop:10
};

let logoStyle = {
    fontSize:40,
    color:"black"
};

let marginTop = {
    marginTop:8
};

let navStyle = {
    height:60
};

let plusButton = {
    marginTop:8,
    fontSize:25,
    borderRadius:50,
    color:"black",
    borderWidth:1,
    borderColor:"black",
    borderStyle:"solid",
    textAlign:"center"
};

const Header = () =>
    <nav className="navbar navbar-default navbar-inverse" style={navStyle}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <div className="navbar-header" style={textCenter}>
                        <Link to="/" className="navbar-brand" style={logoStyle}>LISTO</Link>
                    </div>
                </div>
                <div className="col-lg-9" style={marginTop}>
                    <SearchBar />
                </div>
                <div className="col-lg-1">
                    {/*<DropdownCity />*/}
                    <ul className="nav navbar-nav navbar-right">
                        <Link to="/add" style={{marginTop:7}}><Button content='New List' primary /></Link>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

export default Header;
