
exports.up = function(knex) {
    return knex.schema
        .createTable("critics", (table) => {
            table.increments("critic_id").primary(); // Sets critic_id as the primary key
            table.string("preferred_name");
            table.string("surname");
            table.string("organization_name");
            table.timestamps(true, true); // Adds created_at and updated_at columns
        })
        .createTable("movies", (table) => {
            table.increments("movie_id").primary();
            table.string("title");
            table.integer("runtime_in_minutes");
            table.string("rating");
            table.text("description");
            table.string("image_url");
            table.timestamps(true, true); // Adds created_at and updated_at columns
        })
        .createTable("theaters", (table) => {
            table.increments("theater_id").primary();
            table.string("name");
            table.string("address_line_1");
            table.string("address_line_2");
            table.string("city");
            table.string("state");
            table.string("zip");
            table.timestamps(true, true); // Adds created_at and updated_at columns
        })
        .createTable("reviews", (table) => {
            table.increments("review_id").primary();
            table.text("content");
            table.integer("score");
            table.integer("critic_id").unsigned().notNullable();
            table
                .foreign("critic_id")
                .references("critic_id")
                .inTable("critics")
                .onDelete("CASCADE");
            table.integer("movie_id").unsigned().notNullable();
            table
                .foreign("movie_id")
                .references("movie_id")
                .inTable("movies")
                .onDelete("CASCADE");
            table.timestamps(true, true); // Adds created_at and updated_at columns
        })
        .createTable("movies_theaters", (table) => {
            table.integer("movie_id").unsigned().notNullable();
            table
                .foreign("movie_id")
                .references("movie_id")
                .inTable("movies")
                .onDelete("CASCADE");
            table.integer("theater_id").unsigned().notNullable();
            table
                .foreign("theater_id")
                .references("theater_id")
                .inTable("theaters")
                .onDelete("CASCADE");
            table.boolean("is_showing");
        });

};

exports.down = function(knex) {
    return knex.schema
        .dropTable("movies_theaters")
        .dropTable("reviews")
        .dropTable("theaters")
        .dropTable("movies")
        .dropTable("critics");
        
};

