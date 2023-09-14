const taskInput = document.getElementById('taskInput');
        const addTaskButton = document.getElementById('addTask');
        const taskList = document.getElementById('taskList');

        addTaskButton.addEventListener('click', function() {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${taskText}</span>
                    <button class="deleteTask">Eliminar</button>
                `;
                taskList.appendChild(li);
                taskInput.value = '';

                const deleteButton = li.querySelector('.deleteTask');
                deleteButton.addEventListener('click', function() {
                    taskList.removeChild(li);
                });
            }
        });

