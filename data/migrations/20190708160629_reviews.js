exports.up = function(knex) {
    return knex.schema.createTable("reviews", table => {
        table.increments("review_id");
        table.string("user_id")
            .references("user_id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        table.text("review");
        table.float("rating");
        table.string("book_id")
            .references("id")
            .inTable("books")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};
