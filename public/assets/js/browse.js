$(document).ready(function () {

    $('#searchBarBtn').on('click', function (event) {
        event.preventDefault();
        setTimeout(displayIDResults, 1000);
        console.log('Search Bar Input: ' + $('#searchBarInput').val().trim());
        var idObj = {
            id: $('#searchBarInput').val().trim()
        }
        browseID(idObj);
    });


    function browseID(idObj) {
        $.ajax("/browse-by-id", {
            type: 'GET',
            data: idObj
        }).then(function (data) {
        });

    };

    $('#searchBtn').on('click', function (event) {
        event.preventDefault();
        getInputValues();
        if ($('#searchTableID').val() == 'Lost Items') {
            setTimeout(displayLostResults, 1000);
        } else if ($('#searchTableID').val() == 'Found Items') {
            setTimeout(displayFoundResults, 1000);
        }
    });

    function displayIDResults() {
        window.location.href = 'https://secure-chamber-49154.herokuapp.com/browse-by-id-result';
    }

    function displayLostResults() {
        window.location.href = 'https://secure-chamber-49154.herokuapp.com/browse-lost-items-result';
    };

    function displayFoundResults() {
        window.location.href = 'https://secure-chamber-49154.herokuapp.com/browse-found-items-result';
    }

    function getSwitchExp(searchObj, tableValue) {
        var switchExpression = '0';
        for (var property in searchObj) {
            if (searchObj[property] == 'Choose...') {
                switchExpression = switchExpression + property;
            }
        }
        console.log('Switch Expression: ' + switchExpression);
        getSearchValues(switchExpression, tableValue);
    };

    function getSearchValues(switchExpression, tableValue) {
        switch (switchExpression) {
            case '0color':
                console.log('Missing: color only');
                var searchData = {
                    category: $('#searchCategoryID').val(),
                    subcategory: $('#categorySelect').val(),
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
            case '0size':
                console.log('Missing: size only');
                var searchData = {
                    category: $('#searchCategoryID').val(),
                    subcategory: $('#categorySelect').val(),
                    color: $('#searchColorID').val(),
                    claimed: 0
                };
                break;
            case '0colorsize':
                console.log('Missing: Color and Size');
                var searchData = {
                    category: $('#searchCategoryID').val(),
                    subcategory: $('#categorySelect').val(),
                    claimed: 0
                };
                break;
            case '0categorysubcategory':
                console.log('Missing: Category and Subcategory');
                var searchData = {
                    color: $('#searchColorID').val(),
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
            case '0categorycolor':
                console.log('Missing: Categories, subcategories, color');
                var searchData = {
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
            case '0categorysubcategorycolor':
                console.log('Missing: Categories, subcategories, color');
                var searchData = {
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
            case '0categorysize':
                console.log('Missing: Categories, subcategories, size');
                var searchData = {
                    color: $('#searchColorID').val(),
                    claimed: 0
                };
                break;
            case '0categorysubcategorysize':
                console.log('Missing: Categories, subcategories, size');
                var searchData = {
                    color: $('#searchColorID').val(),
                    claimed: 0
                };
                break;
            case '0categorysubcategorycolorsize':
                console.log('No user inputs. All data will appear.');
                var searchData = {
                    claimed: 0
                };
                break;
            case '0categorycolorsize':
                console.log('No user inputs. All data will appear');
                var searchData = {
                    claimed: 0
                };
                break;
            case '0':
                console.log('All inputs are valid');
                var searchData = {
                    category: $('#searchCategoryID').val(),
                    subcategory: $('#categorySelect').val(),
                    color: $('#searchColorID').val(),
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
        };
        sendAjaxCall(searchData, tableValue);
    };

    function sendAjaxCall(searchData, tableValue) {
        console.log("This is searchData: " + JSON.stringify(searchData));
        console.log("The table: " + tableValue);

        if (tableValue == 'Lost Items') {
            $.ajax("/browse-lost-items", {
                type: 'GET',
                data: searchData
            }).then(function (data) {
            });

        } else if (tableValue == 'Found Items') {
            $.ajax("/browse-found-items", {
                type: 'GET',
                data: searchData
            }).then(function (data) {
            });
        };
    };

    function getInputValues() {
        // Console.logged the values of the drop-downs to test
        console.log('Table type: ' + $('#searchTableID').val());
        console.log('Category: ' + $('#searchCategoryID').val());
        console.log('Color: ' + $('#searchColorID').val());
        console.log('Size: ' + $('#searchSizeID').val());
        console.log('Subcategory ' + $('#categorySelect').val());

        var tableValue = $('#searchTableID').val();
        var searchObj = {
            category: $('#searchCategoryID').val(),
            subcategory: $('#categorySelect').val(),
            color: $('#searchColorID').val(),
            size: $('#searchSizeID').val()
        };
        console.log('The searchObj: ' + JSON.stringify(searchObj));
        getSwitchExp(searchObj, tableValue);
    };

    function claimItem() {
        var itemID = $('#claim-btn').val();
        var btnText = $('#claim-btn').text().toLowerCase();
        var itemType = btnText.split(' ');
        var uid = parseInt(localStorage.getItem('user_id'));

        console.log(`Claiming ${itemType[1]} item ID: ${itemID}...`);
        
        if (itemType[2] === 'this') {
            var obj = {
                itemType: 'lost',
                UserId: uid,
                LostId: itemID,
            };
        };
        if (itemType[0] === 'this') {
            var obj = {
                itemType: 'found',
                UserId: uid,
                FoundId: itemID,
            };
        };
        console.log(JSON.stringify(obj));
        addNewItem(obj);
    };

    function addNewItem(data) {
        $.ajax('/api/claim', {
            type: 'POST',
            data: data
        }).then(function (res) {
            console.log('Item claimed.')
            location.replace('/browse-items')
        });
    };


    $('#claim-btn').on('click', function (event) {
        event.preventDefault();
        claimItem();
    });
});