const fs = require("fs");
const path = require("path");
const async = require("async");

let helpers = {};

//Remove all records from a model
helpers.clear_model = (models, model) => {
    return models[model]
    .destroy({
        where: {}
    });
}

//Add multiple objects to DB from array
helpers.bulk_add = (models, model, data) => {
    return new Promise((resolve, reject) => {
        let ops = [];

        console.log(`CURRENTLY SEEDING: ${model}`);

        data[model].forEach((obj) => {
            ops.push((cb) => {
                models[model]
                .create(obj)
                .then(() => {
                    cb();
                    return null;
                })
                .catch((err) => {
                    cb(err);
                    return null;
                });
            });
        });

        async.series(ops, (err) => {
            if (err) {
                reject(err, `Error seeding the ${model} model`);
            } else {
                resolve();
            }
        });
    });
}

//Get JSON from seed JSON files
helpers.read_seed_json = (file_name, file_path) => {
    const contents = fs.readFileSync(file_path + "/" + file_name, "utf8");

    return JSON.parse(contents);
}

//Get first key in object
helpers.get_first_key = (obj) => {
    for (let key in obj) {
        return key;
    }
}

module.exports = helpers;
