const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    //critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    //created_at: "critic.created_at",
   //updated_at: "critic.updated_at",
    
})

async function read(reviewId) { 
    return knex("reviews as r")
        .where({"r.review_id": reviewId })
        .first()
}

async function update(updatedReview) {
    await knex("reviews")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*");

    return knex("reviews as r")
        .where({ review_id: updatedReview.review_id })
        .join("critics as c", "r.critic_id", "c.critic_id")
        .then((data) => data.map(addCritic))
        .then((data) => data[0]);
        

}

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  }

module.exports = {
    update,
    read,
    delete: destroy,
  };