import Strapi from "strapi-sdk-js"

const strapi = new Strapi()

async function renderCategory(req, res) {
const category = req.params.category;

    try {
        const tutorials = await strapi.find('tutorial-resource', {
            filters: { 
                category
            }
        });

        res.render(category.toLowerCase(), { tutorials }); 
        // This assumes views named asylum.ejs, family-based.ejs, etc. 
    } catch (error) {
        console.error(`Error fetching ${category} tutorials:`, error);
        res.status(500).render('error', { error }); 
        // Ideally, render a user-friendly error page 
    }
};

module.exports = { renderCategory };
