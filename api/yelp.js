import axios from "axios";

export default axios.create({
    baseURL:'https://api.yelp.com/v3/businesses',
    headers:{
        Authorization: 'Bearer vso_UemPXQuQvToGE-W5-W2gw51grJsCViICfi7k_T7w4piRaZkNATFnb-jdCFGh5IZUXqKh3enU-R6Uqegih-U43MOy1ppDzRurqbmUfNND3KKjvr4JharKHB95ZnYx',
    }
})