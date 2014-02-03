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
    groupable: true
});


// Пример использования wForm
var test = $('.js-form-example-container').wForm({
    name: 'testForm',
    url: '#',
    fields: [
        { id: 'someNameId', name: 'someName', type: 'text', caption: "Имя:", value: "Необычное имя" },
        { id: 'somePasswordId', name: 'somePassword', type: 'password', caption: "Пароль:" },
        { id: 'someAgeId', name: 'someAge', type: 'number', caption: "Циферка возраста:", value: 204, min: 100, max: 300 },
        { id: 'someDateId', name: 'someDate', type: 'date', caption: "Какая-то дата:", value: new Date()},
        { id: 'someTimeId', name: 'someTime', type: 'time', caption: "Какое-то время:"},
        { id: 'someDateTimeId', name: 'someDateTime', type: 'datetime', caption: "Какая-то дата и время:"},
        { id: 'someColorPickerId', name: 'someColorPicker', type: 'color', caption: "Какой-то цвет:"}
    ],
    actions: [
        {
            name: 'save',
            caption: 'Сохранить'
        },
        {
            name: 'reset',
            icon: 'refresh',
            caption: 'Очистить'
        },
        {
            name: 'console',
            click: function () {
                console.log('hello testing')
            },
            caption: 'Консолька'
        },
        {
            name: 'disabled',
            enable: false,
            caption: 'Отключенная'
        }
    ]
});

$('#testme').on('click', function () {
    test
        .data('wForm')
        .clear();
});