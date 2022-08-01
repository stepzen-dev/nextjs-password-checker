

export default  async  function handler(req, res) {

  // Get data submitted in request's body.
  const body = req.body

  // Guard clause checks for body,
  // and returns early if it is not found
  if (!body) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Error: no password found in request.' })
  }

// set GraphQL query string
  const query_string = `
  query MyQuery($value: String) {
    hashEntryAndCheckPwn(value: $value) {
      candidates {
        revealedInExposure
      }
    }
  }
  `
//fetch result from StepZen API
  const resultFromGQL  = await fetch( 'https://mojave.stepzen.net/api/password-checker/__graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `apikey ${process.env.NEXT_STEPZEN_API_KEY}`
          },
          body: JSON.stringify({
            query: query_string,
            variables: {
              value: body.password
            }
          }),

        })

  const data = await resultFromGQL.json()
  
  
      if (!data) {
          return {
              notFound: true,
          }
      }

  // Found the pword.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.password}`, revealed: `${data.data.hashEntryAndCheckPwn.candidates[0].revealedInExposure}` })


}