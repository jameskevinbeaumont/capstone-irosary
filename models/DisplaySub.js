const bookshelf = require('../bookshelf');

const DisplaySub = bookshelf.model("DisplaySub", {
    tableName: "display_sub",
    rosary_display: function () {
        return this.hasMany("display");
    }
});

module.exports = DisplaySub;