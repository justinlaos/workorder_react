import React, { useState } from 'react'
import ApiService from '../apiService'
import { Input, Button } from 'semantic-ui-react'

const Search = ({onSubmit}) => {
    const [search_term, setSearch_term] = useState("");

    const onChangeSearchTerm = e => {
        const search = e.target.value;
        setSearch_term(search);
    };

    const SearchForProperties = () => {
        ApiService.getSearchedProperties(search_term)
            .then(response => {
                onSubmit(response.data)
                setSearch_term("")
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <Input 
                size={'small'}
                placeholder='Your address' 
                onChange={onChangeSearchTerm}
            />
            <Button 
                style={{backgroundColor: '#3898ec', marginLeft: '1rem' }}
                size='large'
                onClick={SearchForProperties}
            >
                Search
            </Button>
        </div>
        
    )
}

export default Search
