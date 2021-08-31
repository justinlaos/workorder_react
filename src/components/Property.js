import React, {useEffect, useState} from 'react'
import ApiService from '../apiService'
import '../styles/MainStyle.css';
import { Button, Dropdown, Input } from 'semantic-ui-react'
import Order from "./Order"

const Property = ({property}) => {
    const [orderResults, setOrderResults] = useState([]);
    const [newOrderType, setNewOrderType] = useState('standard');
    const [newOrderDescription, setNewOrderDescription] = useState(null);

    const options = [
        { key: 'standard', text: 'standard', value: 'standard' },
        { key: 'special', text: 'special', value: 'special' },
        { key: 'electrical', text: 'electrical', value: 'electrical' },
        { key: 'preventative', text: 'preventative', value: 'preventative' },
        { key: 'safety', text: 'safety', value: 'safety' },
        { key: 'emergency', text: 'emergency', value: 'emergency' },
        { key: 'inspection', text: 'inspection', value: 'inspection' },
    ]

    const createOrder = () => {
        ApiService.createOrder(property.id,
            {"description": newOrderDescription, 
             "order_type": newOrderType,
             "order_status": "created",
             "property_id": property.id}
            )
            .then(response => {
                setOrderResults([response.data, ...orderResults])
                setNewOrderType("")
                setNewOrderDescription("")
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        ApiService.getOrders(property.id)
            .then(response => {
                setOrderResults(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }, [ApiService]);

    return (
        <div class="main">
            <div class="property-name">{property.address}</div>
            <div class="new-item"> 
                <Input
                    action={
                        <Dropdown button basic floating options={options} onChange={(e) => setNewOrderType(e.target.textContent)} defaultValue={newOrderType} />
                    }
                    onChange={(e) => setNewOrderDescription(e.target.value)}
                    value={newOrderDescription}
                    icon='home'
                    iconPosition='left'
                    placeholder='New Order Description'
                />
                <Button 
                    style={{backgroundColor: '#ffffff', marginLeft: '1rem' }}
                    size='medium'
                    disabled={!newOrderDescription}
                    onClick={createOrder}
                >
                    Create
                </Button>
            </div>
            { orderResults && orderResults.map(orderItem => { return <Order key={orderItem.id} order={orderItem} /> }) }
        </div> 
    )
}

export default Property
