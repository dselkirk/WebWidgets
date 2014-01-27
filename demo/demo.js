// Пример использования wGrid
$('.js-grid-example-container').wGrid({
    renderer: 'kendoui',
    columns: [
        {
            field: "id",
            title: "ID",
            sortable: true
        },
        {
            field: "firstName",
            title: "First Name",
            sortable: false
        }
    ],
    dataSource: [
        {
            id: '1', firstName: 'Mike'
        },
        {
            id: '2', firstName: 'Helena'
        }
    ],
    sortable: true,
    resizable: true,
    groupable: true,
    groupableMessage: 'Переместите сюда колонки для группировки'
});


// Пример использования wForm
$('.js-form-example-container').wForm({
    name: 'testForm',
    url: '#',
    fields: [
        { name: 'firstName', type: 'text', caption: "Имя:" }
    ],
    actions: {
        reset: function () {
            this.clear();
        },
        save: function () {
            this.save();
        }
    }
});
