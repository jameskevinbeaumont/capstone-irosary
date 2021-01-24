const convertVttToJson = (vttString) => {
    return new Promise((resolve, _reject) => {
        let current = {};
        let sections = [];
        let start = false;
        let vttArray = vttString.split('\n');

        vttArray.forEach((line, index) => {
            if (line.replace(/<\/?[^>]+(>|$)/g, "") === " ") {
            } else if (line.replace(/<\/?[^>]+(>|$)/g, "") === "") {
            } else if (line.indexOf('-->') !== -1) {
                start = true;

                if (current.start) {
                    sections.push(clone(current))
                };

                current = {
                    start: timeString2ms(line.split("-->")[0].trimRight().split(" ").pop()),
                    end: timeString2ms(line.split("-->")[1].trimLeft().split(" ").shift()),
                    part: ''
                }
            } else if (line.replace(/<\/?[^>]+(>|$)/g, "") === "") {
            } else if (line.replace(/<\/?[^>]+(>|$)/g, "") === " ") {
            } else {
                if (start) {
                    if (sections.length !== 0) {
                        if (sections[sections.length - 1].part.replace(/<\/?[^>]+(>|$)/g, "") === line.replace(/<\/?[^>]+(>|$)/g, "")) {
                        } else {
                            if (current.part.length === 0) {
                                current.part = line;
                            } else {
                                current.part = `${current.part} ${line}`;
                            }
                            // If it's the last line of the subtitles
                            if (index === vttArray.length - 1) {
                                sections.push(clone(current));
                            }
                        }
                    } else {
                        current.part = line;
                        sections.push(clone(current));
                        current.part = '';
                    };
                };
            };
        });

        current = [];

        sections.forEach(section => {
            section.part = section.part.replace(/<\/?[^>]+(>|$)/g, "")
        });
        resolve(sections);
    });
};

function timeString2ms(a, b) {
    // eslint-disable-next-line
    return a = a.split('.'),
        b = a[1] * 1 || 0,
        a = a[0].split(':'),
        b + (a[2] ? a[0] * 3600 + a[1] * 60 + a[2] * 1 : a[1] ? a[0] * 60 + a[1] * 1 : a[0] * 1) * 1e3;
};

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    };
    return copy;
};

module.exports = convertVttToJson;