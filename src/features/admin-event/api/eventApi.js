import axiosClient from "@/lib/axios";

export const getEvents =
async ()=>{

const response=

await axiosClient.get(

"/admin-event/events"

);

return response.data;

};


export const getEvent=

async(eventId)=>{

const response=

await axiosClient.get(

`/admin-event/events/${eventId}`

);

return response.data;

};