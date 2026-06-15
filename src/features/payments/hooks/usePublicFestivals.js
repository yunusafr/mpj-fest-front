import { useQuery }
from "@tanstack/react-query";

import {
getPublicFestivals
}
from "../api/getPublicFestivals";

export function usePublicFestivals(){

return useQuery({

queryKey:[
"public-festivals"
],

queryFn:
getPublicFestivals,

});

}