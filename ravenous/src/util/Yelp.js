const apiKey = "sFP3kofqkvFES73KKjiPF3UbAlbj6ve60VBb0olaBozdME2chIfs4fA_r_KmfeA_CYtkPNP0p6txeWlVMDEeKACyVwHTqo_5q9atsb9ku9jYQtxglIlOxvzsZ2etWnYx";

const Yelp = {
  search(term, location, sortBy){
    return fetch(
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + 
      term + "&location=" + location + "&sort_by=" + sortBy,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.businesses){
        return jsonResponse.businesses.map(business => (
          {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.display_address,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].first,
            rating: business.rating,
            reviewCount: business.review_count
          }
        ));
      }
    });
  }
}

export default Yelp;