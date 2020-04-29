﻿// XHR wrapper functions

const doGet = (href, callback) => {
    console.log(href, callback);
    let req = new XMLHttpRequest();
    req.open('GET', href, true);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status >= 200 && req.status < 300) {
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': '',
                    'status': req.status,
                    'statusOK': true,
                    'text': req.responseText

                });
                return callback(answer);


            } else {
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': '',
                    'status': req.status,
                    'statusOK': false,
                    'text': req.responseText

                });
                return callback(answer);

            }
        }
        else {
            //window.alert(`error ${href} ${req.status}`);
        }
    };
    req.send(null);
}

const doPost = (href, objectToPost, callback) => {
    let data = objectToPost;
    console.log(`sending ${data}`);
    let req = new XMLHttpRequest();
    req.open('POST', href, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status >= 200 && req.status < 300) {
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': objectToPost,
                    'status': req.status,
                    'statusOK': true,
                    'text': req.responseText

                });
                return callback(answer);


            } else {
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': objectToPost,
                    'status': req.status,
                    'statusOK': false,
                    'text': req.responseText

                });
                return callback(answer);

            }
        }
        else {
            //window.alert(`error ${href} ${req.status}`);
        }
    };
    req.send(data);
}

const doPut = (href, objectToPost, callback) => {
    let data = objectToPost;
    //console.log(`sending ${data}`);
    let req = new XMLHttpRequest();

    req.open('PUT', href, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status >= 200 && req.status < 300) {
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': objectToPost,
                    'status': req.status,
                    'statusOK': true,
                    'text': req.responseText

                });
                return callback(answer);


            } else {
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': objectToPost,
                    'status': req.status,
                    'statusOK': false,
                    'text': req.responseText

                });
                return callback(answer);

            }
        }
        else {
            //window.alert(`error ${href} ${req.status}`);
        }
    };
    req.send(data);
}

const doDelete = (href, callback) => {
    var req = new XMLHttpRequest();

    req.open('DELETE', href, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status >= 200 && req.status < 300) {
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': '',
                    'status': req.status,
                    'statusOK': true,
                    'text': req.responseText

                });
                return callback(answer);


            } else {
                var answer = JSON.stringify({
                    'origHref': href,
                    'objectToSend': '',
                    'status': req.status,
                    'statusOK': false,
                    'text': req.responseText

                });
                return callback(answer);

            }
        }
        else {
            //window.alert(`error ${href} ${req.status}`);
        }
    };
    req.send(null);
}