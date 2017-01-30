const fs = require("fs");
const path = require("path");

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
    return data[model].forEach((obj) => {
        models[model]
        .create(obj);
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
