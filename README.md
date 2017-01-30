# FillMeUp-Sequelize

FillMeUp Sequelize is a utility to manage seed data with the Sequelize ORM.

## Installation

```bash
npm install fillmeup-sequelize
```

## Usage

- FillMeUp-Sequelize simply takes in your Sequelize models and the path to your seed data and handles adding the data to the database automatically.
- Here is how you can run your seed data:

```javascript
const models = require("../models");
const fillmeup = require("fillmeup-sequelize");

fillmeup.run(models, __dirname + "/seed_data");
```

- This code will run all JSON files located inside seed_data.

## Seed Data

- FillMeUp-Sequelize expects your seed data in a specific format.
- Seed data must follow this structure:

```json
{
	"Model Name": [Array of objects that you want added to the database]
}
```

- Here is an example JSON file:

```json
{
    "Customer": [
        {
            "customer_name": "Joe Sinclair",
            "customer_email": "j.sinclair@gmail.com",
            "customer_phone": "4157689485",
            "company_name": "Joe's Workshop"
        },
        {
            "customer_name": "John Singh",
            "customer_email": "jsingh@gmail.com",
            "customer_phone": "6478578374",
            "company_name": "Singh's Auto Haul"
        },
        {
            "customer_name": "Gary Kibble",
            "customer_email": "gkibble@gmail.com",
            "customer_phone": "8476409586",
            "company_name": "Kibble Tech"
        }
    ]
}
```