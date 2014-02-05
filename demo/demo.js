// Пример использования wGrid
$('.js-grid-example-container').wGrid({
    renderer: 'kendoui',
    columns: [
        {
            field: 'id',
            title: 'ID',
            sortable: true
        },
        {
            field: 'firstName',
            title: 'First Name',
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
        {
            id: 'someNameId',
            name: 'someName',
            type: 'text',
            caption: 'Имя:',
            value: 'Необычное имя',
            events: [
                {
                    name: 'keyup',
                    action: function () {
                        console.log('keyup pressed');
                    }

                }
            ],
            required: true
        }
        ,
        { id: 'somePasswordId', name: 'somePassword', type: 'password', caption: 'Пароль:', placeholder: 'Введите пароль', required: true },
        { id: 'someEmailId', name: 'someEmail', type: 'email', caption: 'Email:', placeholder: 'Введите email' },
        { id: 'someAgeId', name: 'someAge', type: 'number', caption: 'Циферка возраста:', value: 204, min: 100, max: 300, events: [
            {
                name: 'spin',
                action: function () {
                    console.log('spin');
                }

            }
        ] },
        { id: 'someDateId', name: 'someDate', type: 'date', caption: 'Какая-то дата:', value: new Date()},
        { id: 'someTimeId', name: 'someTime', type: 'time', caption: 'Какое-то время:', placeholder: 'Введите время'},
        { id: 'someDateTimeId', name: 'someDateTime', type: 'datetime', caption: 'Какая-то дата и время:'},
        { id: 'someColorPickerId', name: 'someColorPicker', type: 'color', caption: 'Какой-то цвет:'}
    ],
    actions: [
        {
            id: 'saveAction',
            name: 'save',
            caption: 'Сохранить'
        },
        {
            id: 'resetAction',
            name: 'reset',
            icon: 'refresh',
            caption: 'Очистить',
            click: function () {
                this.clear();
            }
        },
        {
            id: 'consoleAction',
            name: 'console',
            click: function () {
                console.log('hello testing')
            },
            caption: 'Консолька'
        },
        {
            id: 'noAction',
            name: 'disabled',
            enable: false,
            caption: 'Отключенная'
        }
    ],
    onSubmit: function() {
        console.log('form saved!');
    }
});
