var request = require("request");

start();

function start() {

    var websiteUID = "HyFuBrueW"; //YOUR WEBSITE-UID HERE
    var websiteSecret = "myWebsiteSecret"; //YOUR WEBSITE-SECRET HERE

    var url = "https://semantify.it/api/annotation/" + websiteUID;

    //preparing dummy annotation
    var annotation = {};
    annotation["@context"] = "http://schema.org/";
    annotation["@type"] = "My Website";
    annotation["name"] = "My Website's title";
    annotation["url"] = "http://my-website.org/test";

    //the CID is a unique (inside your account's scope) identifier you can choos for your data
    var cid = "my-cid-" + "30948ds-fkjslk8_43urlkds-fw4ulskdj_fw93rlkjes";

    //put dummy annotation and cid in new JSON object
    var annotationObject = {};
    annotationObject["cid"] = cid;
    annotationObject["content"] = annotation;

    //push JSON object to JSON array
    var bulk = [];
    bulk.push(annotationObject);

    /** dataset should look like
    * [ {"cid":"<cid>", "content":"<your annotation in JSON-LD>"}, ..., {}]
    **/

    console.log("URL: %s", url);
    console.log("Data: %s", JSON.stringify(bulk));

    //send to semantify.it
    request({
        url: url,
        method: "POST",
        headers: {
            "website-secret": websiteSecret
        },
        json: bulk
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
        } else {
            console.log("error: " + error)
            console.log("response.statusCode: " + response.statusCode)
            console.log("response.statusText: " + response.statusText)
        }
    });
}
