import api from "@/lib/axios";

export const getEventCriteria = async (
  eventId
) => {

  const res = await api.get(
    `/events/${eventId}/criteria`
  );

  return res.data;

};

export const saveEventCriteria =
async (

eventId,

payload

)=>{

const res = await api.post(

`/events/${eventId}/criteria`,

payload

);

return res.data;

};