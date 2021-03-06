$(function() {
    // This MobileServiceClient has been configured to communicate with your local
    // test project for debugging purposes.
    //var client = new WindowsAzure.MobileServiceClient(
    //    "http://localhost:59984"
    //);

     //This MobileServiceClient has been configured to communicate with your Mobile Service's url
     //and application key. You're all set to start working with your Mobile Service!
    var client = new WindowsAzure.MobileServiceClient(
        "https://testingred.azure-mobile.net/",
        "eWNRAfDKzmZaJWBuncCcwMjLePXcDs75"
    );

    var todoItemTable = client.getTable('todoitem');

    // Read current data and rebuild UI.
    // If you plan to generate complex UIs like this, consider using a JavaScript templating library.
    function refreshTodoItems() {
        var query = todoItemTable.where({ complete: false });

        query.read().then(function(todoItems) {
            var listItems = $.map(todoItems, function(item) {
                return $('<li>')
                    .attr('data-todoitem-id', item.id)
                    .append($('<button class="item-delete">Delete</button>'))
                    .append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
                    .append($('<div>').append($('<input class="item-text">').val(item.text)));
            });

            $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
        }, handleError);

    }

    function callManga() {
        client.invokeApi("testing/GetMangaChapterByPage", {
            body: null,
            method: "get",
            parameters: {
                manganame : "onepiece",
                page: 5
            }
        }).done(function (results) {
            var message = results.result.length + " all image";
            alert(message);
        }, function (error) {
            alert(error.message);
        });
    }

    function ajaxcallmanga() {
        $.ajax({
            type: "get",
            beforeSend: function (request) {
                request.setRequestHeader("X-ZUMO-APPLICATION", "eWNRAfDKzmZaJWBuncCcwMjLePXcDs75");
            },
            url: "https://testingred.azure-mobile.net/api/testing/GetMangaChapterByPage?manganame=onepiece&page=1",
            processData: false,
            success: function (msg) {
                $("#results").append("The result =" + StringifyPretty(msg));
            }
        });
    }

    function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }

    function getTodoItemId(formElement) {
        return $(formElement).closest('li').attr('data-todoitem-id');
    }

    // Handle insert
    $('#add-item').submit(function(evt) {
        var textbox = $('#new-item-text'),
            itemText = textbox.val();
        if (itemText !== '') {
            todoItemTable.insert({ text: itemText, complete: false }).then(refreshTodoItems, handleError);
        }
        textbox.val('').focus();
        evt.preventDefault();
    });

    // Handle update
    $(document.body).on('change', '.item-text', function() {
        var newText = $(this).val();
        todoItemTable.update({ id: getTodoItemId(this), text: newText }).then(null, handleError);
    });

    $(document.body).on('change', '.item-complete', function() {
        var isComplete = $(this).prop('checked');
        todoItemTable.update({ id: getTodoItemId(this), complete: isComplete }).then(refreshTodoItems, handleError);
    });

    // Handle delete
    $(document.body).on('click', '.item-delete', function () {
        todoItemTable.del({ id: getTodoItemId(this) }).then(refreshTodoItems, handleError);
    });

    // On initial load, start by fetching the current data
    refreshTodoItems();
    callManga();
    ajaxcallmanga();
});