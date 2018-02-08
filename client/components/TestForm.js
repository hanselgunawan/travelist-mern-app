import React from "react";
import { Form, Input, TextArea } from 'semantic-ui-react'

let buttonStyle = {
    background:"transparent",
    border: 0,
    display: "inline",
    float: "right",
    marginTop: -20
};

let shareStyle = {
    borderWidth: 2,
    borderColor: "#9bb068",
    border: "solid",
    textAlign: "center",
    margin:0,
    marginTop:20
};

const TestForm = props =>
    <div>
        <div className="row">
            <div className="col-lg-4">
                <div className='results'>
                    <div className='featured-image'>
                        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                                <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                            </ol>


                            <div className="carousel-inner">
                                <div className="item active">
                                    <img src='https://www.soelden.com/urlaub/images/SD/WI/headerbilder/aktivitaeten_header_restaurant,method=scale,prop=data,id=1200-510.jpg' alt="..." />
                                </div>
                                <div className="item">
                                    <img src="https://www.discoverlosangeles.com/sites/default/files/styles/listography_image/public/Restaurants/rays-and-stark-bar-interior.jpg?itok=8Lm1zqJM" alt="..." />
                                </div>
                                <div className="item">
                                    <img src="http://shrimpandburger.co.uk/wp-content/uploads/2013/06/Shrimp-and-Burger-restaurant-U-940x623.jpg" alt="..." />
                                </div>
                            </div>


                            <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                            </a>
                            <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right"></span>
                            </a>
                        </div>
                        <div className='arrow'></div>
                    </div>
                    <article>
                        <header>
                            <h3><span>
                                <Input
                                    size='massive'
                                    icon='edit'
                                    placeholder='List Title'
                                    fluid='true'
                                    name='listTitle'
                                    value={props.listTitle}
                                    onChange={props.handleInputChange}
                                />
                                <Input
                                    size='large'
                                    icon='edit'
                                    placeholder='List Subtitle'
                                    fluid='true'
                                    name='listSubtitle'
                                    value={props.listSubtitle}
                                    onChange={props.handleInputChange}
                                />
                            </span></h3>
                        </header>
                        <div className='excerpt'>
                            <Form>
                                <TextArea
                                    autoHeight
                                    name="listDescription"
                                    value={props.listDesc}
                                    onChange={props.handleInputChange}
                                    icon="edit"
                                    placeholder='Description'
                                />
                            </Form>

                            <a href="#" title="Love it" className="small-btn btn-counter" data-count="23"><span><i className="fa fa-heart"></i></span></a>
                            <button title="Favorite" style={buttonStyle}><i className="fa fa-bookmark"></i></button>
                            <button title="Edit" style={buttonStyle}><i className="fa fa-pencil"></i></button>
                        </div>

                        <div className="row" style={shareStyle}>
                            <div className="col-md-12" style={{marginTop:10}}>
                                Share this list <button style={{background: "transparent", border: 0}}><i className="fa fa-twitter"></i></button><button style={{background: "transparent", border: 0}}><i className="fa fa-facebook"></i></button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        <button className="btn btn-success" onClick={props.insertNewCard.bind(null,"5a7c0d78966c124ef97d5bf1")}>Submit</button>
    </div>

export default TestForm;