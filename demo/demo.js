// Пример использования wGrid
$('.js-grid-example-container').wGrid({

    // Выбираем библиотеку, которая будет заниматься рендерингом виджета.
    renderer: 'kendoui',

    // Выбираем количество колонок с параметрами
    columns: [
        {
            field: "id",
            title: "ID"
        },
        {
            field: "firstName",
            title: "First Name"
        }
    ],

    // Данные для заполнения grid.
    dataSource: [
        {
            id: '1', firstName: 'Mike'
        },
        {
            id: '2', firstName: 'Helena'
        }
    ]
});
