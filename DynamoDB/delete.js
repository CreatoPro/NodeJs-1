var AWS = require('aws-sdk')
let awsConfig = {
    "region":"ap-south-1",
    "endpoint":"dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId":"AKIAZ6S44LDZGRAFQJ2Q",
    "secretAccessKey":"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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let remove = function () {

    var params = {
        TableName: "users",
        Key: {
            "eamil_id": "xyz@gmail.com"
        }
    };
    docClient.delete(params, function (err, data) {

        if (err) {
            console.log("users::delete::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::delete::success");
        }
    });
}

remove();