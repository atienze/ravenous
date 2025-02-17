const apiKey = 'xK5xGLMYaI-QFrXGG-xScmUsxcWqOqWIvr3_m8xFScycZn2HZQkm0l5FFsRXMXOBUdsyzKzQvHblZjxpiHjGqtDbceCDK2Zl4MxlIG23O1_TNitdeH1gOo_WDBOtZ3Yx'

const Yelp = {
    async search(term, location, sortBy) {

        const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
        const endpoint = `api.yelp.com/v3/businesses/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}&sort_by=${encodeURIComponent(sortBy)}`;

        try {
            const response = await fetch(corsAnywhereUrl + endpoint, {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            })
            const jsonResponse = await response.json()
            if(!jsonResponse.businesses){
                return [];
            };
            const businessList = jsonResponse.businesses.map((business)=>{
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location?.address1,
                    city: business.location?.city,
                    state: business.location?.state,
                    zipCode: business.location?.zip_code,
                    category: business.categories?.[0]?.title || "",
                    rating: business.rating,
                    reviewCount: business.review_count
                }
            });
            return businessList;
        } catch (error) {
            console.error("Error occured:", error.message);
            return [];
        }
    }
};

export default Yelp