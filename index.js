const fs = require("fs");
const junk = require("junk");
const async = require("async");

const helpers = require("./helpers");

let FillMeUp = {};

FillMeUp.run = (models, seed_path) => {
    return new Promise((resolve, reject) => {
        const seeds = fs.readdirSync(seed_path);

        let ops = [];

        seeds.filter(junk.not).forEach((seed) => {
            ops.push((cb) => {
                let seed_json = helpers.read_seed_json(seed, seed_path);

                let model = helpers.get_first_key(seed_json);

                helpers.clear_model(models, model)
                .then(() => {
                    return helpers
                    .bulk_add(models, model, seed_json)
                    .then(() => {
                        cb();
                        return null;
                    })
                    .catch((err) => {
                        cb(err);
                        return null;
                    });
                })
                .catch(() => {
                    console.log(`FillMeUp -> There was a problem clearing the ${model} model`);
                });
            });
        });

        async.series(ops, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = FillMeUp;
