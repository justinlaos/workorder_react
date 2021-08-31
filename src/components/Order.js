import React, {useEffect, useState} from 'react'
import ApiService from '../apiService'
import { Icon, Input, Button } from 'semantic-ui-react'
import '../styles/MainStyle.css';

const Order = ({property_id, order}) => {
    const [quotesResults, setQuotesResults] = useState([]);
    const [showQuotes, setShowQuotes] = useState(false)
    const [newQuoteTime, setNewQuoteTime] = useState(null);
    const [newQuotePrice, setNewQuotePrice] = useState(null);

    const createQuote = () => {
        ApiService.createQuote(property_id, order.id,
            {"price_est": newQuotePrice, 
             "time_est": newQuoteTime,
             "order_id": order.id,
             "property_id": property_id}
            )
            .then(response => {
                setQuotesResults([response.data, ...quotesResults])
                setNewQuoteTime("")
                setNewQuotePrice("")
            })
            .catch(e => {
                console.log(e);
            });
    }


    useEffect(() => {
        ApiService.getQuotes(property_id, order.id)
            .then(response => {
                setQuotesResults(response.data)
                console.log(response.data)
            })
            .catch(e => { console.log(e); });
    }, [ApiService]);

    return (
        <div class="main">
            <div class={`order-result order-${order.order_status}`} onClick={() => setShowQuotes(!showQuotes)} key={order.id}>
                <div class="order-details">
                    <div class="">{order.order_type}</div>
                    <div class="">{order.order_status}</div>
                    <div>
                        { quotesResults.length >= 1 ? "View Quotes" : "Add a Quote" } 
                        <Icon name={`chevron ${showQuotes ? "chevron up" : "chevron down"}`} /> 
                    </div>

                </div>
                {order.description}
            </div>
            
            { showQuotes && 
                <div class="new-item"> 
                    <Input 
                        list='prices' 
                        placeholder='Estimated Price' 
                        onChange={(e) => setNewQuotePrice(e.target.value)}
                        value={newQuotePrice}
                    />
                    <datalist id='prices'>
                        {[50, 100, 250, 500, 1000].map(element => 
                            <option value={element}>{element}</option>)}
                    </datalist>
                    <Input 
                        list='time' 
                        placeholder='Estimated Hours' 
                        onChange={(e) => setNewQuoteTime(e.target.value)}
                        value={newQuoteTime}
                    />
                    <datalist id='time'>
                        {[.5, 1, 2, 5, 10, 24, 48].map(element => 
                            <option value={element}>{element}</option>)}
                    </datalist>
                    <Button 
                        style={{backgroundColor: '#ffffff', marginLeft: '1rem' }}
                        size='medium'
                        disabled={!newQuoteTime && !newQuotePrice}
                        onClick={createQuote}
                    >
                        Create Quote
                    </Button>
                </div>
            }   

            { showQuotes && 
                (quotesResults && quotesResults.map(quoteItem => {
                    return ( 
                        <div class={`quote quote-selected-${quoteItem.selected}`} key={quoteItem.id}>
                            <div class="quote-details">
                                <div class="">{quoteItem.time_est} - Hours</div>
                                <div class="">Price: ${quoteItem.price_est}</div>
                            </div>
                            {quoteItem.selected ? "Selected" : "Not Selected"}
                        </div>
                    )
                })
                )
            }
        </div> 
    )
}

export default Order
