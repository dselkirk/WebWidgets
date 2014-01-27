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
        { name: 'someName', type: 'text', caption: "Имя:" },
        { name: 'someAge', type: 'number', caption: "Циферка возраста:", value: 200, min: 100, max: 300 },
        { name: 'someDate', type: 'date', caption: "Какая-то дата:"},
        { name: 'someTime', type: 'time', caption: "Какое-то время:"},
        { name: 'someDateTime', type: 'datetime', caption: "Какая-то дата и время:"}
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
