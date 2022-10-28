const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
    
})

async function list() {
      return knex("movies").select("*");
    }

async function listShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where({"mt.is_showing": true});
    }

async function read(movieId) {
    return knex("movies as m")
        .where({"m.movie_id": movieId})
        .first();
}

async function listTheaters(movieId) {
    return knex("movies as m")
        .where({"m.movie_id": movieId})
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("mt.*", "t.*")
        .distinct();
}

async function listReviews(movieId){
    return knex("movies as m")
        .where({"m.movie_id": movieId})
        .join("reviews as r", "m.movie_id", "r.movie_id")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*","c.*")
        .then((data) => data.map(addCritic));

}

module.exports = {
  list,
  listShowing,
  read,
  listTheaters,
  listReviews,
};