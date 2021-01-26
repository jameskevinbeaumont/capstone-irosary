const bookshelf = require('../bookshelf');

const Mystery = bookshelf.model("Mystery", {
    tableName: "mystery",
    hasTimeStamps: true,

    rosary: function () {
        return this.hasMany("Rosary");
    }
});

module.exports = Mystery;