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
var test = $('.js-form-example-container').wForm({
    name: 'testForm',
    url: '#',
    fields: [
        { name: 'someName', type: 'text', caption: "Имя:", value: "Необычное имя" },
        { name: 'somePassword', type: 'password', caption: "Пароль:" },
        { name: 'someAge', type: 'number', caption: "Циферка возраста:", value: 204, min: 100, max: 300 },
        { name: 'someDate', type: 'date', caption: "Какая-то дата:", value: new Date()},
        { name: 'someTime', type: 'time', caption: "Какое-то время:"},
        { name: 'someDateTime', type: 'datetime', caption: "Какая-то дата и время:"},
        { name: 'someColorPicker', type: 'color', caption: "Какой-то цвет:"}
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