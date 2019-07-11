exports.up = function(knex) {
    return knex.schema.createTable("reviews", table => {
        table.increments("review_id");
        table.integer("user_id")
            .references("user_id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        table.text("review");
        table.string("book_id");
        table.float("rating");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};
