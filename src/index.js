'use strict';

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

const tableName = process.env.TABLE_NAME;

const createResponse = (status, body) => {
  let response = {
    "statusCode": status,
    "headers": {
      "Access-Control-Allow-Methods": "DELETE, GET, OPTIONS, PUT",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Origin": "*"
    },
    "body": typeof body !== 'string' ? JSON.stringify(body) : body
  };
  console.log(response);
  return response;
};

exports.get = (event, context) => {
  console.log(event);
  var params = {
    "TableName": tableName,
    "Key": {
      id : event.pathParameters.resourceId
    }
  };
  console.log(params);
  dynamo.getItem(params, (err, data) => {
    let response;
    if (err)
      response = createResponse(500, err);
    else
      response = createResponse(200, data.Item ? data.Item.doc : null);
    context.succeed(response);
  });
};

exports.put = (event, context) => {
  console.log(event);
  var item = {
    "id": event.pathParameters.resourceId,
    "doc": event.body
  };
  var params = {
    "TableName": tableName,
    "Item": item
  };
  console.log(params);
  dynamo.putItem(params, (err, data) => {
    let response;
    if (err)
      response = createResponse(500, err);
    else
      response = createResponse(200, data);
    context.succeed(response);
  });
};

exports.delete = (event, context) => {
  console.log(event);
  var params = {
    "TableName": tableName,
    "Key": {
      "id": event.pathParameters.resourceId
    }
  };
  console.log(params);
  dynamo.deleteItem(params, (err, data) => {
    let response;
    if (err)
      response = createResponse(500, err);
    else
      response = createResponse(200, data);
    context.succeed(response);
  });
};
