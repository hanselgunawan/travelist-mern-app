import React from "react";

const ListSidebar = props =>
{return props.travelList.map((data, key) =>
    <div className="row">
        <div className="col-lg-12">
            <h1>{data.title}</h1>
            <p>Description</p>
            <img src="http://img.lum.dolimg.com/v1/images/mshs_iconarcade_smlocked_icn_f1d59ce8.png" />
        </div>
        <div className="col-lg-12">
            <h1>Place</h1>
            <p>Description</p>
            <h6>Location</h6>
            <img src="http://img.lum.dolimg.com/v1/images/mshs_iconarcade_smlocked_icn_f1d59ce8.png" />
            <img src="http://img.lum.dolimg.com/v1/images/mshs_iconarcade_smlocked_icn_f1d59ce8.png" />
            <img src="http://img.lum.dolimg.com/v1/images/mshs_iconarcade_smlocked_icn_f1d59ce8.png" />
        </div>
    </div>
)}

export default ListSidebar;
