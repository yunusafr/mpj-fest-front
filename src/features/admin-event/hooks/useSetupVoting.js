import {

useMutation,

useQueryClient

}

from

"@tanstack/react-query";

import api

from "@/lib/axios";


export function useSetupVoting(

eventId

){

const queryClient=

useQueryClient();


return useMutation({

mutationFn:

async(data)=>{

const res=

await api.post(

`/events/${eventId}/voting`,

data

);

return res.data;

},

onSuccess:()=>{

queryClient

.invalidateQueries({

queryKey:[

"voting-config",

eventId

]

})

}

})

}