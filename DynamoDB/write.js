var AWS = require('aws-sdk')
let awsConfig = {
    "region":"ap-south-1",
    "endpoint":"dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId":"AKIAZ6S44LDZGRAFQJ2Q",
    "secretAccessKey":"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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let save = function () {

    var input = {
        "eamil_id": "xyz@gmail.com", "created_by": "clientUser", "created_on": new Date().toString(),
        "updated_by": "clientUser", "updated_on": new Date().toString(), "is_deleted": false
    };
    var params = {
        TableName: "users",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("users::save::success" );                      
        }
    });
}

save();
        