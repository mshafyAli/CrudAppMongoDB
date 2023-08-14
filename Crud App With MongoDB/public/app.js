

window.createPost = function () {

  let postTitle = document.querySelector("#post-title").value;
  let postText = document.querySelector("#post-text").value;

  //baseUrl/api/v1/post
  axios.post('/post', {
      title: postTitle,
      text: postText
  })
      .then(function (response) {
          // handle success
          console.log(response.data);
          document.querySelector('#result').innerHTML = response.data;
          getAllPost();

      })
      .catch(function (error) {
          // handle error
          console.log(error.data);
          document.querySelector("#result").innerHTML = "Error in post Submission"
      })
}

window.getAllPost = function (){
axios.get('/posts')
.then(function (response) {
  console.log(response.data);


  let postHtml = ``;

  response.data.map((eachPost) =>{
    postHtml += 
    `<div id=card-${eachPost._id} class='post-card'>
    <p>${eachPost.createdOn}</p>
    <h3>${eachPost.title}</h3>
    <p>${eachPost.text}</p>
    <button onclick="delPost('${eachPost._id}')">Delete</button>
    <button onclick="editPost('${eachPost._id}','${eachPost.title}','${eachPost.text}')">Edit</button>
    </div>
    <br />`
  } )


  document.querySelector("#posts").innerHTML = postHtml;

})
.catch(function (error) {
  // handle error
  console.log(error);
  document.querySelector("#result").innerHTML = "error in post submission"

})
}

window.delPost = function (postId){

console.log("delete: " ,postId);

axios.delete(`/post/${postId}`)
.then(function (response) {
  console.log(response.data);


  getAllPost();
  
})
.catch(function (error) {

  console.log(error);
  document.querySelector("#result").innerHTML = "error in post submission"

})
}


window.editPost = (postId, title,text) =>{

document.querySelector(`#card-${postId}`).innerHTML = `
<form onsubmit= savePost('${postId}')>
<input type='text' value='${title}' id = 'title-${postId}' />
<br />
<input type='text' value='${text}' id = 'text-${postId}' />
<button>Save</button>
</form>`
}

window.savePost = (postId) =>{
const updatedTitle = document.querySelector( `#title-${postId}`).value;
const updateText = document.querySelector( `#text-${postId}`).value;

axios.put(`/post/${postId}`,{
  title: updatedTitle,
  text:  updateText
}
  
)
.then(function (response) {
  console.log(response.data);


  
})
.catch(function (error) {

  console.log(error);
  document.querySelector("#result").innerHTML = "error in post submission"
})

} 
