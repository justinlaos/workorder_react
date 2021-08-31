import React, { useState, useEffect } from 'react'
import Property from "./Property"
import '../styles/MainStyle.css';

const Main = ({properties}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
        if (properties != searchResults) {
            setSelectedProperty(null)
        }
        setSearchResults(properties)
    });

    if (selectedProperty) return <Property property={selectedProperty}/>

    if (searchResults && searchResults.length <= 0) return <div> No Search Results</div>

    return (
        <div class="main">
            Search Results
            { searchResults && 
                searchResults.map(propertyItem => {
                    return (<div class="search-result" key={propertyItem._source.id} onClick={() => setSelectedProperty(propertyItem._source)}>
                        {propertyItem._source.address},  {propertyItem._source.city}
                    </div>)
                })
            }
        </div>
    )
}

export default Main
