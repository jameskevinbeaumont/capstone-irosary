const bookshelf = require('../bookshelf');

const MysteryDetail = bookshelf.model("MysteryDetail", {
    tableName: "mystery_detail",
    hasTimeStamps: true,

    mysteryRelated: function () {
        return this.belongsTo("Mystery", "mystery_code");
    }

});

module.exports = MysteryDetail;