import {

useQuery

}

from

"@tanstack/react-query";

import api

from "@/lib/axios";


export function useVotingConfig(

eventId

){

return useQuery({

queryKey:[

"voting-config",

eventId

],

queryFn: async()=>{

const res=

await api.get(

`/events/${eventId}/voting`

);

return res.data.data;

},

enabled:

!!eventId

})

}