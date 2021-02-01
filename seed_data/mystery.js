const moment = require('moment');

module.exports = [
    {
        code: "SORROWFUL",
        description: "SORROWFUL MYSTERIES",
        image: "sorrowful-5-crucifixtion.jpg",
        dayofweek_1: 2,
        dayofweek_2: 5,
        media_file: "tue-fri-sorrowful.m4a",
        vtt_file: "tue-fri-sorrowful.vtt",
        active: 0,
        duration: 15,
        created_at: moment().format(("YYYY-MM-DD HH.mm.SS.SSS")),
        updated_at: moment().format(("YYYY-MM-DD HH.mm.SS.SSS"))
    },
    {
        code: "JOYFUL",
        description: "JOYFUL MYSTERIES",
        image: "joyful-1-annunciation.jpg",
        dayofweek_1: 1,
        dayofweek_2: 6,
        media_file: "mon-sat-joyful.m4a",
        vtt_file: "mon-sat-joyful.vtt",
        active: 0,
        duration: 15,
        created_at: moment().format(("YYYY-MM-DD HH.mm.SS.SSS")),
        updated_at: moment().format(("YYYY-MM-DD HH.mm.SS.SSS"))
    },
    {
        code: "GLORIOUS",
        description: "GLORIOUS MYSTERIES",
        image: "glorious-1-resurrection.jpg",
        dayofweek_1: 3,
        dayofweek_2: 0,
        media_file: "sun-wed-glorious.m4a",
        vtt_file: "sun-wed-glorious.vtt",
        active: 0,
        duration: 15,
        created_at: moment().format(("YYYY-MM-DD HH.mm.SS.SSS")),
        updated_at: moment().format(("YYYY-MM-DD HH.mm.SS.SSS"))
    },
    {
        code: "LUMINOUS",
        description: "LUMINOUS MYSTERIES",
        image: "luminous-3-proclamation.jpg",
        dayofweek_1: 4,
        dayofweek_2: null,
        media_file: "thu-luminous.m4a",
        vtt_file: "thu-luminous.vtt",
        active: 0,
        duration: 15,
        created_at: moment().format(("YYYY-MM-DD HH.mm.SS.SSS")),
        updated_at: moment().format(("YYYY-MM-DD HH.mm.SS.SSS"))
    }
]