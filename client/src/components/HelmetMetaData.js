import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export default function HelmetMetaData(props) {
    let location = useLocation();
    let currentUrl = location.pathname;
    let quote = props.quote !== undefined ? props.quote : "";
    let title = props.title !== undefined ? props.title : "Webster Image Editor";
    let image = props.image !== undefined ? props.image : "https://storage.googleapis.com/cmperstribe_storage_usha/Banner/IMG_3640.JPG";
    let description = props.description !== undefined ? props.description  : "With Webster you can create whatever you need with whatever layout you prefer. Landing pages, company websites, editorials, portfolios— the format doesn’t matter, just design." +
    "Webster works on Windows, Linux, Mac and Chrome, so you can create unique graphics no matter your device and get feedback in context by simply sharing a link.!" +
    "Over 30 million people rely on Webster to stay creative and get more done!";
    let hashtag = props.hashtag !== undefined ? props.hashtag : "#webster";
    return (
        <Helmet>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <meta name="description" content={description} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="Webster" />
            <meta property="og:description" content={description} />    
        </Helmet>
    );
}