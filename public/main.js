var edit = document.getElementsByClassName("fa-pen-to-square");
var save = document.getElementsByClassName("fa-floppy-disk");
var trash = document.getElementsByClassName("fa-trash");
var done = document.getElementsByClassName("done");

Array.from(edit).forEach(function(element) {
      element.addEventListener('click', function(){
        const taskNode = this.parentNode.parentNode.childNodes[1]
        const inputNode = this.parentNode.parentNode.childNodes[3]
        const editNode = this.parentNode.parentNode.childNodes[5]
        const saveNode = this.parentNode.parentNode.childNodes[7]
        console.log(taskNode, inputNode, editNode, saveNode)
        taskNode.classList.add("hide")
        inputNode.classList.toggle("hide")
        editNode.classList.add("hide")
        saveNode.classList.toggle("hide")
      });
      
});
Array.from(done).forEach(function(element) {
  element.addEventListener('click', function(){
    const task = this.parentNode.parentNode.childNodes[1].innerText
    fetch('task', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'id': element.dataset.id,
        'task': task,
        'isComplete':true
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
      const id = element.dataset.id
        fetch('task', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

Array.from(save).forEach(function(element) {
  element.addEventListener('click', function(){
    const taskNode = this.parentNode.parentNode.childNodes[1]
        const inputNode = this.parentNode.parentNode.childNodes[3]
        const editNode = this.parentNode.parentNode.childNodes[5]
        const saveNode = this.parentNode.parentNode.childNodes[7]
        
    fetch('task', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'id': element.dataset.id,
        'task': inputNode.value, 
        'isComplete':false
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});