const mailSend = () => {
    const form = document.getElementById('form'); 
    const form2 = document.getElementById('form2'); 
    const sendForm = document.querySelector('.send__form');
    const sendFormContent = document.querySelector('.send__form__content');
    const modalActive = document.querySelector('.modal__opening');
    const bodyUnlocked = document.querySelector('body');

    // Обработчик отправки формы (форма с модалкой)
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            form.reset();

          
            modalActive.classList.remove('_active');  //закрываем модалку
            bodyUnlocked.classList.remove('__lock');//разблокируем боди 
            sendForm.classList.add('_sending');//добавляем фон для уведомления отправлено
            sendFormContent.classList.add('_sending');//добавляем уведомление отправлено
            setTimeout(() => {
                sendForm.classList.remove('_sending');
                sendFormContent.classList.remove('_sending');
            }, 2000); // уведомление держится 2 сек

            // создаем объект FormData для отправки данных формы
            const formData = new FormData(form);

            // Отправляем данные формы на сервер асинхронно
            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) // Преобразуем ответ в JSON
            .then(data => {
                // Обработка успешного ответа от сервера
                console.log(data); // Выводим ответ в консоль
                // Здесь можно выполнить дополнительные действия на основе полученных данных
            })
            .catch(error => {
                // Обработка ошибок
                console.error('Ошибка:', error);
            });
        });
    }

    // Обработчик отправки формы для form2
    if (form2) {

        form2.addEventListener('submit', (event) => {
            event.preventDefault();
            form2.reset();
            sendForm.classList.add('_sending');
            sendFormContent.classList.add('_sending');
            setTimeout(() => {
                sendForm.classList.remove('_sending');
                sendFormContent.classList.remove('_sending');
            }, 2000);

            const formData = new FormData(form2);
            fetch(form2.action, {
                method: 'POST',
                body: formData
            })

            .then(response => response.json()) // Преобразуем ответ в JSON
            .then(data => {
                // Обработка успешного ответа от сервера
                console.log(data); // Выводим ответ в консоль
            })
            .catch(error => {
                // Обработка ошибок
                console.error('Ошибка:', error);
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    mailSend(); // Вызываем функцию после загрузки DOM
    console.log('DOM загружен!');
});
