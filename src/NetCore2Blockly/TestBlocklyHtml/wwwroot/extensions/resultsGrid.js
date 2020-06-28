
var dataObject = [];
var objectsForGrid = [];
var hot;
function initGrid(gridElement) {
    //console.log(gridElement);
    hot = new Tabulator(gridElement, {
        columns: [{ title: 'Step',field:'id' }],
        layout: "fitColumns",   
        dataTree: false,
        dataTreeStartExpanded: false,

    });
    var data = [{ id: 'next steps!' }]
    hot.replaceData(data);
    hot.redraw(true);
}
function AddStringToGrid(value) {
    if (value.startsWith("{") && value.endsWith("}")) {
        try {
            var obj = JSON.parse(value);
            objectsForGrid.push(obj);
        }
        catch(err)  {
            //do nothing
        }
    };
    if (value.startsWith("[") && value.endsWith("]")) {
        try {
            var arr = JSON.parse(value);
            for (var i = 0; i < arr.length; i++) {
                objectsForGrid.push(arr[i]);
            };
        }
        catch(err) {
            //do nothing
        }

    };

}
function AddDataToGrid(value, gridElement) {
    dataObject.push([value]);
    //gridElement.innerHTML = '';
    //hot.addData([dataObject]);
    //hot.redraw(true);
    //window.alert(JSON.stringify(value) + typeof value);
    if (typeof value === 'string') {
        AddStringToGrid(value);
        return;
    }
    if (typeof value === 'object') {
        AddStringToGrid(JSON.stringify(value));
        return;
    }
}
function ClearDataGrid() {
    dataObject = [];
    objectsForGrid = [];
    if (hot != null) {
        
        hot.setColumns([{ title: 'Step', field: 'id' }, { title: 'Value', field: 'val' }]);
        hot.replaceData([{id:'1', val: 'next steps here' }]);
        hot.redraw(true);           

        
        
    }

}
function FinishGrid() {

    if (objectsForGrid.length == 0)
        return;

    var headers = [];
    var obj = objectsForGrid;
    //console.log("object !", obj);
    
    for (var i = 0; i < obj.length; i++) {
        var data = obj[i];
        if (typeof data === 'string') {
            headers.push("_");
        }
        else {
            headers.push(...Object.keys(data));
        }
    }
    //console.log("headers 1", headers);
    var mySet = new Set(headers);
    headers = Array.from(mySet);
    
    var allHeaders = [...headers];
    var fullData = [];
    for (var i = 0; i < obj.length; i++) {
        var data = obj[i];
        //console.log(data);
        var res = { Nr : i + 1 };
        //res["_children"] = [];
        for (var p = 0; p < headers.length; p++) {
            var key = headers[p];
            var defKey = goodNameForKey(key);
            //console.log(`${key} ${data && data.hasOwnProperty(key)} `)
            if (data && data.hasOwnProperty(key)) {
                var val = data[key];
                if (typeof val === "object") {
                    res[defKey] = JSON.stringify(val);
                    
                    //res["_children"].push(val);
                    //allHeaders.push(...Object.keys(val));
                }
                else
                    res[defKey]=val;
            }
            else {
                if (typeof data === 'string' && p===0) {
                    res[defKey]=data;
                }
                else {
                    res[defKey]='';
                }
            }
        }
        fullData.push(res);
    }
    headers.splice(0, 0, "Nr");
    allHeaders.splice(0, 0, "Nr");
    var hs = allHeaders.map(it => { return { title: it, field: goodNameForKey(it),  headerFilter: true} });
    //window.alert(JSON.stringify(hs));
    //window.alert(JSON.stringify(fullData));
    hot.setColumns(hs);
    hot.replaceData(fullData);
    hot.redraw(true);           
}

function goodNameForKey(key) {
    var ret = key;
    ret = ret.replace(".", "_");
    return ret;
}
