import { useQuery }

from "@tanstack/react-query";

import {

getEvents

}

from "../api/eventApi";


export const useEvents=()=>{

return useQuery({

queryKey:[

"admin-event-events"

],

queryFn:

getEvents

});

};