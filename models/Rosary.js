const bookshelf = require('../bookshelf');

const Rosary = bookshelf.model("Rosary", {
    tableName: "rosary",
    hasTimeStamps: true,

    displayRelated: function () {
        return this.belongsTo("Display", "display_code");
    },

    beadRelated: function () {
        return this.belongsTo("Bead", "bead_code");
    },

    mysteryRelated: function () {
        return this.belongsTo("Mystery", "mystery_code");
    }
});

module.exports = Rosary;