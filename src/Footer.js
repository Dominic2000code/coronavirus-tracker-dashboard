import React from 'react'
import './Footer.css'

const Footer = ()=>{
    return(
        <footer>
        <a href="https://github.com/davidpaps/covid_19_mapper">
            Github repo charts
        </a>
        &nbsp;&nbsp;Data Sources:{" "}
        <a href="https://github.com/CSSEGISandData/COVID-19">
            John Hopkins
        </a>
        ,{" "}
        <a href="https://www.worldometers.info/coronavirus/">
            Worldometer
        </a>
        , <a href="https://github.com/pomber/covid19">Pomber</a>,
        <a href="https://disease.sh/">Disease.sh</a>
    </footer>
    )
}

export default Footer;