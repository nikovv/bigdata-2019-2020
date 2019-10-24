db.createCollection("vehicles", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["model", "identificator"],
            properties: {
                model: {
                    bsonType: "string",
                    description: "required"
                },
                identificator: {
                    bsonType: "string",
                    description: "required"
                }
            }
        }
    }
})

db.vehicles.insert({
    model: "audi",
    indentificator: "1875469"
})



var generateCargoName = function() {
    var cargoName = ['Domati', 'Brokoli', 'Morkovi', 'Qbalki', 'Pileshko Butche'];
    return cargoName[Math.floor(Math.random() * 4)];
}

var generateCategory = function() {
    var categorie = ['Zelenchuci', 'Plodove', 'Meso'];
    return categorie[Math.floor(Math.random() * 3)];
}

var fillCargo = function() {
    var vehicles = db.vehicles.find().toArray();
    var cargo = {}

    for (i = 0; i < vehicles.length; i++) {
        cargo.name = generateCargoName();
        cargo.category = generateCategory();
        cargo.quantity = Math.floor(Math.random + 300) + 1;
        cargo.vehicle_Id = vehicles[i]._id;

        db.cargo.insert(cargo);
    }
}