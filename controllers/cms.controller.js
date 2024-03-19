const STRAPI_URL = 'http://localhost:1337';  // Replace with your Strapi URL

async function fetchTutorials(category) {
    const response = await fetch(`${STRAPI_URL}/api/tutorials?filters[category]=${category}`);

    if (!response.ok) {
        throw new Error(`Error fetching tutorials: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.data; // Return the array of tutorials 
}

async function renderAsylum(req, res) {
    const category = req.params.category; 

    try {
        const tutorials = await fetchTutorials(category);
        res.render('asylum', { tutorials }); // Assuming you have 'asylum.ejs'
    } catch (error) {
        console.error(`Error fetching ${category} tutorials:`, error);
        // Ideally, render an error page with a user-friendly message
        res.status(500).render('error', { error }); 
    }
};

module.exports = {
    renderAsylum,
};
