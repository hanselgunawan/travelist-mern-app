import React from "react";

const ListSidebar = props =>
{return props.travelList.map((data, key) =>
    <div className="row">
        <div className="col-lg-12">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <img style={{height:100, width:100}} src={data.listImg} />
        </div>
        {data.places.map((placeData) =>
            <div className="col-lg-12">
                <h1>{placeData.placeTitle}</h1>
                <p>{placeData.placeDescription}</p>
                <h6>{placeData.placeLocation}</h6>
                <p><span>Longitude: {placeData.placeLongitude}</span> || <span>Latitude: {placeData.placeLatitude}</span></p>
                {placeData.placeImage.map((placeImgData) =>
                    <img style={{height:100, width:100}} src={placeImgData} />
                )}
            </div>
        )}
    </div>
)}

export default ListSidebar;
