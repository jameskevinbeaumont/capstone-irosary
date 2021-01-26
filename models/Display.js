const bookshelf = require('../bookshelf');

const Display = bookshelf.model("Display", {
    tableName: "display",
    hasTimeStamps: true,

    displaySubRelated: function () {
        return this.belongsTo("DisplaySub", "display_sub_code");
    },

    rosary: function () {
        return this.hasMany("Rosary");
    }
});

module.exports = Display;