const fs = require("fs");
const junk = require("junk");
const helpers = require("./helpers");

let FillMeUp = {};

FillMeUp.run = (models, seed_path) => {
    const seeds = fs.readdirSync(seed_path);

    seeds.filter(junk.not).forEach((seed) => {
        let seed_json = helpers.read_seed_json(seed, seed_path);

        let model = helpers.get_first_key(seed_json);

        helpers.clear_model(models, model)
        .then(() => {
            helpers
            .bulk_add(models, model, seed_json);
        });
    });
}

module.exports = FillMeUp;
