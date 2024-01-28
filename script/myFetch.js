
export async  function  Get(url, callBack=Default_CallBack,Error=fetchError) {
    await  fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network error');
            }
       return    response.json()
        })
     .then(function (data) { callBack(data) })
        .catch(error=>(fetchError()))
        ;

}
function fetchError()
{
   console.log("Failed to fetch data")
}

function Default_CallBack(data)
{
    console.log(data)
}