/**
 * Created by Dhingu on 4/30/15.
 */
Meteor.methods({
    "uploadFile": function (fileid, filename) {
        var fs = Meteor.npmRequire('fs');
        Entry.remove({});
        Column.remove({});
        Meteor.setTimeout(function () {
            ///uploads/files/:collectionName/:id/:filename
            var filepath = './public/imports/uploads-' + fileid + "-" + filename;
            fs.exists(filepath, function (exists) {
                if (exists)
                    console.log('file exist');
                else
                    return true;
            });

            CSV().from.stream(
                fs.createReadStream(filepath),
                {
                    'escape': '\\', columns: true
                })
                .on('record', Meteor.bindEnvironment(function (row, index) {
                    //console.log(index);
                    if (index === 0) {
                        for (var item in row) {
                            Column.insert({
                                'columnName': item
                            }, function (error) {
                                console.log('error' + error);
                            })
                        }
                    }
                    Entry.insert(row,
                        function (error) {
                            console.log('row eror in insert');
                            console.log('error' + error);
                        }
                    )
                }))
                .on('error', function (error) {
                    console.log('error error')
                    console.log('error' + error);
                })
                .on('open', function (error) {
                    console.log('open event fired')
                    console.log('open ' + error);
                })
                .on('readable', function () {
                    console.log('stream ready to read')
                })
                .on('end', function (count) {
                    console.log('end end');
                    console.log('end' + count);
                    return false;
                })
        }, 500);
    }
});

