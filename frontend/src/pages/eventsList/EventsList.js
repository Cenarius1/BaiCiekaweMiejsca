import React from "react";
import Event from "./Event";

function EventsList(props) {
  return (
    <div>
        {props.events.map(e => 
            <Event description={e.description} rating={e.rating} fullDescription={e.fullDescription} 
            organizers={e.organizers} contact={e.contact} date={e.date} id={e.id} cost={e.cost} title={e.title} />
        )}
     </div> 
  ); 
} 

export default EventsList;