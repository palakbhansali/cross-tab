Template.home.helpers({
    columns: function () {
        return Column.find();
    }
});
Template._header.events({
    "submit form"        : function (event, template) {
        event.preventDefault();

        $('.progress-bar-success').removeClass('hidden').addClass('active');
        /*   console.log("Form submitted");
         console.log(event.type);*/
        var theFile = new FS.File(event.target.myFileInput.files[0]);

        Uploads.insert(theFile, function (err, fileObj) {
            if (!err) {
                Meteor.call('uploadFile', fileObj._id, event.target.myFileInput.files[0].name, function (err, result) {
                    if (!err) {
                        Meteor.setTimeout(function () {
                            var records = Entry.find({}).fetch();
                            var recordColumns = Column.find({}).fetch();
                            console.log(recordColumns.length);
                            console.log(records.length);

                            if (records.length > 0) {
                                var bodyPanelBtnOneStart = '', bodyPanelBtnOneEnd = '', bodyPanelBtnTwoStart = '', bodyPanelBtnTwoEnd = '', bodyPanelLi = '', bodyContainerStart = '', bodyContainerEnd = '';
                                var trCsvStart = '', trCsvBody = '', trCsvEnd = '', tdCsv = '', tableRecords = '', tableBodyStart = '<tbody class="tbody">', tableBodyEnd = '</tbody>';

                                // Input DropDowns
                                bodyContainerStart = '<div class="item pull-left">';
                                bodyContainerEnd = '</div>';
                                bodyPanelBtnOneStart = '<div class="col-md-1"> <button class="btn btn-default btn-variable" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true"> Select <span class="caret"></span> </button> <ul class="dropdown-menu drpOne" role="menu" aria-labelledby="dropdownMenu1">';
                                bodyPanelBtnOneEnd = '</ul> </div>';
                                bodyPanelBtnTwoStart = '<div class="col-md-1"> <button class="btn btn-default btn-variable" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true"> Select <span class="caret"></span> </button> <ul class="dropdown-menu drpTwo" role="menu" aria-labelledby="dropdownMenu1">';
                                bodyPanelBtnTwoEnd = '</ul> </div>';
                                for (var i = 0; i < recordColumns.length; i++) {
                                    bodyPanelLi += '<li role="presentation" class="listItem"><a class="menuItem" role="menuitem" tabindex="-1" href="#">' + recordColumns[i].columnName + '</a> </li>';
                                }
                                var btnVariableOne = bodyPanelBtnOneStart + bodyPanelLi + bodyPanelBtnOneEnd;
                                var btnVariableTwo = bodyPanelBtnTwoStart + bodyPanelLi + bodyPanelBtnTwoEnd;
                                $('.tblCSV .panel-body').append(bodyContainerStart + btnVariableOne + bodyContainerEnd);
                                $('.tblCSV .panel-body').append(bodyContainerStart + btnVariableTwo + bodyContainerEnd);

                                for (var i = 0; i < records.length; i++) {
                                    trCsvStart = '', tdCsv = '', trCsvEnd = '';
                                    trCsvStart = '<tr>';
                                    for (var j = 0; j < recordColumns.length; j++) {
                                        tdCsv += '<td>' + records[i][recordColumns[j].columnName] + '</td>';
                                    }
                                    trCsvEnd = '</tr>';
                                    tableRecords += trCsvStart + tdCsv + trCsvEnd;
                                }
                                $('.btn-reset').removeClass('disabled');
                                $('.btnSubmit').addClass('disabled');
                                $('.tblCSV').removeClass('hidden');
                                $('.table-records').append(tableBodyStart + tableRecords + tableBodyEnd);
                                $('.progress-bar-success').removeClass('active');
                            }
                            else
                                $('.tblMain').append('<div class="alert alert-danger alert-dismissible" role="alert">'
                                    + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                                    + '<strong>Snap!</strong> server error.</div>');
                        }, 15000);
                    }
                    else
                        $('.tblMain').append('<div class="alert alert-danger alert-dismissible" role="alert">'
                            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                            + '<strong>Snap!</strong> server error.</div>');
                });
            }
            else
                $('.tblMain').append('<div class="alert alert-danger alert-dismissible" role="alert">'
                    + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                    + '<strong>Snap!</strong> server error.</div>');
        })
    },
    "change .myFileInput": function (event, template) {
        if ($('.myFileInput').val())
            $('.btnSubmit').removeClass('disabled');
        else
            $('.btnSubmit').addClass('disabled');
    },
    "click .btn-reset"   : function (event, template) {
        $(event.currentTarget).addClass('disabled');
        $('.tblCrossTab').remove();
        $('.table-records .tbody').remove();
        $('.tblCSV').addClass('hidden');
        $('.myFileInput').val('');
        $('.tblCSV .panel-body .pull-left').remove();
        $('.progress-bar-success').addClass('hidden').width('0%').css('valuenow', '0');
        Meteor.call('resetCollections', 'CrossTabOne');
        Meteor.call('resetCollections', 'CrossTabTwo');
        Meteor.call('resetCollections', 'Column');
        Meteor.call('resetCollections', 'Entry');
    }
});
function cb() {
    console.log('cb called')
}
Template.home.events({
    "click .listItem": function (event, template) {
        $(event.currentTarget).closest('ul').prev('.btn-variable').text(event.target.text.trim());
        var columnName = event.target.text.trim();

        var myArray = Entry.find({}).fetch();
        var distinctArray = _.uniq(myArray, false, function (d) {
            return d[columnName];
        });
        var disctinctValues = _.pluck(distinctArray, event.target.text.trim());

        if ($(event.currentTarget).closest('ul').hasClass('drpOne')) {
            Meteor.call('resetCollections', 'CrossTabOne');
            console.log('dropdown one')
            var listItems = $('.drpTwo > .listItem');
            for (i = 0; i < listItems.length; i++)
                if ($(listItems[i]).children('a').text().trim() === event.target.text.trim())
                    $(listItems[i].remove());

            $(event.currentTarget).closest('ul').prev('.btn-variable').addClass('disabled');

            for (var i = 0; i < disctinctValues.length; i++) {
                console.log('tab one hit');
                CrossTabOne.insert({crossTabOneValue: disctinctValues[i]});
            }
        }
        if ($(event.currentTarget).closest('ul').hasClass('drpTwo')) {
            Meteor.call('resetCollections', 'CrossTabTwo');
            console.log('dropdown two');
            var listItems = $('.drpOne > .listItem');
            for (i = 0; i < listItems.length; i++)
                if ($(listItems[i]).children('a').text().trim() === event.target.text.trim())
                    $(listItems[i].remove());

            $(event.currentTarget).closest('ul').prev('.btn-variable').addClass('disabled');

            for (var i = 0; i < disctinctValues.length; i++) {
                console.log('tab two hit');
                CrossTabTwo.insert({crossTabTwoValue: disctinctValues[i]});
            }
        }
        var count = 0;
        var btns = $('.btn-variable');
        for (var i = 0; i < btns.length; i++)
            if ($(btns[i]).hasClass('disabled'))
                count += 1;

        var tblHeaderPre = '', th = '', tblHeaderPost = '', tbody = '', trBody = '', trFooter = '', tdFooter = '';

        if (count === $('.btn-variable').length) {
            var obj1 = CrossTabOne.find({}).fetch();
            var obj2 = CrossTabTwo.find({}).fetch();

            var query = {};
            var crossTabCounts = [];
            for (var i = 0; i < obj1.length; i++) {
                //console.log('obj1 is ' + obj1[i].crossTabOneValue);
                crossTabCounts.push([]);
                crossTabCounts[i].push(new Array(obj2.length));
                query[$('.drpOne').prev('.btn-variable').text().trim()] = obj1[i].crossTabOneValue;
                for (var j = 0; j < obj2.length; j++) {
                    //console.log('obj2 is ' + obj2[j].crossTabTwoValue);
                    query[$('.drpTwo').prev('.btn-variable').text().trim()] = obj2[j].crossTabTwoValue;
                    crossTabCounts[i][j] = Entry.find(query).count();
                }
            }

            tblHeaderPre = '<div class="tblCrossTab item"><div class="panel panel-success"><div class="panel-heading">Result</div><table class="table-result table table-bordered table-hover table-striped"><thead><tr><th>#</th>';
            for (var i = 0; i < obj2.length; i++) {
                th += '<th>' + obj2[i].crossTabTwoValue + '</th>';
            }
            tblHeaderPost = '<th>Row Total</th></tr></thead>';

            tbody = '<tbody>';
            var totalColumn = [];
            var totalRow = 0;
            for (var i = 0; i < obj1.length; i++) {
                totalColumn.push([]);
                totalColumn[i].push(new Array(obj2.length));
                trBody += '<tr><td>' + obj1[i].crossTabOneValue + '</td>';
                for (var j = 0; j < obj2.length; j++) {
                    trBody += '<td>' + crossTabCounts[i][j] + '</td>';
                    totalRow += crossTabCounts[i][j];
                    totalColumn[i][j] = crossTabCounts[i][j];
                }
                trBody += '<td>' + totalRow + '</td></tr>';
                totalRow = 0;
            }
            trFooter = '<tr><td>Totals</td>';

            var totalSingleColumn, totalFinal = 0;
            for (var j = 0; j < totalColumn.length; j++) {
                //console.log("col[" + i + "][" + j + "] = " + col[j]);
                totalSingleColumn = 0;
                for (var k = 0; k < totalColumn.length; k++) {
                    //console.log("col[" + k + "][" + j + "] = " + totalColumn[k][j]);
                    totalSingleColumn += totalColumn[k][j];
                }
                totalFinal += totalSingleColumn;
                tdFooter += '<td>' + totalSingleColumn + '</td>';
            }

            tdFooter += '<td>' + totalFinal + '</td></tr></tbody></table> </div>';
            $('.tblCrossTab').remove();
            $('.tblMain').append(tblHeaderPre + th + tblHeaderPost + tbody + trBody + trFooter + tdFooter);
            obj1.length = 0;
            obj2.length = 0;
        }
    }
});

Template.appLayout.animations({
    ".item": {
        container          : ".container-fluid", // container of the ".item" elements
        in                 : "fade-in", // class applied to inserted elements
        out                : "fade-out", // class applied to removed elements
        inCallback         : function (element) {
        }, // callback after an element gets inserted
        outCallback        : function (element) {
        }, // callback after an element gets removed
        delayIn            : 500, // Delay before inserted items animate
        delayOut           : 500, // Delay before removed items animate
        animateInitial     : true, // animate the elements already rendered
        animateInitialStep : 200, // Step between animations for each initial item
        animateInitialDelay: 500 // Delay before the initial items animate
    }
});
