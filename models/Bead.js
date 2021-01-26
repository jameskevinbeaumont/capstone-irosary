const bookshelf = require('../bookshelf');

const Bead = bookshelf.model("Bead", {
    tableName: "bead",
    hasTimeStamps: true,

    rosary: function () {
        return this.hasMany("Rosary");
    }
});

module.exports = Bead;