import {useRouter} from 'next/router'
// resource: https://nextjs.org/docs/guides/building-forms

export default function PageWithJSbasedForm() {

const router = useRouter()
// Handles the submit event on form submit.

const handleSubmit = async (event) => {
  // Stop the form from submitting and refreshing the page.
  event.preventDefault()

  // Get data from the form.
  const data = {
    password: event.target.password.value
  }

  // Send the data to the server in JSON format.
  const JSONdata = JSON.stringify(data)

  // API endpoint where we send form data.
  const endpoint = '/api/form'

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: 'POST',
    // Tell the server we're sending JSON.
    headers: {
      'Content-Type': 'application/json',
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  }

  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, options)

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.

  const result = await response.json()
  console.log(result)
  alert(`Revealed status: ${result.revealed}`)
  router.push(`/result?pwnresult=${result.revealed}`)
}

 
  return (
    // We pass the event to the handleSubmit() function on submit.
    <main>
      <h1>Is My Password On a List of Exposed Passwords?</h1>
      <form  onSubmit={handleSubmit}>
      <label htmlFor="password">password:</label>
      <input type="text" id="password" name="password" />
      <button type="submit">Submit</button>
    </form>
    </main>
  )
}