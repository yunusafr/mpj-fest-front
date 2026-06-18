import { useQuery }
from "@tanstack/react-query";

import {

getEventCriteria

}

from "../api/eventCriteriaApi";

export const useEventCriteria
=

(eventId)=>{

return useQuery({

queryKey:[

"event-criteria",

eventId

],

queryFn:()=>

getEventCriteria(

eventId

),

enabled:!!eventId

});

};