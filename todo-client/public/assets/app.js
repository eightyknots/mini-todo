(function() {
    var listDomObject = document.getElementById('todo-list');

    var fetchAll = function() {
        fetch('http://localhost:4000/tasks/')
        .then((res) => {
            return res.json();
        }).then((result) => {
            var sorted = result.sort((a, b) => new Date(b.date) - new Date(a.date));
            for (task of sorted) {
                addListItem(task);
            }
        });
    };

    var submitTask = function(description) {
        fetch('http://localhost:4000/tasks', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        })
        .then((res) => res.json())
        .then((result) => {
            addListItem(result, true);
        });
    };

    var addListItem = function(properties, prepend = false) {
        var listItem = document.createElement('li');
        listItem.textContent = properties.description;

        // TODO: Add link to mark completed and delete

        listItem.classList.add('list-item');
        if (properties.isComplete) {
            listItem.classList.add('list-item-completed');
        }
        
        if (prepend) {
            listDomObject.prepend(listItem);
        } else {
            listDomObject.appendChild(listItem);
        }
    }

    fetchAll();

    document.getElementById('todo-new').addEventListener('submit', (e) => {
        e.preventDefault();
        var taskDescription = document.getElementById('todo-new-description').value;
        if (taskDescription.length > 0) {
            submitTask(taskDescription);
            document.getElementById('todo-new-description').value = '';
        }
    });
})()